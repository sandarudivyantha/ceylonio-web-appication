const Admin = require('../models/admin.models');
const bcrypt = require('bcrypt');

const addAdmin = async (req, res) => {
  const { adminId, fName, lName, nic, gender, email, phoneNumber, role, password } = req.body;

  try {
    const admin = await Admin.addAdmin(adminId, fName, lName, nic, gender, email, phoneNumber, role, password);
    res.status(200).json({ message: 'Admin added successfully', adminId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const validateAdmin = async (req, res) => {
  const { adminId, password } = req.body;

  try {
    const admin = await Admin.validateAdmin(adminId, password);
    res.status(200).json({ message: 'Admin validated successfully', adminId });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getAdmins = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.json(admins);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json("Admin not found");
    }

    res.json(admin);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const updateAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json("Admin not found");
    }

    const { adminId, fName, lName, nic, gender, email, phoneNumber, role, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedAdmin = await Admin.findByIdAndUpdate(userId, {
      adminId,
      fName,
      lName,
      nic,
      gender,
      email,
      phoneNumber,
      role: 'Admin',
      password: hashedPassword,
    }, { new: true }); // Add { new: true } to see the updated document in the response

    res.status(200).json(updatedAdmin);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const removeAdmin = async (req, res) => {
  const userId = req.params.id;

  try {
    const admin = await Admin.findById(userId);

    if (!admin) {
      return res.status(404).json("Admin not found");
    }

    const removedAdmin = await Admin.findByIdAndDelete(userId);
    res.status(200).json(removedAdmin);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

module.exports = {
  addAdmin,
  validateAdmin,
  getAdmins,
  getAdmin,
  updateAdmin,
  removeAdmin
}
