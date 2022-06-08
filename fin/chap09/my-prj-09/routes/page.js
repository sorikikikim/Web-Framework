/**
 * routes/page.js
 */

 const express = require('express');
 const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
 const { Post, User, Hashtag } = require('../models');
 
 const router = express.Router();
 
 router.use((req, res, next) => {
   res.locals.user = null;
   res.locals.followerCount = req.user ? req.user.Followers.length : 0;
   res.locals.followingCount = req.user ? req.user.Followings.length : 0;
   //팔로워 아이디 리스트에 게시글 작성자의 아이디가 존재하지 않으면 팔로우 버튼을 보여주기 위함  
   res.locals.followerIdList = req.user ? req.user.Followings.map(f=>f.id) : [];
   next();
 });
 
 router.get('/profile', isLoggedIn, (req, res) => {
   res.render('profile', { title: 'Profile - prj-name' });
 });
 
 router.get('/join', isNotLoggedIn, (req, res) => {
   res.render('join', { title: 'Join to - prj-name' });
 });
 
 //게시글 조회 처리 : GET /
 router.get('/', async (req, res, next) => {
   try {
	//메인 페이지 요청시 게시글 먼저 조회한 후
	 const posts = await Post.findAll({
	   //관계가 있는 모델을 합쳐서 가져올 수 있음 (post - user = N : 1)
	   //게시글 가져올 때 작성자까지 함께 로드
	   include: {
		 model: User,
		 attributes: ['id', 'nick'],
	   },
	   order: [['createdAt', 'DESC']],
	 });
	 //템플릿 엔진 렌더링
	 res.render('main', {
	   title: 'prj-name',
	   twits: posts,
	 });
   } catch (err) {
	 console.error(err);
	 next(err);
   }
 });
 
 //해시태그 검색 처리 : GET /hashtag
 router.get('/hashtag', async (req, res, next) => {
   const query = req.query.hashtag;
   if (!query) {
	 return res.redirect('/');
   }
   try {
	 //해시태그 먼저 찾고
	 const hashtag = await Hashtag.findOne({ where: { title: query } });
	 let posts = [];
	 if (hashtag) {
	   //해시태그와 관련된 게시글을 모두 찾음
	   posts = await hashtag.getPosts({ 
		   //게시글을 찾으면서 User 모델도 같이 로드
		   include: [{ model: User }] 
		});
	 }
 
	 return res.render('main', {
	   title: `${query} | prj-name`,
	   twits: posts,
	 });
   } catch (error) {
	 console.error(error);
	 return next(error);
   }
 });
 
 module.exports = router;