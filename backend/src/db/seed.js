const bcrypt = require('bcryptjs');
const { getDatabase } = require('./init');

const sampleProducts = [
  {
    name: 'Tomates Orgânicos',
    description: 'Tomates frescos e orgânicos cultivados localmente',
    category: 'Vegetais',
    price: 5.50,
    quantity: 100
  },
  {
    name: 'Alface Hidropônica',
    description: 'Alface cultivada em sistema hidropônico',
    category: 'Vegetais',
    price: 3.00,
    quantity: 150
  },
  {
    name: 'Mel Puro',
    description: 'Mel silvestre coletado naturalmente',
    category: 'Naturais',
    price: 12.00,
    quantity: 50
  },
  {
    name: 'Feijão Preto',
    description: 'Feijão preto de excelente qualidade',
    category: 'Grãos',
    price: 7.50,
    quantity: 200
  },
  {
    name: 'Morangos Frescos',
    description: 'Morangos colhidos no mesmo dia',
    category: 'Frutas',
    price: 8.00,
    quantity: 80
  }
];

const sampleUsers = [
  {
    email: 'producer@agroman.com',
    password: 'password123',
    name: 'João Produtor',
    user_type: 'producer',
    phone: '+258 84 123 4567',
    location: 'Maputo'
  },
  {
    email: 'vendor@agroman.com',
    password: 'password123',
    name: 'Maria Vendedora',
    user_type: 'vendor',
    phone: '+258 82 987 6543',
    location: 'Gaza'
  },
  {
    email: 'consumer@agroman.com',
    password: 'password123',
    name: 'Carlos Consumidor',
    user_type: 'consumer',
    phone: '+258 84 555 1234',
    location: 'Sofala'
  }
];

async function seedDatabase() {
  try {
    const db = await getDatabase();

    // Clear existing data
    await db.exec('DELETE FROM users');
    await db.exec('DELETE FROM sqlite_sequence');

    // Insert sample users
    for (const user of sampleUsers) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await db.run(
        `INSERT INTO users (email, password, name, user_type, phone, location) 
         VALUES (?, ?, ?, ?, ?, ?)`,
        [user.email, hashedPassword, user.name, user.user_type, user.phone, user.location]
      );
    }

    console.log('✓ Sample users inserted');

    // Get producer user_id and insert products
    const producer = await db.get(`SELECT id FROM users WHERE user_type = 'producer' LIMIT 1`);
    if (producer) {
      for (const product of sampleProducts) {
        await db.run(
          `INSERT INTO products (user_id, name, description, category, price, quantity) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [producer.id, product.name, product.description, product.category, product.price, product.quantity]
        );
      }
      console.log('✓ Sample products inserted');
    }

  } catch (err) {
    console.error('Seeding error:', err);
  }
}

if (require.main === module) {
  seedDatabase().then(() => {
    console.log('✓ Database seeding completed');
    process.exit(0);
  });
}

module.exports = { seedDatabase };
