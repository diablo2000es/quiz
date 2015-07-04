//Definicion del modelo de quiz

module.exports = function(sequelize, DataTypes) {
    return sequelize.define("Quiz",
                            {
                            pregunta:{type: DataTypes.STRING,
                                     validate: {notEmpty: {mgs: "FAlta Pregunta"}}},
                            respuesta: {type: DataTypes.STRING,
                                       validate: {notEmpty: {mgs: "Falta respuesta"}}}
                            }
                           );
}
