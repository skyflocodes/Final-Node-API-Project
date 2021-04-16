const mongoose = require('mongoose');

const peoplechema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    dropDups: true,
    validate: [
      {
        validator: async function (value) {
          const count = await this.model('Person')
          .countDocuments({ name: value });
          return !count;
        },
        message: props => `${props.value} is already in the database, please enter a unique name.`
      }
    ]
  }
}, {
  timestamps: true
});
module.exports = mongoose.model('Person', peoplechema);