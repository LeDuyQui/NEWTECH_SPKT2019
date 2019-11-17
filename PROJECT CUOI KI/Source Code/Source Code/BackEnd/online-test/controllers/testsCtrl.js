const express = require('express');
const { Test } = require('../models/db')
const { ErrorResult, Result } = require('../utils/base_response')
const router = express.Router();
router.use((req, res, next) => {
    // authorize here
    next();
});

router.get('/', (req, res) => {
    Test.findAll().then(type => {
        res.json(Result(type))
    });
});

router.get('/:id', (req, res) => { //d+ là những con số, bắt buộc
    Test.findByPk(req.params.id).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
});

router.post('/', (req, res) => { //create 
    //validate data here
    Test.create(req.body).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(400).send(ErrorResult(400, err.errors));
    });
});

router.put('/:id', (req, res) => { //updating
    //validate data here
    Test.findByPk(req.params.id).then(type => {
        if (type != null) {
            type.update({
                startdate: req.body.startdate,
                enddate: req.body.enddate,
                time: req.body.time,
                code: req.body.code,
                starttime: req.body.starttime,
                subjectidid: req.body.subjectidid,
                status: req.body.status

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

router.delete('/:id', (req, res) => {
    Test.destroy({
        where: {
            id: req.params.id
        }
    }).then(type => {
        res.json(Result(type));
    }).catch(err => {
        return res.status(500).send(ErrorResult(500, err.errors));
    });
});

router.get('/getBySubjectAndStatus/:id/:status', (req, res) => {
    Test.findAll({
        where: {
            subjectid: req.params.id,
            status: req.params.status
        }
    }).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
}); 

router.get('/getTestsByStatus/:status', (req, res) => {
    Test.findAll({
        where: {
            status: req.params.status
        }
    }).then(type => {
        if (type != null) {
            res.json(Result(type));
        } else {
            res.status(404).json(ErrorResult(404, 'Not Found !!!'));
        }
    });
});
module.exports = router;