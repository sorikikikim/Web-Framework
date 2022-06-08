const express = require('express');
const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
const { Post, User, Hashtag } = require('../models');

const router = express.Router();

router.use((req, res, next) => {
  res.locals.user = req.user;
  res.locals.followerCount = req.user ? req.user.Followers.length : 0;
  res.locals.followingCount = req.user ? req.user.Followings.length : 0;
  res.locals.followerIdList = req.user ? req.user.Followings.map(f => f.id) : [];
  next();
});

router.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile', { title: 'Profile - prj-name' });
});

router.get('/join', isNotLoggedIn, (req, res) => {
  res.render('join', { title: 'Join to - prj-name' });
});

router.get('/', async (req, res, next) => {
  try {
    // 동적 쿼리 처리를 위한 where
    let where = {}
    
    // query string에 userId가 있으면
    if (req.query.userId) {
      
      // where 조건에 추가
      where.userId = req.query.userId;
    }
    
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "nick"],
        },
        {
          model: User,
          attributes: ["id", "nick"],
          as: "likeUser",
        },
      ],
      // 동적 where조건 처리
      where: where,
      order: [["createdAt", "DESC"]],
    });

    res.render('main', {
      title: 'prj-name',
      twits: posts,
    });
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.get('/hashtag', async (req, res, next) => {
  const query = req.query.hashtag;
  if (!query) {
    return res.redirect('/');
  }
  try {
    const hashtag = await Hashtag.findOne({ where: { title: query } });
    let posts = [];
    if (hashtag) {
      posts = await hashtag.getPosts({ include: [{ model: User }] });
    }

    return res.render('main', {
      title: `${query} | NodeBird`,
      twits: posts,
    });
  } catch (error) {
    console.error(error);
    return next(error);
  }
});

module.exports = router;