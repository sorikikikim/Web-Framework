/**
 * passport/index.js
 */

const passport = require("passport");
const local = require("./localStrategy");
const kakao = require("./kakaoStrategy");
const User = require("../models/user");

module.exports = () => {
    //login 시 실행
    //req.session 객체에 어떤 데이터를 저장할지 정하는 메소드
    passport.serializeUser((user, done) => {
        done(null, user.id); //세션의 용량, 데이터 일관성 문제로 -> 사용자 정보(id만) 저장
    });

    //매 요청 시 실행
    //위의 done의 user.id가 deserializeUser의 매개 변수
    //serializeUser에서 세션에 저장한 아이디를 받아 -> 데이터베이스에서 사용자 정보 조회
    //-> 조회한 정보 req.user에 저장 -> req.user 통해 로그인한 사용자 정보 조회 가능
    passport.deserializeUser((id, done) => {
        User.findOne({
            where: { id },
			//팔로잉 기능 구현으로 req.user 조회 시 팔로워, 팔로잉 목록도 같이 불러옴
            include: [
                {
                    model: User,
                    attributes: ["id", "nick"],
                    as: "Followers",
                },
                {
                    model: User,
                    attributes: ["id", "nick"],
                    as: "Followings",
                },
            ],
        })
            .then((user) => done(null, user))
            .catch((err) => done(err));
    });

    local();
    kakao();
};
