const express = require('express');
const mongoose = require('mongoose');

const app = express();
const port = process.env.PORT || 28203;
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.log('MongoDB connection error: ', err));

  app.get('/collections', async (req, res) => {
    try {
      const collections = await mongoose.connection.db.listCollections().toArray();
      res.json(collections);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Запуск сервера
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
