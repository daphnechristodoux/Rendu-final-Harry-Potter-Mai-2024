// Dans ce fichier sont définies les 3 méthodes, pour signup, login et affichage du profil

import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'; // dans node, l install de jwt ne fonctionnait pas j ai du installer jsonwebtokebn écrit comme ça
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

const prisma = new PrismaClient();
const app = express();
const PORT = 3000;

const jwtSecret = process.env.JWT_SECRET || '1bd2cc946d7ff70b6b5a783a3f67c872ec243ae2a7481ebb3620e0948eb76efc';

app.use(express.json());
app.use(cors());

// Route POST pour le signup
app.post('/auth/signup', async (req, res) => {
  const { email, pseudo, password } = req.body;

  try {
    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return res.status(409).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        email,
        pseudo,
        password: hashedPassword
      }
    });

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    console.error('Error signing up user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route POST pour le login
app.post('/auth/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, jwtSecret, {
      expiresIn: '1h'  // le token n est valable que une heure
    });

    res.status(200).json({ user, token });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route GET pour récupérer les informations sur le user
app.get('/user/profile', async (req, res) => {
  try {
    const token = req.headers['x-access-token'];
    if (!token) {
      return res.status(401).json({ error: 'erreur pas de token' });
    }

    const decodedToken = jwt.verify(token, jwtSecret);
    const userId = decodedToken.id;

    const userProfile = await prisma.user.findUnique({
      where: { id: userId }
    });

    if (!userProfile) {
      return res.status(404).json({ error: 'user non défini' });
    }

    res.status(200).json(userProfile);
  } catch (error) {
    console.error('Error de fetch :', error);
    res.status(500).json({ error: 'erreur internal server' });
  }
});

// Lancement du serveur, qui va utiliser le port 3000 ici (codé en dur dans les 3 front)
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
