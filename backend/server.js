require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

// Products Schema
const productSchema = new mongoose.Schema({
  name: String, price: Number, diets: [String], categories: [String],
  macros: mongoose.Schema.Types.Mixed, images: [String], isActive: { type: Boolean, default: true }
});
const Product = mongoose.model('Product', productSchema);

// Connect DB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/arokiam')
  .then(() => console.log('✅ DB Connected'));

// SEED YOUR DATA (runs once)
async function seed() {
  const count = await Product.countDocuments();
  if (count === 0) {
    await Product.insertMany([
      { name: 'Vegan Quinoa Box', price: 280, diets: ['Vegan'], categories: ['Mealbox'], 
        macros: { cal: 320, pro: 18 }, images: ['https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600'] },
      { name: 'Chicken Fitness Bowl', price: 320, diets: ['Non-Veg'], categories: ['Mealbox', 'Gym'], 
        macros: { cal: 410, pro: 36 }, images: ['https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600'] },
      // ADD ALL YOUR 60+ PRODUCTS HERE FROM YOUR DB ARRAY
    ]);
    console.log('✅ Seeded products');
  }
}
seed();

// API ROUTES
app.get('/api/products', async (req, res) => {
  const { category, diet, search } = req.query;
  let filter = { isActive: true };
  
  if (category && category !== 'All') filter.categories = { $in: [category] };
  if (diet) filter.diets = { $in: [diet] };
  if (search) filter.name = { $regex: search, $options: 'i' };

  const products = await Product.find(filter).limit(50);
  res.json({ products });
});

app.get('/api/journeys', (req, res) => {
  res.json({
    journeys: ['Weight Loss', 'Gym & Fitness', 'Skin Care', 'Diabetes Care']
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Backend: http://localhost:${PORT}`));
