const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const validator = require('validator');

const adminSchema = new Schema({
  adminId: {
    type: String,
    required: true,
    unique: true,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  nic: {
    type: String,
    required: true,
    unique: true,
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "Admin",
  },
  password: {
    type: String,
    required: true,
    minlength: 7,
  },
});

adminSchema.statics.addAdmin = async function (adminId, fName, lName, nic, gender, email, phoneNumber, role, password) {
  if (!adminId || !password) {
    throw Error('All fields must be filled');
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough');
  }

  const exists = await this.findOne({ adminId });

  if (exists) {
    throw Error('Admin already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const admin = await this.create({ adminId, fName, lName, nic, gender, email, phoneNumber, role: 'Admin', password: hash });

  return admin;
};

adminSchema.statics.validateAdmin = async function (adminId, password) {
  if (!adminId || !password) {
    throw Error('All fields must be filled');
  }

  const admin = await this.findOne({ adminId });
  if (!admin) {
    throw Error('Admin does not exist');
  }

  const match = await bcrypt.compare(password, admin.password);
  if (!match) {
    throw Error('Incorrect password');
  }

  return admin;
};

module.exports = mongoose.model("Admin", adminSchema);
