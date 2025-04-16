import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import 'dotenv/config';

export const signup = async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = new User({ username, password });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '5h' });

    res.status(201).json({ 
      success: true,
      message: 'User created successfully',
      token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during signup' });
  }
};


export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ 
      success: true,
      message: 'Login successful',
      token 
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error during login' });
  }
};