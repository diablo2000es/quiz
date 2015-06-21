var models = require("../models/models.js");

// get /quizes/:id

exports.show = function(req,res){
    //console.log("render");
    //res.render("quizes/question", {pregunta: "Capital de Italia"});
    //models.Quiz.findAll().success(function(quiz){
    //   res.render("quizes/question", {pregunta: quiz[0].pregunta})
    //})
    models.Quiz.find(req.params.quizId).then(function(quiz){
        console.log(quiz);
        res.render("quizes/show", {quiz:quiz});
    })

};




//fet /quizes/:id/aswer
exports.answer = function (req, res){
    models.Quiz.find(req.params.quizId).then(function(quiz){
        if (req.query.respuesta === quiz.respuesta){
        res.render("quizes/answers",
                   {quiz:quiz, respuesta: "Correcto"});
        
    } else {
        res.render("quizes/answers",
                   {quiz:quiz, respuesta: "Incorrecto"});
    }

    })

};

exports.index = function(req,res) {
    models.Quiz.findAll().then(function(quizes){
        res.render("quizes/index.ejs", {quizes:quizes});
    })
};

exports.author = function (req, res){

        res.render("quizes/author");
        
   
};
