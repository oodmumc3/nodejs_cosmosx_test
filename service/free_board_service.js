const FreeBoardDao = require('../dao/free_board_dao');

exports.save = async (title, contents) => {
    await FreeBoardDao.save(title, contents);
};

exports.findFreeBoardListWithPaging = async (page, perPage, searchType, searchTerm) => {
    // DB 검색 시작위치를 계산한다.
    const offset = page > 1 ? perPage * (page - 1) : 0;

    const totalCnt = await FreeBoardDao.countWithSearch(searchType, searchTerm);
    const boards = await FreeBoardDao.findAllWithPagingAndSearch(offset, perPage, searchType, searchTerm);

    let startBoardNum = totalCnt - (page - 1) * perPage;
    for (const board of boards) { board.num = startBoardNum--; }

    return {
        boards,
        totalCnt,
        totalPage: Math.ceil(totalCnt / perPage)
    };
};

exports.findNewestTop5 = async () => {
    const {boards} = await exports.findFreeBoardListWithPaging(1, 5, null, null);
    return boards;
};

exports.updateById = FreeBoardDao.updateById;
exports.findOneById = FreeBoardDao.findOneById;
exports.deleteOneById = FreeBoardDao.deleteOneById;
