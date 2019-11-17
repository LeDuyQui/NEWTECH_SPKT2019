const express = require('express');
var bodyParser = require('body-parser')
var app = express();

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/img', express.static(__dirname + '/img'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//import and use modules
const studentCtrl = require('./controllers/studentsCtrl')
app.use('/students', studentCtrl);

const usertypesCtrl = require('./controllers/usertypesCtrl');
app.use('/user-types', usertypesCtrl);

const usersCtrl = require('./controllers/usersCtrl');
app.use('/users', usersCtrl);

const classesCtrl = require('./controllers/classesCtrl');
app.use('/classes', classesCtrl);

const semestersCtrl = require('./controllers/semestersCtrl');
app.use('/semesters', semestersCtrl);

const examsCtrl = require('./controllers/examsCtrl');
app.use('/exams', examsCtrl);

const answersheetsCtrl = require('./controllers/answersheetsCtrl');
app.use('/answersheets', answersheetsCtrl);

const testsCtrl = require('./controllers/testsCtrl');
app.use('/tests', testsCtrl);

const questionTypesCtrl = require('./controllers/questionTypesCtrl');
app.use('/question-types', questionTypesCtrl);

const questionsCtrl = require('./controllers/questionsCtrl');
app.use('/questions', questionsCtrl);

const testDetailsCtrl = require('./controllers/testDetailsCtrl');
app.use('/test-details', testDetailsCtrl);

const optionsCtrl = require('./controllers/optionsCtrl');
app.use('/options', optionsCtrl);

/*const partCtrl = require('./controllers/partsCtrl');
app.use('/parts', partCtrl);*/

const subjectCtrl = require('./controllers/subjectsCtrl');
app.use('/subjects', subjectCtrl);


//create a server with port: 8081
var sever = app.listen(8081, () => { //server chay tren port 8081
    const host = sever.address().address;
    const port = sever.address().port;
    console.log('Server running at http://%s:%s', host, port);

});