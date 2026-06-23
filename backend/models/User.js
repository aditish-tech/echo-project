const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    goal: {
      type: String,
      default: ''
    },
    why: {
      type: String,
      default: ''
    },
    personaTraits: {
      type: [String],
      default: []
    },
    onboardingAnswers: {
      type: Map,
      of: String,
      default: {}
    },
    routineTip: {
      type: String,
      default: ''
    },
    routineTipDate: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('User', UserSchema);
