/**
 * routes/post.js
 */

 const express = require('express');
 const multer = require('multer');
 const path = require('path');
 const fs = require('fs');
 
 const { Post, Hashtag } = require('../models');
 const { isLoggedIn } = require('./middlewares');
 
 const router = express.Router();
 
 //uploads 폴더 확인 후 존재하지 않으면 생성
 try {
   fs.readdirSync('uploads');
 } catch (error) {
   console.error('uploads 폴더가 없어 uploads 폴더를 생성');
   fs.mkdirSync('uploads');
 }
 
 //업로드 미들웨어 생성
 const upload = multer({
   //파일을 서버 디스크에 저장
   storage: multer.diskStorage({
	 //저장 경로
	 destination(req, file, cb) {
	   cb(null, 'uploads/');
	 },
	 //파일명
	 filename(req, file, cb) {
	   const ext = path.extname(file.originalname);
	   cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
	 },
   }),
   //파일 최대 용량
   limits: { fileSize: 5 * 1024 * 1024 },
 });
 
 //이미지 등록 처리 : POST /post/img
 //upload.single('img') : 요청의 img에 담긴 파일을 저장하는 미들웨어
 router.post('/img', isLoggedIn, upload.single('img'), (req, res) => {
	 console.log(req.file);
	//이미지 하나를 업로드하고, 이미지의 저장 경로를 클라이언트로 반환
	//req.file : 저장된 파일에 관한 정보
   res.json({ url: `/img/${req.file.filename}` });
 });
 
 //게시글 등록 처리 : POST /post
 const upload2 = multer();
 //POST /post/img에서 이미지는 이미 업로드 했으므로, 이번에는 실제 이미지를 전달하지는 않음
 router.post('/', isLoggedIn, upload2.none(), async (req, res, next) => {
   try {
	 console.log(req.user);
	 //게시글 저장
	 const post = await Post.create({
	   content: req.body.content,
	   img: req.body.url,
	   UserId: req.user.id,
	 });
	 //게시글에서 해시 태그 추출하여 게시글과 연결
	 const hashtags = req.body.content.match(/#[^\s#]*/g);
	 if (hashtags) {
	   const result = await Promise.all(
		 hashtags.map(tag => {
		   return Hashtag.findOrCreate({
			 //hashtags의 원소를 하나씩 tag로 맵핑, tag의 값을 활용하여 DB 쿼리로 날림
			 where: { title: tag.slice(1).toLowerCase() },
		   })
		 }),
	   );
	   //결괏값으로 [모델, 생성 여부] 반환
	   //r[0] 모델만 추출해서 게시글과 연결
	   await post.addHashtags(result.map(r => r[0]));
	 }
	 res.redirect('/');
   } catch (error) {
	 console.error(error);
	 next(error);
   }
 });
 
 module.exports = router;
 