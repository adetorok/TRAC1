import { Router } from 'express';
import { login, profile } from '../controllers/auth.controller.js';
import { requireAuth } from '../middleware/auth.js';

const r = Router();
r.post('/login', login);
r.get('/profile', requireAuth, profile);

export default r;


