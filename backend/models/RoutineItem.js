const mongoose = require('mongoose');

const RoutineItemSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    block: {
      type: String,
      enum: ['morning', 'afternoon', 'evening'],
      required: true
    },
    task: {
      type: String,
      required: true,
      trim: true
    },
    completedToday: {
      type: Boolean,
      default: false
    },
    lastCompletedDate: {
      type: Date,
      default: null
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }
);

module.exports = mongoose.model('RoutineItem', RoutineItemSchema);
