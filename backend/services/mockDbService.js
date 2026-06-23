// In-memory mock database storage
const mockDb = {
  users: [],
  journals: [],
  letters: [],
  schedules: [],
  routineItems: []
};

// Generates a mock object ID string
const generateId = () => Math.random().toString(36).substring(2, 9);

const MockUser = {
  findOne: async (query) => {
    if (query.email) {
      return mockDb.users.find(u => u.email.toLowerCase() === query.email.toLowerCase()) || null;
    }
    return null;
  },
  findById: async (id) => {
    return mockDb.users.find(u => u._id === id.toString()) || null;
  },
  create: async (data) => {
    const newUser = {
      _id: generateId(),
      name: data.name,
      email: data.email,
      password: data.password,
      goal: '',
      why: '',
      personaTraits: [],
      onboardingAnswers: new Map(),
      createdAt: new Date(),
      save: async function() {
        // Find in array and update
        const idx = mockDb.users.findIndex(u => u._id === this._id);
        if (idx !== -1) {
          mockDb.users[idx] = this;
        }
        return this;
      }
    };
    mockDb.users.push(newUser);
    return newUser;
  }
};

const MockJournal = {
  find: (query) => {
    const results = mockDb.journals.filter(j => j.userId === query.userId.toString());
    return {
      sort: (sortQuery) => {
        return results.sort((a, b) => {
          return sortQuery.createdAt === -1 
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt);
        });
      }
    };
  },
  create: async (data) => {
    const newJournal = {
      _id: generateId(),
      userId: data.userId.toString(),
      entryText: data.entryText,
      replyText: data.replyText,
      createdAt: new Date()
    };
    mockDb.journals.push(newJournal);
    return newJournal;
  }
};

const MockLetter = {
  find: (query) => {
    const results = mockDb.letters.filter(l => l.userId === query.userId.toString());
    return {
      sort: (sortQuery) => {
        return results.sort((a, b) => {
          return sortQuery.createdAt === -1 
            ? new Date(b.createdAt) - new Date(a.createdAt)
            : new Date(a.createdAt) - new Date(b.createdAt);
        });
      }
    };
  },
  countDocuments: async (query) => {
    return mockDb.letters.filter(l => l.userId === query.userId.toString()).length;
  },
  create: async (data) => {
    const newLetter = {
      _id: generateId(),
      userId: data.userId.toString(),
      title: data.title,
      content: data.content,
      createdAt: new Date()
    };
    mockDb.letters.push(newLetter);
    return newLetter;
  }
};

const MockSchedule = {
  findOne: async (query) => {
    return mockDb.schedules.find(s => s.userId === query.userId.toString() && s.date === query.date) || null;
  },
  create: async (data) => {
    const newSchedule = {
      _id: generateId(),
      userId: data.userId.toString(),
      date: data.date,
      actions: data.actions.map(a => ({
        _id: generateId(),
        text: a.text,
        completed: a.completed || false
      })),
      createdAt: new Date(),
      save: async function() {
        const idx = mockDb.schedules.findIndex(s => s._id === this._id);
        if (idx !== -1) {
          mockDb.schedules[idx] = this;
        }
        return this;
      }
    };
    // Mock the Mongoose sub-document id helper
    newSchedule.actions.id = function(actionId) {
      return this.find(a => a._id === actionId.toString()) || null;
    };
    mockDb.schedules.push(newSchedule);
    return newSchedule;
  }
};

const MockRoutineItem = {
  find: async (query) => {
    const results = mockDb.routineItems.filter(r => r.userId === query.userId.toString());
    return results.map(item => ({
      ...item,
      save: async function() {
        const idx = mockDb.routineItems.findIndex(r => r._id === this._id);
        if (idx !== -1) {
          mockDb.routineItems[idx] = {
            _id: this._id,
            userId: this.userId,
            block: this.block,
            task: this.task,
            completedToday: this.completedToday,
            lastCompletedDate: this.lastCompletedDate,
            createdAt: this.createdAt
          };
        }
        return this;
      },
      deleteOne: async function() {
        const idx = mockDb.routineItems.findIndex(r => r._id === this._id);
        if (idx !== -1) {
          mockDb.routineItems.splice(idx, 1);
        }
        return this;
      }
    }));
  },
  findOne: async (query) => {
    const item = mockDb.routineItems.find(r => r._id === query._id.toString() && r.userId === query.userId.toString());
    if (!item) return null;
    return {
      ...item,
      save: async function() {
        const idx = mockDb.routineItems.findIndex(r => r._id === this._id);
        if (idx !== -1) {
          mockDb.routineItems[idx] = {
            _id: this._id,
            userId: this.userId,
            block: this.block,
            task: this.task,
            completedToday: this.completedToday,
            lastCompletedDate: this.lastCompletedDate,
            createdAt: this.createdAt
          };
        }
        return this;
      },
      deleteOne: async function() {
        const idx = mockDb.routineItems.findIndex(r => r._id === this._id);
        if (idx !== -1) {
          mockDb.routineItems.splice(idx, 1);
        }
        return this;
      }
    };
  },
  create: async (data) => {
    const newItem = {
      _id: generateId(),
      userId: data.userId.toString(),
      block: data.block,
      task: data.task,
      completedToday: data.completedToday || false,
      lastCompletedDate: data.lastCompletedDate || null,
      createdAt: new Date()
    };
    mockDb.routineItems.push(newItem);
    return {
      ...newItem,
      save: async function() {
        const idx = mockDb.routineItems.findIndex(r => r._id === this._id);
        if (idx !== -1) {
          mockDb.routineItems[idx] = {
            _id: this._id,
            userId: this.userId,
            block: this.block,
            task: this.task,
            completedToday: this.completedToday,
            lastCompletedDate: this.lastCompletedDate,
            createdAt: this.createdAt
          };
        }
        return this;
      },
      deleteOne: async function() {
        const idx = mockDb.routineItems.findIndex(r => r._id === this._id);
        if (idx !== -1) {
          mockDb.routineItems.splice(idx, 1);
        }
        return this;
      }
    };
  },
  deleteOne: async (query) => {
    const idx = mockDb.routineItems.findIndex(r => r._id === query._id.toString());
    if (idx !== -1) {
      mockDb.routineItems.splice(idx, 1);
    }
  }
};

module.exports = {
  MockUser,
  MockJournal,
  MockLetter,
  MockSchedule,
  MockRoutineItem,
  mockDb
};
