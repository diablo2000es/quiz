var models = require("../models/models.js");

//Autoload - factoriza el codigo su la ruta incluye :quizId
exports.load = function(req, res, next, quizId){
    models.Quiz.find(quizId).then(
        function(quiz){
            if (quiz){
                req.quiz = quiz;
                next();
            } else {next(new Error("No existe quizId="+quizId));}
        }
    ).catch(function(error){next(error);});
}




// get /quizes/:id

exports.show = function(req,res){
    //console.log("render");
    //res.render("quizes/question", {pregunta: "Capital de Italia"});
    //models.Quiz.findAll().success(function(quiz){
    //   res.render("quizes/question", {pregunta: quiz[0].pregunta})
    //})
    //models.Quiz.find(req.params.quizId).then(function(quiz){
        //console.log(quiz);
        res.render("quizes/show", {quiz: req.quiz});
    };






//fet /quizes/:id/aswer
exports.answer = function (req, res){
    var resultado = "Incorrecto";
    //models.Quiz.find(req.params.quizId).then(function(quiz){
        if (req.query.respuesta === req.quiz.respuesta){
            resultado = "Correcto";
        };
        res.render("quizes/answers.ejs",
                   {quiz: req.quiz, respuesta: resultado});

    };



exports.index = function(req,res) {
    if (req.query.search){
        var buscar = "%"+req.query.search+"%";
        var re = (/\s/g);

        buscar = buscar.replace(re, "%");
        
        models.Quiz.findAll({where: ["pregunta like ?", buscar]}).then(function(quizes){
        res.render("quizes/index.ejs", {quizes:quizes});
    }).catch(function(error){next(error);})
                    
        console.log(buscar);
    }else{
    models.Quiz.findAll().then(function(quizes){
        res.render("quizes/index.ejs", {quizes:quizes});
    }).catch(function(error){next(error);})
};
};
exports.author = function (req, res){

        res.render("quizes/author");
        
   
};


