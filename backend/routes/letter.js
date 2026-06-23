const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authenticateUser = require('../middleware/auth');
const { getModels } = require('../services/dbHelper');
const { getMilestoneLetter } = require('../services/aiService');

// Rate limiting to protect Groq API costs
const letterAiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5, // Limit each user to 5 letters per hour
  message: {
    error: 'Your future self is reflecting on your path. Please wait a bit before requesting another milestone letter.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// @route   POST /api/letter
// @desc    Generate a new reflective milestone letter
// @access  Private
router.post('/', authenticateUser, letterAiLimiter, async (req, res) => {
  try {
    const { Letter, Journal } = getModels();
    const user = req.user;

    // Fetch journal entries to use as context
    const journals = await Journal.find({ userId: user._id }).sort({ createdAt: 1 });

    if (journals.length === 0) {
      return res.status(400).json({ 
        error: 'You need to write at least one journal entry before your future self can write a milestone letter.' 
      });
    }

    // Generate letter content via Groq service
    const content = await getMilestoneLetter(user, journals);

    // Create a title based on milestone number
    const letterCount = await Letter.countDocuments({ userId: user._id });
    const title = `Reflection #${letterCount + 1}: Looking Back on the Struggle`;

    const newLetter = await Letter.create({
      userId: user._id,
      title,
      content
    });

    res.status(201).json(newLetter);
  } catch (error) {
    console.error('Generate letter error:', error);
    res.status(500).json({ error: 'Server error generating milestone letter.' });
  }
});

// @route   GET /api/letter
// @desc    Get all milestone letters for user
// @access  Private
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { Letter } = getModels();
    const letters = await Letter.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(letters);
  } catch (error) {
    console.error('Fetch letters error:', error);
    res.status(500).json({ error: 'Server error retrieving letters.' });
  }
});

module.exports = router;
