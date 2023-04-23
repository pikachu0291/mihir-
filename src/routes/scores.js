const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const client = require('../app');

// Define route handler for storing scores
router.post('/', async (req, res) => {
  const { score } = {};

  try {
    const database = client.db('UserRegisteration');
    const collection = database.collection('scores');
    const result = await collection.One({ score });
    console.log(`Inserted score with id`);
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

module.exports = router;
