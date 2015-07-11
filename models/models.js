var path = require("path");

//cargar modelo ODR
var Sequelize = require("sequelize");

//usar las base de datos
var sequelize = new Sequelize(null,null,null,
                             {dialect: "sqlite", storage: "quiz.sqlite"}
                             );
//importar la definicon de la table Quiz en quiz.j
console.log("sequelize")
var Quiz = sequelize.import(path.join(__dirname, "quiz"));
exports.Quiz =Quiz; //Exporta la definion de talba Quiz
//sequelize.sync() crea e inicoa la tabla de eguntas en la base de datos
sequelize.sync().then(function(){
    //success ejecuta el manejado cuando se crea la tabla
    Quiz.count().success(function(count){
        if(count===0){
        Quiz.create({
            pregunta: "Capital de Italia",
            respuesta: "Roma",
            tema: 'tecnologia'
        });
        Quiz.create({
            pregunta: "Capital de Portugal",
            respuesta: "Lisboa",
            tema: 'tecnologia'
        })
        .then(function(){console.log("Base de datos inicializada")});
    };
    });
});













