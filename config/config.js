
/*
 * 설정
 */

module.exports = {
	server_port: 3000,
    mysql_local: {
	    host: 'localhost',
        username: 'cpr',
        password: 'cpr',
        database: 'cpr'
    },
    mysql: {
        host: 'remotemysql.com',
        username: 'h6oQgd0fT7',
        password: 'ZRPI07AqqK',
        database: 'h6oQgd0fT7'
    },
	db_url: 'mongodb+srv://admin:1111@costest-pqydf.mongodb.net/db_costest?retryWrites=true&w=majority',
	//db_url: 'mongodb://localhost:27017/local',
	db_schemas: [
		{file:'./user_schema', collection:'users6', schemaName:'UserSchema', modelName:'UserModel'}
		,{file:'./post_schema', collection:'post', schemaName:'PostSchema', modelName:'PostModel'}
		//,{file:'./user_schema_kakao', collection:'users_kakao', schemaName:'UserSchema_kakao', modelName:'UserModel_kakao'}
	],
	route_info: [
		{file:'./post', path:'/process/addpost', method:'addpost', type:'post'}
        ,{file:'./post', path:'/process/showpost/:id', method:'showpost', type:'get'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'post'}
        ,{file:'./post', path:'/process/listpost', method:'listpost', type:'get'}
        ,{file:'./free_board', path:'/free_board/index', method:'index', type:'get'}
        ,{file:'./free_board', path:'/free_board/write', method:'write', type:'get'}
        ,{file:'./free_board', path:'/free_board/write', method:'save', type:'post'}
        ,{file:'./free_board', path:'/free_board/view/:id', method:'view', type:'get'}
        ,{file:'./free_board', path:'/free_board/update/:id', method:'updateForm', type:'get'}
        ,{file:'./free_board', path:'/free_board/update', method:'update', type:'post'}
        ,{file:'./free_board', path:'/free_board/delete/:id', method:'delete', type:'get'}
	],
	facebook: {		// passport facebook
		clientID: '1102063383323186',
		clientSecret: '869d906ca1c93e636273d99c8ab727fa',
		callbackURL: 'https://cosmosx.net/auth/facebook/callback'
	},
	twitter: {		// passport twitter
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/twitter/callback'
	},
	google: {		// passport google
		clientID: 'id',
		clientSecret: 'secret',
		callbackURL: '/auth/google/callback'
	},

	kakao: {		// passport kakaotalk
		clientID: 'dfe7e58f167ff549469dbd1eaf8cafd7',
		//clientSecret: 'n1Dwrot5ifHXs1evpdGlnHzEEe7bP0U1',
		callbackURL: 'http://localhost:52222/auth/kakao/callback'
	}
}
