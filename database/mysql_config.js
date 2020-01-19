const mysql = require('mysql2');
const MybatisMapper = require('mybatis-mapper');

let connection;

exports.init = async (config) => {
    console.log('mysql 접속을 시도합니다.');
    // Mybatis 쿼리 XML 파일 위치를 설정한다.
    MybatisMapper.createMapper(['./mapper/free_board_mapper.xml']);

    // myswl2 접속 pool을 만든다.
    const pool = mysql.createPool({
        // 기본 접속 정보
        host: config.host,
        user: config.username,
        password: config.password,
        database: config.database,
        // 최대 접속이 넘었을 경우 접속 객체가 풀릴때까지 기다릴지 여부 (false: 접속 객체가 없으경우 에러발생, true: queue에 저장되어 대기)
        waitForConnections: true,
        // mysql 접속객체 최대 갯수
        connectionLimit: 2,
        //위의 최대접속 넘었을 경우 기다리는 queue 갯수
        queueLimit: 0
    });
    // async await 방식으로 쓸수있게 promise 객체를 사용한다.
    connection = pool.promise();
    console.log('mysql 접속 완료.');
    return connection;
};

exports.getConnection = () => { return connection; };
