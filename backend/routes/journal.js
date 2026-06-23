const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const authenticateUser = require('../middleware/auth');
const { getModels } = require('../services/dbHelper');
const { getFutureYouJournalReply } = require('../services/aiService');

// Rate limiting middleware for AI generation to protect API costs
const journalAiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20, // Limit each IP or user token to 20 journal submissions per window
  message: {
    error: 'Too many journal entries submitted. Take a moment to reflect, Future You will be ready again in 15 minutes.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// @route   POST /api/journal
// @desc    Submit journal entry, get AI Future You reply, save to DB
// @access  Private
router.post('/', authenticateUser, journalAiLimiter, async (req, res) => {
  try {
    const { Journal } = getModels();
    const { entry } = req.body;
    const user = req.user;

    if (!entry || entry.trim() === '') {
      return res.status(400).json({ error: 'Journal entry text cannot be empty.' });
    }

    if (!user.goal) {
      return res.status(400).json({ error: 'Please set your Future You goal before journaling.' });
    }

    // Call the AI integration layer
    const replyText = await getFutureYouJournalReply(user, entry);

    // Save journal entry + reply to database
    const newJournal = await Journal.create({
      userId: user._id,
      entryText: entry,
      replyText: replyText
    });

    res.status(201).json(newJournal);
  } catch (error) {
    console.error('Journal entry submission error:', error);
    res.status(500).json({ error: 'Something went wrong generating your future self reply.' });
  }
});

// @route   GET /api/journal
// @desc    Get user journal history
// @access  Private
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { Journal } = getModels();
    const journals = await Journal.find({ userId: req.user.id })
      .sort({ createdAt: -1 }); // Newest first

    res.json(journals);
  } catch (error) {
    console.error('Fetch journals error:', error);
    res.status(500).json({ error: 'Server error retrieving journal history.' });
  }
});

module.exports = router;
