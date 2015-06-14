// get /quizes/question

exports.question = function(req,res){
    //console.log("render");
    res.render("quizes/question", {pregunta: "Capital de Italia"});
}





exports.answer = function (req, res){
    if (req.query.respuesta === "Roma"){
        res.render("quizes/answers", {respuesta: "Correcto"});
        
    } else {
        res.render("quizes/answers", {respuesta: "Incorrecto"});
    }
};

exports.author = function (req, res){

        res.render("quizes/author");
        
   
};