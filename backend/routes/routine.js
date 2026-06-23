const express = require('express');
const router = express.Router();
const authenticateUser = require('../middleware/auth');
const { getModels } = require('../services/dbHelper');
const { getRoutineTip } = require('../services/aiService');

// Helper to get today's date string in YYYY-MM-DD format
const getTodayDateString = () => {
  const d = new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

// @route   GET /api/routine
// @desc    Get user's routine items grouped by block, and cached Future You routine tip
// @access  Private
router.get('/', authenticateUser, async (req, res) => {
  try {
    const { RoutineItem, User } = getModels();
    const user = req.user;
    const todayStr = getTodayDateString();

    // Fetch items
    const items = await RoutineItem.find({ userId: user._id });

    // Check and reset completedToday dynamically if lastCompletedDate is a different calendar day
    const today = new Date();
    let updatedAny = false;

    for (let item of items) {
      if (item.completedToday && item.lastCompletedDate) {
        const lastDate = new Date(item.lastCompletedDate);
        const isToday = lastDate.getFullYear() === today.getFullYear() &&
                        lastDate.getMonth() === today.getMonth() &&
                        lastDate.getDate() === today.getDate();
        if (!isToday) {
          item.completedToday = false;
          item.lastCompletedDate = null;
          await item.save();
          updatedAny = true;
        }
      }
    }

    // If any items were updated, we re-fetch to get clean objects (though not strictly necessary, it is safe)
    let finalItems = items;
    if (updatedAny) {
      finalItems = await RoutineItem.find({ userId: user._id });
    }

    // Group by block
    const grouped = {
      morning: finalItems.filter(i => i.block === 'morning'),
      afternoon: finalItems.filter(i => i.block === 'afternoon'),
      evening: finalItems.filter(i => i.block === 'evening')
    };

    // Get Future You daily tip (generate and cache if empty/outdated)
    let tip = '';
    if (user.goal) {
      if (user.routineTip && user.routineTipDate === todayStr) {
        tip = user.routineTip;
      } else {
        // Generate new tip
        tip = await getRoutineTip(user);
        
        // Find user model specifically to save cache
        const userDb = await User.findById(user._id);
        if (userDb) {
          userDb.routineTip = tip;
          userDb.routineTipDate = todayStr;
          await userDb.save();
        }
      }
    } else {
      tip = 'Set your Future You goal to unlock daily advice and routine coordinates.';
    }

    res.json({
      routine: grouped,
      tip
    });
  } catch (error) {
    console.error('Fetch routine error:', error);
    res.status(500).json({ error: 'Server error retrieving routine.' });
  }
});

// @route   POST /api/routine
// @desc    Add a new routine item
// @access  Private
router.post('/', authenticateUser, async (req, res) => {
  try {
    const { RoutineItem } = getModels();
    const { block, task } = req.body;

    if (!block || !['morning', 'afternoon', 'evening'].includes(block)) {
      return res.status(400).json({ error: 'Valid time block (morning, afternoon, evening) is required.' });
    }

    if (!task || task.trim() === '') {
      return res.status(400).json({ error: 'Task text is required.' });
    }

    const newItem = await RoutineItem.create({
      userId: req.user._id,
      block,
      task: task.trim()
    });

    res.status(201).json(newItem);
  } catch (error) {
    console.error('Create routine item error:', error);
    res.status(500).json({ error: 'Server error creating routine item.' });
  }
});

// @route   PUT /api/routine/:id
// @desc    Toggle completion or edit routine task text
// @access  Private
router.put('/:id', authenticateUser, async (req, res) => {
  try {
    const { RoutineItem } = getModels();
    const { id } = req.params;
    const { completedToday, task } = req.body;

    const item = await RoutineItem.findOne({ _id: id, userId: req.user._id });
    if (!item) {
      return res.status(404).json({ error: 'Routine item not found.' });
    }

    if (completedToday !== undefined) {
      item.completedToday = completedToday;
      item.lastCompletedDate = completedToday ? new Date() : null;
    }

    if (task !== undefined) {
      if (task.trim() === '') {
        return res.status(400).json({ error: 'Task text cannot be empty.' });
      }
      item.task = task.trim();
    }

    await item.save();
    res.json(item);
  } catch (error) {
    console.error('Update routine item error:', error);
    res.status(500).json({ error: 'Server error updating routine item.' });
  }
});

// @route   DELETE /api/routine/:id
// @desc    Remove a routine item
// @access  Private
router.delete('/:id', authenticateUser, async (req, res) => {
  try {
    const { RoutineItem } = getModels();
    const { id } = req.params;

    const item = await RoutineItem.findOne({ _id: id, userId: req.user._id });
    if (!item) {
      return res.status(404).json({ error: 'Routine item not found.' });
    }

    await item.deleteOne();
    res.json({ message: 'Routine item removed successfully.' });
  } catch (error) {
    console.error('Delete routine item error:', error);
    res.status(500).json({ error: 'Server error deleting routine item.' });
  }
});

module.exports = router;
