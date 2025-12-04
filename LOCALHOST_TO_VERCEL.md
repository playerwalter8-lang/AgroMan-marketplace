# Mudanças de Configuração: Localhost → Vercel

## Resumo
Substituídas todas as referências `http://localhost:5000` pela URL de produção na Vercel:
`https://agro-man-marketplace-project.vercel.app`

## Ficheiros Actualizados

### Documentação (5 ficheiros)
1. **`API_SPEC.md`** — Base URL da API actualizada
2. **`README.md`** — Instruções de acesso actualizadas
3. **`PROJECT_OVERVIEW.md`** — URLs de exemplo actualizadas
4. **`GETTING_STARTED.md`** — Guia de início actualizado com Vercel URL
5. **`QUICK_REFERENCE.txt`** — Referência rápida actualizada

### Frontend (1 ficheiro)
6. **`frontend/src/js/utils.js`** — `API_BASE` agora detecta automaticamente:
   - Em `localhost` ou `127.0.0.1`: usa `/api` (local)
   - Em produção: usa `https://agro-man-marketplace-project.vercel.app/api`

### Backend (2 ficheiros)
7. **`backend/.env.example`** — Variáveis de ambiente actualizadas com:
   - `CORS_ORIGIN` incluindo Vercel URL
   - Comentários sobre `DATABASE_URL` para produção

8. **`frontend/.env.example`** — Novo ficheiro com variáveis de frontend:
   - `VITE_API_URL` para desenvolvimento
   - `VITE_API_PRODUCTION_URL` para produção

## Como Usar

### Desenvolvimento Local
- URLs relativas (`/api`) funcionam automaticamente via proxy/CORS
- `utils.js` detecta `localhost` e usa local API

### Produção (Vercel)
- Frontend hospedado em Vercel detecta hostname e usa:
  `https://agro-man-marketplace-project.vercel.app/api`
- Backend serverless em `https://agro-man-marketplace-project.vercel.app/api/[...slug].js`

## Próximos Passos

1. **Fazer commit** das mudanças:
```powershell
git add .
git commit -m "chore: update localhost references to Vercel production URL"
git push origin main
```

2. **Testar em produção**:
   - Abrir https://agro-man-marketplace-project.vercel.app no navegador
   - Verificar que as requisições da API vão para o backend Vercel

3. **Configurar variáveis de ambiente no Vercel**:
   - Ir a https://vercel.com/projects/agroman (ou seu projeto)
   - Settings → Environment Variables
   - Adicionar: `JWT_SECRET`, `CORS_ORIGIN`, etc.

## Notas Importantes

- **Frontend**: Usa URLs relativas e `utils.js` detecta ambiente automaticamente
- **Backend**: Serverless em Vercel — certifique-se de que `DATABASE_URL` está configurado para produção (não SQLite local)
- **CORS**: Actualizar `backend/src/app.js` ou variável de ambiente conforme necessário
