import express from 'express';
import { getProfile, signUp } from './UserController.js';

const router = express.Router();

// Route pour s'inscrire
router.post('/signup', signUp);

// Route pour afficher le profil de l'utilisateur
router.get('/profile', getProfile);

export default router;
