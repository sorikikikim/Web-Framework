/**
 * routes/auth.js
 */

 const express = require('express');
 const passport = require('passport');
 const bcrypt = require('bcrypt');
 const { isLoggedIn, isNotLoggedIn } = require('./middlewares');
 const User = require('../models/user');
 
 const router = express.Router();

 //회원 가입 요청 처리 : POST /auth/join
 router.post('/join', isNotLoggedIn, async (req, res, next) => {
   const { email, nick, password } = req.body;
   try {
	 //DB 모델에서 사용자 검색
	 const exUser = await User.findOne({ where: { email } });
	 if (exUser) {
	   return res.redirect('/join?error=exist'); //존재하면 error
	 }
	 //존재하지 않으면 생성
	 const hash = await bcrypt.hash(password, 12); //password 암호화
	 // = INSERT INTO (user) VALUES (...)
	 await User.create({
	   email,
	   nick,
	   password: hash,
	 });
	 return res.redirect('/');
   } catch (error) {
	 console.error(error);
	 return next(error);
   }
 });

 //로그인 처리 : POST /auth/login
 router.post('/login', isNotLoggedIn, (req, res, next) => {
   //local 전략으로 login
   passport.authenticate('local', (authError, user, info) => { 
	 //인증 에러
	 if (authError) {
	   console.error(authError);
	   return next(authError);
	 }
	 //인증 성공시 user 정보 체크
	 if (!user) {
	   return res.redirect(`/?loginError=${info.message}`);
	 }
	 //성공하면 req.login으로 세션에 유저 정보 저장
	 return req.login(user, (loginError) => {
	   if (loginError) {
		 console.error(loginError);
		 return next(loginError);
	   }
	   //로그인 세션 종료 후 '/'으로 이동
	   return res.redirect('/');
	 });
   })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
 });
 
 //로그아웃 처리 : GET /auth/logout
 router.get('/logout', isLoggedIn, (req, res) => {
   req.logout();
   req.session.destroy();
   res.redirect('/');
 });
 

 //kakao 전략
 router.get('/kakao', passport.authenticate('kakao'));
 
 //인증 실패 
 router.get('/kakao/callback', passport.authenticate('kakao', {
   failureRedirect: '/',
 }), (req, res) => {
   //인증 성공
   res.redirect('/');
 });
 
 module.exports = router;
 