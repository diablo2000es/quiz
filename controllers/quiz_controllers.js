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

//DELETE /quizes/:id
exports.destroy = function (req, res){
    req.quiz.destroy().then(function(){
        res.redirect("/quizes");
    }).catch(function(error){next(error)});
};


// get /quizes/:id

exports.show = function(req,res){
    //console.log("render");
    //res.render("quizes/question", {pregunta: "Capital de Italia"});
    //models.Quiz.findAll().success(function(quiz){
    //   res.render("quizes/question", {pregunta: quiz[0].pregunta})
    //})
    //models.Quiz.find(req.params.quizId).then(function(quiz){
        //console.log(quiz);
        res.render("quizes/show", {quiz: req.quiz, errors: []});
    };






//fet /quizes/:id/aswer
exports.answer = function (req, res){
    var resultado = "Incorrecto";
    //models.Quiz.find(req.params.quizId).then(function(quiz){
        if (req.query.respuesta === req.quiz.respuesta){
            resultado = "Correcto";
        };
        res.render("quizes/answers.ejs",
                   {quiz: req.quiz, respuesta: resultado, errors: []});

    };
//quizes/new
exports.new = function(req,res){
    var quiz = models.Quiz.build( //Crea objeto quiz
        {pregunta: "Pregunta", respuesta: "Respuesta", tema: "Tematica"}
    );
    res.render("quizes/new", {quiz: quiz, errors: []});
}


exports.index = function(req,res) {
    if (req.query.search){
        var buscar = "%"+req.query.search+"%";
        var re = (/\s/g);

        buscar = buscar.replace(re, "%");
        
        models.Quiz.findAll({where: ["pregunta like ?", buscar]}).then(function(quizes){
        res.render("quizes/index.ejs", {quizes:quizes, errors: []});
    }).catch(function(error){next(error);})
                    
        console.log(buscar);
    }else{
    models.Quiz.findAll().then(function(quizes){
        res.render("quizes/index.ejs", {quizes:quizes, errors: []});
    }).catch(function(error){next(error);})
};
};
//post /quizes/create
exports.create = function(req, res) {
var quiz = models.Quiz.build( req.body.quiz );

var errors = quiz.validate();//ya qe el objeto errors no tiene then(
if (errors)
{
var i=0; var errores=new Array();//se convierte en [] con la propiedad message por compatibilida con layout
for (var prop in errors) errores[i++]={message: errors[prop]};
res.render('quizes/new', {quiz: quiz, errors: errores});
} else {
        //Guenada en la Bd los campos de pregunta y repuesta
    quiz.save({fields: ["pregunta", "respueta", "tema"]}).then(function(){
        res.redirect("/quizes");
    })// redureciona htto a la lista de preguntas

    }



}

//Get /quizes/:id/edit
exports.edit = function (req, res ){
    var quiz = req.quiz; //autoload de instancia de quiz
    res.render("quizes/edit", {quiz: quiz, errors: []});
};

////////////////////////////////////////7
//put /quizes/:id
exports.update = function (req, res){
    req.quiz.pregunta = req.body.quiz.pregunta;
    req.quiz.respuesta = req.body.quiz.respuesta;
    req.quiz.tema = req.body.quiz.tema;

    var errores = req.quiz.validate();
    console.log(errores);
    if (errores ){
            var i= 0;
            var lista_errores = new Array();
            for (propiedades in errores){
                lista_errores[i++]= {message: errores[propiedades]};
                //console.log("Popiedades for "+ propiedades);
            }
            //console.log("ERRores lista: "+ errores[0]+"\n"+"propiedades_: "+ lista_errores[0].message );
            res.render("quizes/edit", {quiz: req.quiz, errors: lista_errores});
        }
     else {

            console.log(req.quiz);
            req.quiz //guardar campos de pregunta y respuesta en BD
            .save( {fields: ["pregunta", "respuesta","tema"]})
            .then( function(){ res.redirect("/quizes");});
        } //Redireciona HTTP a la lista de preguntas
    };






exports.author = function (req, res){

        res.render("quizes/author", {errors: []});
        
   
};


