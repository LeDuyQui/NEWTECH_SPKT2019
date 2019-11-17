const Sequelize = require('sequelize');
const StudentModel = require('./students');
const UserTypeModel = require('./usertypes');
const UserModel = require('./users');
const ClassModel = require('./classes');
const SemesterModel = require('./semesters');
const ExamModel = require('./exams');
const AnswerSheetModel = require('./answersheets');
const TestModel = require('./tests');
const QuestionTypeModel = require('./questiontypes');
const QuestionModel = require('./questions');
const TestDetailModel = require('./testdetails');
const OptionModel = require('./options');
//const PartModel = require('./parts');
const SubjectModel = require('./subjects');

const sequelize = new Sequelize('OnlineTestDB', 'quang', '35025221', { // sử dụng cho bản exp, bản full không cần
    dialect: 'mssql',
    host: 'localhost',
    dialectOptions: {
        "options": {
            "instanceName": "SQLEXPRESS",
        }
    },
    pool: { max: 20, min: 0, acquire: 30000, idle: 10000 },
    logging: true
});


const Student = StudentModel(sequelize, Sequelize);
const UserType = UserTypeModel(sequelize, Sequelize);
const User = UserModel(sequelize, Sequelize);
const Class = ClassModel(sequelize, Sequelize);
const Semester = SemesterModel(sequelize, Sequelize);
const Exam = ExamModel(sequelize, Sequelize);
const AnswerSheet = AnswerSheetModel(sequelize, Sequelize);
const Test = TestModel(sequelize, Sequelize);
const QuestionType = QuestionTypeModel(sequelize, Sequelize);
const Question = QuestionModel(sequelize, Sequelize);
const TestDetail = TestDetailModel(sequelize, Sequelize);
const Option =OptionModel(sequelize, Sequelize);
//const Part = PartModel(sequelize, Sequelize);
const Subject = SubjectModel(sequelize, Sequelize);

Subject.belongsTo(Subject, {foreignKey: 'parentSub', as: 'parentsub'});

User.belongsTo(UserType, {foreignKey: 'usertypeid', as: 'usertype'});
UserType.hasMany(User, {foreignKey : 'usertypeid', as: 'users'});

Class.belongsTo(User, {foreignKey:'userid', as:'user'});
User.hasMany(Class,{foreignKey:'userid', as :'classes'});

Subject.belongsTo(Class, {foreignKey:'classid', as:'class'});
Class.hasMany(Subject,{foreignKey:'classid', as :'subjects'});


Semester.belongsTo(Student, {foreignKey: 'studentid', as: 'studentSemester'});
Student.hasMany(Semester, {foreignKey: 'studentid', as: 'semesterStudent'});

Semester.belongsTo(Class, {foreignKey: 'classid', as: 'classSemester'});
Class.hasMany(Semester, {foreignKey: 'classid', as: 'semesterClass'});

Exam.belongsTo(Student, {foreignKey: 'studentid', as: 'student'});
Student.hasMany(Exam, {foreignKey: 'studentid', as: 'exams'});

AnswerSheet.belongsTo(Exam, {foreignKey: 'examid', as: 'exam'});
Exam.hasMany(AnswerSheet, {foreignKey: 'examid', as: 'answersheets'});

Test.belongsTo(Subject, {foreignKey: 'subjectid', as: 'subject'});
Subject.hasMany(Test, {foreignKey: 'subjectid', as: 'tests'});

Exam.belongsTo(Test, {foreignKey: 'testid', as: 'test'});
Test.hasMany(Exam, {foreignKey: 'testid', as: 'exams'});

Question.belongsTo(QuestionType, {foreignKey:'questiontypeid', as: 'questiontype'});
QuestionType.hasMany(Question, {foreignKey:'questiontypeid', as: 'questionsQuestiontype'});

TestDetail.belongsTo(Question, {foreignKey:'questionid', as: 'question'});
Question.hasMany(TestDetail, {foreignKey:'questionid', as: 'testdetails'});

TestDetail.belongsTo(Test, {foreignKey:'testid', as: 'test'});
Test.hasMany(TestDetail, {foreignKey:'testid', as: 'testdetailsTest'});


Option.belongsTo(Question, {foreignKey: 'questionid', as: 'questionOption'});
Question.hasMany(Option, {foreignKey: 'questionid', as: 'options'});

Question.belongsTo(Subject, {foreignKey: 'subjectid', as: 'subjectQuestion'});
Subject.hasMany(Question, {foreignKey: 'subjectid', as: 'questions'});

/*sequelize.sync({ force: true }).then(() => { //run once
    console.log('Database created !!!!!')
});*/


module.exports = {
    Student,
    UserType,
    User,
    Class,
    Semester,
    Exam,
    AnswerSheet,
    Test,
    QuestionType,
    Question,
    TestDetail,
    Option,
    Subject
}