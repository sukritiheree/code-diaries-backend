import express from 'express';
import { signup, signin, me } from '../controllers/auth.controller.js'; // Adjust the path as necessary

const router = express.Router();

// Define routes
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/me', me);

export default router;