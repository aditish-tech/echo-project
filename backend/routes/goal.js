const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const { getModels } = require('../services/dbHelper');

// @route   POST /api/goal
// @desc    Save user goal and onboarding answers
// @access  Private
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { User } = getModels();
    const { goal, why, personaTraits, onboardingAnswers } = req.body;

    if (!goal || !why) {
      return res.status(400).json({ error: 'Goal and motivation ("why") are required.' });
    }

    // Find and update user goal details dynamically
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    user.goal = goal;
    user.why = why;
    if (personaTraits) user.personaTraits = personaTraits;
    if (onboardingAnswers) {
      // Maps behave differently between vanilla objects and mongoose maps
      if (typeof user.onboardingAnswers.set === 'function') {
        Object.entries(onboardingAnswers).forEach(([k, v]) => {
          user.onboardingAnswers.set(k, v);
        });
      } else {
        user.onboardingAnswers = onboardingAnswers;
      }
    }

    await user.save();

    res.json({
      message: 'Goal settings saved successfully.',
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        goal: user.goal,
        why: user.why,
        personaTraits: user.personaTraits
      }
    });
  } catch (error) {
    console.error('Goal Save Error:', error);
    res.status(500).json({ error: 'Server error saving goals.' });
  }
});

module.exports = router;
