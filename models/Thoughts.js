const { Schema, model } = require('mongoose');
const reactionSchema = require('./Reactions');
const dayjs = require('dayjs')

const timeStamp =(currentDate) => dayjs(currentDate).format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
// Schema to create Student model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 1,
    },
    createAt: {
      type: Date,
      default: Date.now,
      get: time => timeStamp(time)
    },
    userName: {
      type: String,
      required: true,
    },
    reactions: [reactionSchema],
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const Thoughts = model('Thoughts', thoughtSchema);

module.exports = Thoughts;
