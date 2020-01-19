const FreeBoardService = require('../service/free_board_service');

exports.index = async (req, res) => {
    // 한페이지당 보여줄 게시물 갯수
    const perPage = req.query.perPage || 2;
    // 페이지 정보
    const page = req.query.page || 1;
    // 검색 조건 및 검색 단어
    let { searchType, searchTerm } = req.query;
    if (!searchTerm) {
        searchTerm = searchType = null;
    } else if (searchTerm && !['title', 'contents'].includes(searchType)) {
        // 검색 조건이 title, contents중 하나라도 일치하지 않으면 기본으로 title로 지정한다.
        searchType = 'title';
    }

    const { boards, totalCnt, totalPage } =
        await FreeBoardService.findFreeBoardListWithPaging(page, perPage, searchType, searchTerm);
    res.render('free_board/index.ejs', {
        boards,
        totalCnt,
        totalPage,
        searchTerm,
        searchType,
        currentPage: page
    });
};

exports.write = (req, res) => {
    res.render('free_board/write.ejs', { board: {} });
};

exports.save = async (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    try {
        await FreeBoardService.save(title, contents);
    } catch (e) {
        console.error(e);
    }
    res.redirect('/free_board/index');
};

exports.view = async (req, res) => {
    const boardId = req.params.id;
    if (!boardId) { return res.redirect('/free_board/index'); }

    const board = await FreeBoardService.findOneById(boardId);
    res.render('free_board/view.ejs', { board });
};

exports.updateForm = async (req, res) => {
    const boardId = req.params.id;

    const board = await FreeBoardService.findOneById(boardId);
    if (!board) { return res.redirect('/free_board/index'); }

    res.render('free_board/write.ejs', { board });
};

exports.update = async (req, res) => {
    const {id, title, contents} = req.body;

    // 수정할 게시판 정보가 있는지 확인하고 없으면 게시판 목록으로 이동시킨다.
    const board = await FreeBoardService.findOneById(id);
    if (!board) { return res.redirect('/free_board/index'); }

    try {
        await FreeBoardService.updateById(id, title, contents);
    } catch (e) {
        console.error(`free board update error :; ${e}`);
        return res.redirect('/free_board/index');
    }

    res.redirect(`/free_board/view/${id}`);
};

exports.delete = async (req, res) => {
    const boardId = req.params.id;

    const board = await FreeBoardService.findOneById(boardId);
    if (!board) { return res.redirect('/free_board/index'); }

    await FreeBoardService.deleteOneById(boardId);
    res.redirect('/free_board/index');
};
