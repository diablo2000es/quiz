var express = require('express');
var router = express.Router();

var quizController = require("../controllers/quiz_controllers");
var commentController = require('../controllers/comment_controllers');
var sessionController = require("../controllers/session_controllers");
/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz' , errors: []});
});
//Autoload de comandos con :quizId
router.param("quizId", quizController.load); //autoload :quizId
//Definicion de rutas de sesion
router.get("/login", sessionController.new); //formulario login
router.post("/login", sessionController.create); //crear session
router.get("/logout", sessionController.destroy); //destruir sesion

router.get("/quizes", quizController.index);
router.get("/quizes/:quizId(\\d+)", quizController.show);
router.get("/quizes/:quizId(\\d+)/answer", quizController.answer);
router.get("/quizes/new", quizController.new);
router.post("/quizes/create", quizController.create);
router.get("/quizes/:quizId(\\d+)/edit", quizController.edit);
router.put("/quizes/:quizId(\\d+)", quizController.update);
router.delete("/quizes/:quizId(\\d+)", quizController.destroy);
router.get("/author", quizController.author);

router.get("/quizes/:quizId(\\d+)/comments/new", commentController.new);

router.post("/quizes/:quizId(\\d+)/comments", commentController.create);


module.exports = router;
