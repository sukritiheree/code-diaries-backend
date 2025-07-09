import bcrypt from 'bcrypt';
import { User } from '../models/user.model.js'; 
import jwt from "jsonwebtoken"
import { Profile } from "../models/profile.model.js";

export const signup = async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(400).json({ message: 'Please fill all the details' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    console.log(hashedPassword);

    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();

    const newProfile = new Profile({
      name: username,
      email: email,
      
    });
    await newProfile.save();

    return res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Error registering user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const signin = async (req, res) => {
    const { username, password } = req.body;

    try {
    
      const user = await User.findOne({ username });
  
      if (!user) {
         
          return res.json({ status: 'error', message: 'Invalid email or password' });
        }
        
        
        const isPasswordValid = await bcrypt.compare(password, user.password);
       
        if (!isPasswordValid) {
            return res.json({ status: 'error', message: 'Invalid email or password' });
        }
        
       
      const token = jwt.sign({ userId: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      res.json({ status: 'ok', message: 'Login Successful', user: token });

      
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: 'error', message: 'An error occurred. Please try again later.' });
    }
};

export const me = async (req, res) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }
  //get the token's first part 
  const token = authHeader.split(' ')[1];
 

    
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.userId);
  
    res.json({ user });
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}