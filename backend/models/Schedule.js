const mongoose = require('mongoose');

const ActionSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean,
    default: false
  }
});

const ScheduleSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    actions: [ActionSchema],
    date: {
      type: String, // Stored as YYYY-MM-DD
      required: true
    }
  },
  {
    timestamps: true
  }
);

// Prevent duplicate schedules for a user on the same date
ScheduleSchema.index({ userId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model('Schedule', ScheduleSchema);
