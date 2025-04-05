const { OpenAI } = require("openai");
const AppError = require("../../utilities/appError");
const catchAsync = require("../../utilities/catchAsync");
const User = require("../../models/User/User");

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create Income
const recommend_post = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId);

  const response = await openai.responses.create({
    model: "gpt-4o-mini-2024-07-18",
    input: [
      {
        role: "system",
        content: `
            You are a smart budgeting assistant designed to help users manage their personal finances.
            Your goal is to provide the best and closest recommendation you can give from this data: ${productRecommendations}. Here is his preferences in products, recommend 1 item name: ${user.preferences},
            reply with just the item name.
        `,
      },
    ],
  });

  return res.status(200).json({ response: response.output_text.toString() });
});

module.exports = {
  recommend_post,
};

const productRecommendations = [
  // Sports ⚽
  { name: "Molten Basketball", price: 1200, category: "Sports" },
  { name: "Nike Training Shoes", price: 3500, category: "Sports" },

  // Music 🎵
  { name: "Sony Wireless Headphones", price: 2800, category: "Music" },
  { name: "Yamaha Acoustic Guitar", price: 4500, category: "Music" },

  // Travel ✈️ / Travelling 🌍
  { name: "Travel Backpack (50L)", price: 1600, category: "Travel" },
  { name: "Xiaomi Portable Luggage Scale", price: 450, category: "Travelling" },

  // Art 🎨
  {
    name: "Prismacolor Colored Pencils (24 pcs)",
    price: 1100,
    category: "Art",
  },
  { name: "Canvas & Acrylic Paint Set", price: 900, category: "Art" },

  // Technology 💻
  { name: "Realme Wireless Earbuds", price: 1500, category: "Technology" },
  { name: "Redragon Mechanical Keyboard", price: 2300, category: "Technology" },

  // Food 🍔
  { name: "Mini Air Fryer", price: 2000, category: "Food" },
  { name: "Electric Griller", price: 1800, category: "Food" },

  // Video Games 🎮
  { name: "Nintendo Switch Lite", price: 11495, category: "Video Games" },
  { name: "PS5 DualSense Controller", price: 4500, category: "Video Games" },

  // Comics and Manga 📚
  {
    name: "One Piece Volume 1 (PH Version)",
    price: 400,
    category: "Comics and Manga",
  },
  {
    name: "Demon Slayer Manga Set (Vol 1-3)",
    price: 1200,
    category: "Comics and Manga",
  },

  // Self-Care 🛀
  { name: "Aromatherapy Diffuser", price: 899, category: "Self-Care" },
  { name: "Sheet Mask Set (10pcs)", price: 300, category: "Self-Care" },

  // Home Decorations 🏠
  { name: "LED Strip Lights", price: 500, category: "Home Decorations" },
  { name: "Aesthetic Wall Clock", price: 850, category: "Home Decorations" },

  // Sneaker Collecting 👟
  { name: "Adidas Forum Low", price: 5500, category: "Sneaker Collecting" },
  {
    name: "Shoe Storage Display Box (3pcs)",
    price: 1000,
    category: "Sneaker Collecting",
  },
];
