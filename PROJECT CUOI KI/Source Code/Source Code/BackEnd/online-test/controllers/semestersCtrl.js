const express = require('express');
const { Semester,Student,Class } = require('../models/db')
const { ErrorResult, Result, PagingResult, ObjResult } = require('../utils/base_response')
const router = express.Router();
router.use((req, res, next) => {
    // authorize here
    next();
});

router.get('/', (req, res) => {
    Semester.findAll({
        include: [{
            model: Student,
            as: "studentSemester" 
        }]
    }).then(type => {
        res.json(Result(type))
    });
});

router.get('/:id', (req, res) => { //d+ là những con số, bắt buộc
    Semester.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
});

router.post('/', (req, res) => {
    //validate data here
    Semester.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:studentid', (req, res) => { //updating
    //validate data here
    Semester.findByPk(req.params.studentid).then(type => {
        if (type != null) {
            type.update({
                classid: req.body.classid

            }).then(type => {
                res.json(Result(type));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            res.status(404).send(ErrorResult(404, 'Not Found!!'));
        }
    });
});

router.delete('/:studentid', (req, res) => {
    Semester.destroy({
        where: {
            id: req.params.stundentid
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});
router.get('/getPupilsByClass/:id(\\d+)', (req, res) => {
    Semester.findAll({
        where: {
            classid: req.params.id
        },
        include: [{
            model: Student,
            as: "studentSemester" 
        }]
    }).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
});
router.get('/getClassByStudent/:id(\\d+)', (req, res) => {
    Semester.findAll({
        where: {
            studentid: req.params.id
        },
        include: [{
            model: Class,
            as: "classSemester" 
        }]
    }).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
});
router.get('/getPupilsByClass2/:id(\\d+)', (req, res) => {

    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    //let sortColumn = 'id';
    //let sortDirection = 'ASC';
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }

    const offset = page * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    if (queryString.length <= 2) {
        // conditions
        const whereClause = {
            classid: req.params.id
        }

        Semester.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Semester.findAll({
                where: whereClause,
                //order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [{ model: Student, as: 'studentSemester' }]
            }).then(users => {
                return res.json(PagingResult(users, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    } else { // search
        // conditions
        const whereClause = {
            classid: req.params.id,
            [Op.or]: [
                { semestername: { [Op.like]: queryString } },
                { classid: { [Op.like]: queryString } },
                { studentid: { [Op.like]: queryString } }
            ]
        }

        Semester.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            Semester.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [{ model: Student, as: 'studentSemester' }]
            }).then(users => {
                return res.json(PagingResult(users, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages,
                }));
            });
        });
    }
});


module.exports = router;