const User = require('../models/User');
const bcrypt = require('bcrypt');
const createToken = require('../utils/GenerateTokens');

const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  try {
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'user'
    });

    const userObject = user.toObject();
    delete userObject.password;


    res.status(201).json({
      message: 'User registered successfully',
      user: userObject
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Invalid credentials' });
    }

    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    
    const token = createToken(user._id, user.role);

    const userObject = user.toObject();
    delete userObject.password;

    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
      message: 'Login successful',
      user: userObject
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

const profile = async (req, res) => {
  try {
    const user = req.user; 
    if (!user) return res.status(404).json({ message: 'User not found' });

    const userObj = user.toObject();
    delete userObj.password;

    res.status(200).json(userObj);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

const updateProfile = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    
    if (name) user.name = name;
    if (email) user.email = email;
    if (password) {
      const hashed = await bcrypt.hash(password, 10);
      user.password = hashed;
    }

    const updatedUser = await user.save();
    const userObj = updatedUser.toObject();
    delete userObj.password;

    res.status(200).json({
      message: 'Profile updated successfully',
      user: userObj
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};


module.exports = {
  register,login,profile,updateProfile
};

