var usuario = require('../model/usuario')


//middleware para buscar usuarios
function getUsuarios(req, res, next) {
    usuario.find({}).lean().exec(function (err, docs) {
        req.usuarios = docs
        next()
    })
}

function listar(req, res) {
    usuario.find({}).lean().exec(function (err, docs) {
        res.render('usuario/list.ejs', { "Usuarios": docs })
    })
}

function filtrar(req, res) {
    usuario.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('usuario/list.ejs', { "Usuarios": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("usuario/add.ejs")
}

function adiciona(req, res) {
    console.log(req.body)
    var novoUsuario = new usuario({
        nome: req.body.nome,
        endereco: req.body.endereco,
        telefone: req.body.telefone,
        cpf: req.body.cpf
    })
    novoUsuario.save(function (err) {
        if (err) {
            usuario.find({}).lean().exec(function (err, docs) {
                res.render('usuario/list.ejs', { msg: "Problema ao salvar!", Usuarios: docs })
            })
        } else {
            usuario.find({}).lean().exec(function (err, docs) {
                res.render('usuario/list.ejs', { msg: "Adicionado com sucesso!", Usuarios: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    usuario.findById(req.params.id, function (err, usuario) {
        res.render('usuario/edit.ejs', { 'usuario': usuario });
    })
}

function edita(req, res) {
    usuario.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            telefone: req.body.telefone,
            cpf: req.body.cpf
        }, function (err) {
            if (err) {
                usuario.find({}).lean().exec(function (err, docs) {
                    res.render('usuario/list.ejs', { msg: "Problema ao editar!", Usuarios: docs })
                })
            } else {
                usuario.find({}).lean().exec(function (err, docs) {
                    res.render('usuario/list.ejs', { msg: "Editado com sucesso!", Usuarios: docs })
                })
            }
        })
}

function deleta(req, res) {
    usuario.findByIdAndDelete(req.params.id, function () {
        usuario.find({}).lean().exec(function (err, docs) {
            res.render('usuario/list.ejs', { msg: "Removido com sucesso!", Usuarios: docs })
        })
    })

}

module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getUsuarios
}