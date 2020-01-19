const FreeBoardService = require('../service/free_board_service');

exports.index = async (req, res) => {
    const freeBoards = await FreeBoardService.findNewestTop5();
    res.render('index.ejs', {freeBoards});
};
