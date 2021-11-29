var mongoose = require('mongoose')
const passwordHash = require('password-hash');


// mongoose.Promise = global.Promise;

const SuparAdminSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: false,
    default: 'https://eshendetesia.com/images/user-profile.png'
  },
  user_type: {
    type: String,
    default: "Admin"
  },
  token: {
    type: String,
    required: false,
    unique: true,
  }
});

SuparAdminSchema.methods.comparePassword = function (candidatePassword) {
  return passwordHash.verify(candidatePassword, this.password);
};

module.exports = mongoose.model('admin', SuparAdminSchema);