var users = {admin: {id:1, username:"admin", password:"1234"},
             pepe: {id:2, username:"pepe", password:"5678"}
    };
//comprueba si el susario esta regitraod en user
//so la autetificaion fala o hay errores se ejecuta el callback (eror)-

exports.autentificar = function(login, password, callback){
    if (users[login]){
        if (password === users[login].password){
            callback(null, users[login]);
        }
        else {callback(new Error("Pasword erroneo"));}
    } else {callback (new Error("No existe el usuario"));}
};
