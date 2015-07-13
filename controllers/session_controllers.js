//MW de autorizacion de acceso HTTP restringidos

exports.loginRequired = function (req, res, next){
    if ( req.session.user) {
        next();

    } else {
        res.redirect("/login");
    }
};

// get/login __ forumulario login
exports.new = function(req, res){
    var errors = req.session.errors || {};
    req.session.errors = {};

    res.render("sessions/new", {errors: errors});
};

//post /login -- Crear la sesion
exports.create = function (req, res ){
    var login = req.body.login;
    var password = req.body.password;

    var userController = require("./user_controller");
    userController.autentificar(login, password, function(error, user){
         if (error) { //si hay error retornamos mensaje de error de sesion
        req.session.errors = [{"message": "Se ha producido un error: "+ error}];
        res.redirect("/login");
        return;
    }
    //CRear req.session.user y guardar los capos id y username
    // La sesion se define por la exixtencia de: req.session.user
    req.session.user = {id:user.id, unsername: user.username};
    res.redirect(req.session.redir.toString()); //redireciona la path anterior al login

    });

};
//Delete /logout -- destruir session
exports.destroy = function ( req, res ){
    delete req.session.user;
    res.redirect(req.session.redir.toString()); //redirtect a path anterior al login
};
