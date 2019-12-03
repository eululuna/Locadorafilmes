var emprestimo = require('../model/emprestimo')
var usuario = require('../model/usuario')
var filme = require('../model/filme')

//middleware para buscar emprestimos
function getEmprestimos(req, res, next) {
    emprestimo.find({}).lean().exec(function (err, docs) {
        req.emprestimos = docs
        next()
    })
}

function listar(req, res) {
    emprestimo.find({}).populate('filme')
    .populate('usuario')
    .lean()
    .exec(function (err, docs) {
        res.render('emprestimo/list.ejs', { "Emprestimos": docs })
    })
}

function filtrar(req, res) {
    emprestimo.find({ nomef: new RegExp(req.body.pesquisa, 'i') })
    .populate('filme')
    .populate('usuario')
    .lean()
    .exec(function (err, docs) {
            res.render('emprestimo/list.ejs', { "Emprestimos": docs })
        })
}

function abrirAdiciona(req, res) {
    usuario.find({}).lean().exec(
        function (e, usuarios) {
                    filme.find({}).lean().exec(
                        function (e, filmes) {
                            console.log(filmes)
                            res.render("emprestimo/add.ejs", { "Filmes": filmes, "Usuarios": usuarios })
                        })
                })
        }

function adiciona(req, res) {

    var novoEmprestimo = new emprestimo({
        datae: req.body.datae,
        dataentrega: req.body.dataentrega,
        filme: req.body.filme,
        usuario: req.body.usuario
    })
    novoEmprestimo.save(function (err) {
        if (err) {
            emprestimo.find({}).populate('filme').populate('usuario').lean().exec(function (err, docs) {
                res.render('emprestimo/list.ejs', { msg: "Problema ao salvar!", Emprestimos: docs })
            })
        } else {
            emprestimo.find({}).populate('filme').populate('usuario').lean().exec(function (err, docs) {
                res.render('emprestimo/list.ejs', { msg: "Adicionado com sucesso!", Emprestimos: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    usuario.find({}).lean().exec(
        function (e, usuarios) {
                    filme.find({}).lean().exec(
                        function (e, filmes) {
                            emprestimo.findOne({_id:req.params.id}).populate('filme').populate('usuario').exec(
                                function (err, emprestimo) {
                                    res.render('emprestimo/edit.ejs', { 'emprestimo': emprestimo, "Usuarios": usuarios, "Filmes": filmes });
                                })
                        })
                }) 
}

function edita(req, res) {
    emprestimo.findByIdAndUpdate(req.params.id, 
        { 
            nomef: req.body.nomef,
            datae: req.body.datae,
            dataemprestimo: req.body.dataemprestimo,
            filme: req.body.filme,
            usuario: req.body.usuario
        }, function (err) {
        if (err) {
            emprestimo.find({}).populate('filme').populate('usuario').lean().exec(function (err, docs) {
                res.render('emprestimo/list.ejs', { msg: "Problema ao editar!", Emprestimos: docs })
            })
        } else {
            emprestimo.find({}).populate('filme').populate('usuario').lean().exec(function (err, docs) {
                res.render('emprestimo/list.ejs', { msg: "Editado com sucesso!", Emprestimos: docs })
            })
        }
    })
}

function deleta(req, res) {
    emprestimo.findByIdAndDelete(req.params.id, function () {
        emprestimo.find({}).populate('filme').populate('usuario').lean().exec(function (err, docs) {
            res.render('emprestimo/list.ejs', { msg: "Removido com sucesso!", Emprestimos: docs })
        })
    })

}
//Para usar em outro arquivo
module.exports = {
    listar,
    filtrar,
    abrirAdiciona,
    adiciona,
    abrirEdita,
    edita,
    deleta,
    getEmprestimos
}