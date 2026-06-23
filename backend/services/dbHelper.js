const { getIsConnected } = require('../config/db');
const User = require('../models/User');
const Journal = require('../models/Journal');
const Letter = require('../models/Letter');
const Schedule = require('../models/Schedule');
const RoutineItem = require('../models/RoutineItem');
const { MockUser, MockJournal, MockLetter, MockSchedule, MockRoutineItem } = require('./mockDbService');

const getModels = () => {
  if (getIsConnected()) {
    return { User, Journal, Letter, Schedule, RoutineItem };
  } else {
    return { 
      User: MockUser, 
      Journal: MockJournal, 
      Letter: MockLetter, 
      Schedule: MockSchedule,
      RoutineItem: MockRoutineItem
    };
  }
};

module.exports = { getModels };
