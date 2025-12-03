const express = require('express');
const { getDatabase } = require('../../db/init');

const router = express.Router();

// Knowledge base for intelligent queries
const knowledgeBase = {
  'plantas': 'As plantas precisam de água, luz solar e nutrientes para crescer. Diferentes plantas têm diferentes necessidades.',
  'tomate': 'Tomates precisam de sol pleno (6-8 horas), rega regular e solo bem drenado. Cultive em primavera/verão.',
  'alface': 'Alface prefere clima fresco, meia-sombra em clima quente, e solo úmido. Colha em 45-60 dias.',
  'mel': 'O mel é produzido por abelhas a partir do néctar das flores. Tem propriedades antibacterianas e energéticas.',
  'pragas': 'Use controle biológico, neem oil ou sabão inseticida para pragas comuns. Inspecione regularmente.',
  'solo': 'Teste o pH do solo (6.0-7.5 ideal). Adicione compostagem para fertilidade. Rotação de culturas é importante.',
  'irrigação': 'Água profundamente mas menos frequentemente. Melhor regar de manhã. Evite molhar as folhas.',
  'fertilizante': 'Use fertilizante balanceado ou orgânico. Siga instruções de dosagem. Evite excesso de nitrogênio.',
  'colheita': 'Colha produtos maduros. Tomates vermelhos, alface tenra, frutas doces. Colha cedo para quantidade contínua.',
  'armazenamento': 'Armazene em local fresco, seco e escuro. Produtos frescos na geladeira. Mel e grãos em potes lacrados.'
};

// Submit a query
router.post('/query', async (req, res) => {
  try {
    const { user_id, query_text, category } = req.body;

    if (!user_id || !query_text) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Generate response based on query
    const response = generateIntelligentResponse(query_text);

    const db = await getDatabase();
    const result = await db.run(
      `INSERT INTO consultations (user_id, query_text, category, response, is_ai_generated) 
       VALUES (?, ?, ?, ?, 1)`,
      [user_id, query_text, category || 'agricultura', response]
    );

    res.status(201).json({
      query_id: result.lastID,
      query: query_text,
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (err) {
    console.error('Query submission error:', err);
    res.status(500).json({ error: 'Failed to submit query' });
  }
});

// Get user's queries
router.get('/history/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { limit = 20 } = req.query;

    const db = await getDatabase();
    const queries = await db.all(
      `SELECT id, query_text, category, response, created_at FROM consultations 
       WHERE user_id = ? ORDER BY created_at DESC LIMIT ?`,
      [userId, limit]
    );

    res.json(queries);
  } catch (err) {
    console.error('Get history error:', err);
    res.status(500).json({ error: 'Failed to get query history' });
  }
});

// Get common topics
router.get('/topics/common', async (req, res) => {
  try {
    res.json({
      topics: [
        'Cultivo de plantas',
        'Irrigação e rega',
        'Pragas e doenças',
        'Preparação do solo',
        'Fertilização',
        'Colheita e armazenamento',
        'Produtos naturais',
        'Conservação de alimentos'
      ]
    });
  } catch (err) {
    console.error('Get topics error:', err);
    res.status(500).json({ error: 'Failed to get topics' });
  }
});

// Helper: Generate intelligent response
function generateIntelligentResponse(query) {
  const lowerQuery = query.toLowerCase();

  for (const [keyword, answer] of Object.entries(knowledgeBase)) {
    if (lowerQuery.includes(keyword)) {
      return answer;
    }
  }

  // Default responses
  const defaultResponses = [
    'A agricultura sustentável requer planejamento e boas práticas. Consulte um agrônomo local para orientação personalizada.',
    'Para melhores resultados, combine técnicas tradicionais com inovação. Pesquise variedades adequadas ao seu clima.',
    'A qualidade do solo é essencial. Faça análise periódica e manutenha a matéria orgânica em bom nível.',
    'Mantenha registros de suas atividades agrícolas. Isso ajuda a identificar padrões e melhorar safras futuras.'
  ];

  return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

module.exports = router;
