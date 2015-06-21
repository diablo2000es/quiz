var models = require("../models/models.js");

// get /quizes/question

exports.question = function(req,res){
    //console.log("render");
    //res.render("quizes/question", {pregunta: "Capital de Italia"});
    models.Quiz.findAll().success(function(quiz){
       res.render("quizes/question", {pregunta: quiz[0].pregunta})
    })

}





exports.answer = function (req, res){
    models.Quiz.findAll().success(function(quiz){
        if (req.query.respuesta === quiz[0].respuesta){
        res.render("quizes/answers", {respuesta: "Correcto"});
        
    } else {
        res.render("quizes/answers", {respuesta: "Incorrecto"});
    }

    })

};

exports.author = function (req, res){

        res.render("quizes/author");
        
   
};
