// Routes file contains the different endpoints

import express from 'express';
import WordsList from './wordsList.js';
import Rank from './rank.js';

const router = express.Router();

router.get('/words',WordsList.getWordsObj);
router.post('/rank',Rank.calRank);
export default router;