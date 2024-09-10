'use strict'

var User = require('../models/usuario');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('../helpers/jwt');

const login_user = async function(req,res){
    var data = req.body;
    //creando arreglo de usuario
    var admin_arr = [];
    //buscando email con la bd
    admin_arr = await User.find({email:data.email});
    if (admin_arr == 0) {
        // no hay correo en bd
        res.status(200).send({message: 'No se encontro el correo', data:undefined});
        
    }
    else{
        //si hay email que coincide = login
        let user = admin_arr[0];
        //desenceriptando password
        bcrypt.compare(data.password, user.password, async function(error, check) {
            if (check) {
                // Si la contraseña coincide, se verifica el rol del usuario
                let role = user.rol;
                // Dependiendo del rol, se realiza una acción diferente
                if (role === 'Administrador') {
                // Si es un administrador, envía el token con privilegios de admin
                res.status(200).send({
                    data: user,
                    message: 'Bienvenido, Administrador',
                    role: 'Administrador',
                    //genera token
                    token: jwt.createToken(user)
                });}
                else if (role === 'Vendedor') {
                    // Si es un vendedor, envía el token con privilegios de vendedor
                    res.status(200).send({
                        data: user,
                        message: 'Bienvenido, Vendedor',
                        role: 'Vendedor',
                        token: jwt.createToken(user)
                    });
                } else if (role === 'Tecnico') {
                    // Si es un técnico, envía el token con privilegios de técnico
                    res.status(200).send({
                        data: user,
                        message: 'Bienvenido, Técnico',
                        role: 'Tecnico',
                        token: jwt.createToken(user)
                    });
                } else {
                    // Si el rol no está definido
                    res.status(200).send({
                        message: 'El rol del usuario no es válido',
                       // data: undefined
                    });
                }
                
            }else{
                res.status(200).send({message: 'La contraseña no coincide', data:undefined});}
            
        });
    }
    
}

const registro_usuario = async function(req,res){
    //variable para que reciba toda la data que esta en el cuerpo del request
    var data = req.body;
    var user_arr = [];
    //buscando email, dni y telefono
    user_arr = await User.find({email:data.email}, {dni:data.dni}, {telefono:data.telefono});
    //si el # de resultado es cero
    if (user_arr.length == 0) {
        //y si hay contraseña       
        if (data.password) {
            //entonces crea
            bcrypt.hash(data.password, null, null, async function(err, hash) {
                if (hash) {
                    data.password = hash;
                    //registrando
                    var reg = await User.create(data);
                    res.status(200).send({data:reg});
                }else{
                    res.status(200).send({message:'ErrorServer',data: undefined});
                }
            })
        }else{
            res.status(200).send({message:'No hay una constraseña',data: undefined});
        }
    }else{
        res.status(200).send({message:'El usuario ya existe en la base de datos', data: undefined});
    }

}

module.exports = {
    login_user,
    registro_usuario
}