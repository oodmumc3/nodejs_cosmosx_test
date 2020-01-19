const MybatisMapper = require('mybatis-mapper');

let connection;
const MAPPER_NAMESPACE = 'free_board';

exports.init = async (c) => {
    connection = c;
};

exports.save = async (title, contents) => {
    const query = await MybatisMapper.getStatement(
        MAPPER_NAMESPACE, 'save', {title, contents}
    );

    const result = await connection.query(query);
    if (result && result[0]) {
        return result[0].insertId;
    }

    return null;
};

exports.countWithSearch = async (searchColumn, searchTerm) => {
    const query = await MybatisMapper.getStatement(
        MAPPER_NAMESPACE, 'countWithSearch', {searchColumn, searchTerm}
    );
    const [countRows] = await connection.query(query);
    return countRows[0].count || 0;
};

exports.findAllWithPagingAndSearch = async (offset, limit, searchColumn, searchTerm) => {
    const query = await MybatisMapper.getStatement(
        MAPPER_NAMESPACE,
        'findAllWithPagingAndSearch',
        {searchColumn, searchTerm, offset, limit}
    );

    const [rows] = await connection.query(query);
    return rows.map(row => {
        return {
            id: row.id,
            title: row.title,
            contents: row.contents,
            username: row.username,
            createdAt: new Date(row.createdAt).toLocaleString(),
            updatedAt: new Date(row.updatedAt).toLocaleString()
        };
    });
};

exports.findOneById = async (id) => {
    const query = await MybatisMapper.getStatement(
        MAPPER_NAMESPACE,
        'findOneById',
        {id}
    );

    const [rows] = await connection.query(query);
    if (!rows || !rows[0]) { return null; }

    const row = rows[0];
    return {
        id: row.id,
        title: row.title,
        contents: row.contents,
        username: row.username,
        createdAt: new Date(row.createdAt).toLocaleString(),
        updatedAt: new Date(row.updatedAt).toLocaleString()
    };
};

exports.updateById = async (id, title, contents) => {
    const query = await MybatisMapper.getStatement(
        MAPPER_NAMESPACE,
        'updateById',
        {id, title, contents}
    );

    await connection.query(query);
};

exports.deleteOneById = async (id) => {
    const query = await MybatisMapper.getStatement(
        MAPPER_NAMESPACE,
        'deleteById',
        {id}
    );

    await connection.query(query);
};

