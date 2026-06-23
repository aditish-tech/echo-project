const mongoose = require('mongoose');

const JournalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    entryText: {
      type: String,
      required: true,
      trim: true
    },
    replyText: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Journal', JournalSchema);
