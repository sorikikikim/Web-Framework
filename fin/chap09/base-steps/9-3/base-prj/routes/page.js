/**
 * routes/page.js
 */

const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = null;
  res.locals.followerCount = 0;
  res.locals.followingCount = 0;
  res.locals.followerIdList = [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'Profile - prj-name' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: 'Join to - prj-name' });
});

router.get('/', (req, res, next) => {
  const twits = [];
  res.render('main', {
    title: 'prj-name',
    twits,
  });
});

module.exports = router;