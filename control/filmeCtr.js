var filme = require('../model/filme')
var produtora = require('../model/produtora')
var genero = require('../model/genero')
var diretor = require('../model/diretor')

//middleware para buscar filmes
function getFilmes(req, res, next) {
    filme.find({}).lean().exec(function (err, docs) {
        req.filmes = docs
        next()
    })
}

function listar(req, res) {
    filme.find({}).populate('genero')
    .populate('produtora')
    .populate('diretores')
    .lean()
    .exec(function (err, docs) {
        res.render('filme/list.ejs', { "Filmes": docs })
    })
}

function filtrar(req, res) {
    filme.find({ titulo: new RegExp(req.body.pesquisa, 'i') })
    .populate('genero')
    .populate('produtora')
    .populate('diretores')
    .lean()
    .exec(function (err, docs) {
            res.render('filme/list.ejs', { "Filmes": docs })
        })
}

function abrirAdiciona(req, res) {
    produtora.find({}).lean().exec(
        function (e, produtoras) {
            diretor.find({}).lean().exec(
                function (e, diretores) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            res.render("filme/add.ejs", { "Produtoras": produtoras, "Diretores": diretores, "Generos": generos })
                        });
                });
        });
}

function adiciona(req, res) {

    var novoFilme = new filme({
        titulo: req.body.titulo,
        sinopse: req.body.sinopse,
        foto: req.file.filename,
        genero: req.body.genero,
        produtora: req.body.produtora,
        diretores: req.body.diretores,
    })
    novoFilme.save(function (err) {
        if (err) {
            filme.find({}).populate('genero').populate('produtora').populate('diretores').lean().exec(function (err, docs) {
                console.log(docs)
                res.render('filme/list.ejs', { msg: "Problema ao salvar!", Filmes: docs })
            })
        } else {
            filme.find({}).populate('genero').populate('produtora').populate('diretores').lean().exec(function (err, docs) {
                console.log(docs)
                res.render('filme/list.ejs', { msg: "Adicionado com sucesso!", Filmes: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    produtora.find({}).lean().exec(
        function (e, produtoras) {
            diretor.find({}).lean().exec(
                function (e, diretores) {
                    genero.find({}).lean().exec(
                        function (e, generos) {
                            filme.findOne({_id:req.params.id}).populate('genero').populate('produtora').populate('diretores').exec(
                                function (err, filme) {
                                    res.render('filme/edit.ejs', { 'filme': filme, "Produtoras": produtoras, "Diretores": diretores, "Generos": generos });
                                });
                        });
                });
        });   
}

function edita(req, res) {
    filme.findByIdAndUpdate(req.params.id, 
        { 
            titulo: req.body.titulo,
            sinopse: req.body.sinopse,
            foto: req.file.filename,
            genero: req.body.genero,
            produtora: req.body.produtora,
            diretores: req.body.diretores
        }, function (err) {
        if (err) {
            filme.find({}).populate('genero').populate('produtora').populate('diretores').lean().exec(function (err, docs) {
                res.render('filme/list.ejs', { msg: "Problema ao editar!", Filmes: docs })
            })
        } else {
            filme.find({}).populate('genero').populate('produtora').populate('diretores').lean().exec(function (err, docs) {
                res.render('filme/list.ejs', { msg: "Editado com sucesso!", Filmes: docs })
            })
        }
    })
}

function deleta(req, res) {
    filme.findByIdAndDelete(req.params.id, function () {
        filme.find({}).populate('genero').populate('produtora').populate('diretores').lean().exec(function (err, docs) {
            res.render('filme/list.ejs', { msg: "Removido com sucesso!", Filmes: docs })
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
    getFilmes
}