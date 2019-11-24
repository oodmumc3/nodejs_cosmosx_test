/**
 * 패스포트 설정 파일
 * 
 * 페이스북 인증 방식에 사용되는 패스포트 설정
 *
 * @date 2016-11-10
 * @author Mike
 */

var kakaoStrategy = require('passport-kakao').Strategy;
var config = require('../config');

module.exports = function(app, passport) {
	return new kakaoStrategy({
		clientID: config.kakao.clientID,
		//clientSecret: config.kakao.clientSecret,
		callbackURL: config.kakao.callbackURL,
		profileFields: ['id', 'emails', 'displayName']
	}, function(accessToken, refreshToken, profile, done) {
		console.dir(profile);
		
		var options = {
		    criteria: { 'kakao.id': profile.id }
		};
		console.log('★ passport의 kakao 호출됨 _var database.');
		var database = app.get('database');
		console.log('★ passport의 kakao 호출됨 _var database불러옴.');
	    database.UserModel.find(options, function (err, user) {
			console.log('★ passport의 kakao 호출됨 _var database내부.');
			if (err) return done(err);
      
			if (!user) {
				console.log('★ passport의 kakao 호출됨 _!user.');
				var user = new database.UserModel({
					name: profile.displayName,
					email: profile.emails[0].value,
					provider: 'kakao',
					authToken: accessToken,
					kakao: profile._json
				});
				console.log('★ passport의 kakao 호출됨 _user.save');
				user.save(function (err) {
					if (err) console.log(err);
					return done(err, user);
				});
			} else {
				return done(err, user);
			}
	    });
	});
};