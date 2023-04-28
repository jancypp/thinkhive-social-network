const { Schema, Types } = require('mongoose');
const dayjs = require('dayjs')

const timeStamp =(currentDate) => dayjs(currentDate).format('[YYYYescape] YYYY-MM-DDTHH:mm:ssZ[Z]')
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: time => timeStamp(time)
    },
  },
  {
    toJSON: {
      getters: true,
    },
    id: false,
  }
);

module.exports = reactionSchema;
