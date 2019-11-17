const express = require('express');
const { User, UserType } = require('../models/db')
const { ErrorResult, Result, PagingResult, ObjResult } = require('../utils/base_response')
const crypt = require('../utils/helper')
const router = express.Router();
const jwt = require('jsonwebtoken');
const sequelize = require('sequelize');
const Op = sequelize.Op;
router.use((req, res, next) => {
    // authorize here
    next();
});

router.get('/', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);
    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    const offset = (page) * pageSize;
    // const limit = parseInt(offset) + parseInt(pageSize);
    const limit = pageSize;

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';
    //let sortColumn = "username";
    //let sortDirection = "ASC";
    if (req.query.so) {
        const sortStr = decodeURIComponent(req.query.so).split(' ');
        sortColumn = sortStr[0];
        if (sortStr.length == 2) sortDirection = sortStr[1];
    }

    if (queryString.length <= 2) {
        User.count().then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            User.findAll({
                //order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [{
                    model: UserType,
                    as: 'usertype'
                }]
            }).then(users => {
                return res.json(PagingResult(users, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            })
        })
    } else {
        //condition
        const whereClause = {
            [Op.or]: [
                { username: { [Op.like]: queryString } },
                { fullName: { [Op.like]: queryString } },
                { identitycard: { [Op.like]: queryString } },
                { birthday: { [Op.like]: queryString } },
                { sex: { [Op.like]: queryString } },
                { address: { [Op.like]: queryString } },
                { usertypeid: { [Op.like]: queryString } }
            ]
        }
        User.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            User.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [{
                    model: UserType,
                    as: 'usertype'
                }]
            }).then(users => {
                return res.json(PagingResult(users, {
                    pageNumber: page,
                    pageSize: pageSize,
                    totalRows: totalRows,
                    totalPages: totalPages
                }))
            })
        })
    }
});

// get By usertype
router.get('/getByUserType/:id(\\d+)', (req, res) => {
    let page = 0;
    if (req.query.p) page = parseInt(req.query.p);

    let pageSize = 20;
    if (req.query.s) pageSize = parseInt(req.query.s);

    let queryString = '';
    if (req.query.q) queryString = '%' + decodeURIComponent(req.query.q) + '%';

    //let sortColumn = 'userid';
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
            usertypeid: req.params.id
        }

        User.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            User.findAll({
                where: whereClause,
                //order: [[sortColumn, sortDirection]],
                offset: offset,
                limit: limit,
                include: [{ model: UserType, as: 'usertype' }]
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
            usertypeid: req.params.id,
            [Op.or]: [
                { username: { [Op.like]: queryString } },
                { fullName: { [Op.like]: queryString } },
                { identitycard: { [Op.like]: queryString } },
                { address: { [Op.like]: queryString } },
            ]
        }

        User.count({ where: whereClause }).then(numRow => {
            const totalRows = numRow;
            const totalPages = Math.ceil(totalRows / pageSize);
            User.findAll({
                where: whereClause,
                offset: offset,
                limit: limit,
                include: [{ model: UserType, as: 'usertype' }]
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
router.get('/:id', (req, res) => { //d+ là những con số, bắt buộc
    User.findOne({where: {id: req.params.id}}).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
});

router.post('/', (req, res) => { //create 
    //validate data here
    req.body.password = crypt.hash(req.body.password)
    User.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id', (req, res) => { //updating
    //validate data here
    User.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                fullName: req.body.fullName,
                identitycard: req.body.identitycard,
                birthday: req.body.birthday,
                sex: req.body.sex,
                address: req.body.address,
                usertypeid: req.body.usertypeid,
                username: req.body.username,
                password: crypt.hash(req.body.password)
                

            }).then(type => {
                res.json(Result(type));
            }).catch(err => {
                return res.status(400).send(ErrorResult(400, err.errors));
            });
        } else {
            return res.status(404).send(ErrorResult(404, err.errors));
        }
    });
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

    router.post('/login', (req, res) => {
        User.findAll({
            where: {
                username: req.body.username,
                password: crypt.hash(req.body.password)
            }
        }).then(users => {
            if (users[0] != null) {
                const token = jwt.sign({ userId: users[0].userid, username: users[0].username }, crypt.appKey, { expiresIn: '1h' });
                return res.json(Result({
                    id: users[0].id,
                    username: users[0].username,
                    fullName: users[0].fullName,
                    token: token,
                    usertype: users[0].usertypeid,
                }));
            } else {
                res.status(401).send('Invalid username or password');
            }
        });
    })
module.exports = router;