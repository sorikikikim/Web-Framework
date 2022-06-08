/**
 * routes/user.js
 */

 const express = require('express');

 const { isLoggedIn } = require('./middlewares');
 const User = require('../models/user');
 
 const router = express.Router();
 
 //사용자 팔로우 처리 : POST /user/:id/follow
 //id = req.user.id
 router.post('/:id/follow', isLoggedIn, async (req, res, next) => {
   try {
	 //req.user.id : 로그인 한 사용자
	 const user = await User.findOne({ where: { id: req.user.id } });
	 if (user) {
	   //req.params.id 팔로잉 할 대상
	   //sequelize에서 추가한 메서드로 현재 로그인 한 사용자와의 관계를 지정
	   await user.addFollowing(parseInt(req.params.id, 10));
	   res.send('success');
	 } else {
	   res.status(404).send('no user');
	 }
   } catch (error) {
	 console.error(error);
	 next(error);
   }
 });
 
 module.exports = router;
 