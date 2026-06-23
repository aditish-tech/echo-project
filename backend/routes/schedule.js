const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const { getModels } = require('../services/dbHelper');
const { getSuggestedActions } = require('../services/aiService');

// Helper to get today's date string in YYYY-MM-DD format
const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// @route   GET /api/schedule
// @desc    Fetch daily suggested actions. Generates them if not exists for today.
// @access  Private
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { Schedule } = getModels();
    const user = req.user;
    const todayStr = getTodayDateString();

    if (!user.goal) {
      return res.status(400).json({ error: 'Please set your Future You goal before requesting a daily schedule.' });
    }

    // Try to find schedule for today
    let schedule = await Schedule.findOne({ userId: user._id, date: todayStr });

    if (!schedule) {
      // Generate new actions using AI service
      const suggestedTexts = await getSuggestedActions(user);
      
      const actions = suggestedTexts.map(text => ({
        text,
        completed: false
      }));

      try {
        schedule = await Schedule.create({
          userId: user._id,
          date: todayStr,
          actions
        });
      } catch (dbError) {
        // Handle concurrent request race conditions
        schedule = await Schedule.findOne({ userId: user._id, date: todayStr });
        if (!schedule) {
          throw dbError;
        }
      }
    }

    res.json(schedule);
  } catch (error) {
    console.error('Fetch schedule error:', error);
    res.status(500).json({ error: 'Server error retrieving suggested actions.' });
  }
});

// @route   PUT /api/schedule/:actionId
// @desc    Toggle action completion status
// @access  Private
router.put('/:actionId', authenticateUser, async (req, res) => {
  try {
    const { Schedule } = getModels();
    const { actionId } = req.params;
    const todayStr = getTodayDateString();

    // Find today's schedule for this user
    const schedule = await Schedule.findOne({ userId: req.user._id, date: todayStr });

    if (!schedule) {
      return res.status(404).json({ error: "Today's schedule not found or not yet generated." });
    }

    // Find the action inside the schedule
    const action = schedule.actions.id(actionId);
    if (!action) {
      return res.status(404).json({ error: 'Action item not found.' });
    }

    // Toggle completion status
    action.completed = !action.completed;
    await schedule.save();

    res.json(schedule);
  } catch (error) {
    console.error('Toggle action error:', error);
    res.status(500).json({ error: 'Server error toggling action.' });
  }
});

module.exports = router;
