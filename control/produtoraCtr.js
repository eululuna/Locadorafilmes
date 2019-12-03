var produtora = require('../model/produtora')


//middleware para buscar produtoras
function getProdutoras(req, res, next) {
    produtora.find({}).lean().exec(function (err, docs) {
        req.produtoras = docs
        next()
    })
}

function listar(req, res) {
    produtora.find({}).lean().exec(function (err, docs) {
        res.render('produtora/list.ejs', { "Produtoras": docs })
    })
}

function filtrar(req, res) {
    produtora.find({ nome: new RegExp(req.body.pesquisa, 'i') })
        .lean().exec(function (err, docs) {
            res.render('produtora/list.ejs', { "Produtoras": docs })
        })
}

function abrirAdiciona(req, res) {
    res.render("produtora/add.ejs")
}

function adiciona(req, res) {
    var novoProdutora = new produtora({
        nome: req.body.nome,
        endereco: req.body.endereco,
        datafundacao: req.body.datafundacao,
        foto: req.file.filename
    })
    novoProdutora.save(function (err) {
        if (err) {
            produtora.find({}).lean().exec(function (err, docs) {
                res.render('produtora/list.ejs', { msg: "Problema ao salvar!", Produtoras: docs })
            })
        } else {
            produtora.find({}).lean().exec(function (err, docs) {
                res.render('produtora/list.ejs', { msg: "Adicionado com sucesso!", Produtoras: docs })
            })
        }
    })
}

function abrirEdita(req, res) {
    produtora.findById(req.params.id, function (err, produtora) {
        res.render('produtora/edit.ejs', { 'produtora': produtora });
    })
}

function edita(req, res) {
    produtora.findByIdAndUpdate(req.params.id,
        {
            nome: req.body.nome,
            endereco: req.body.endereco,
            datafundacao: req.body.datafundacao,
            foto: req.file.filename
        }, function (err) {
            if (err) {
                produtora.find({}).lean().exec(function (err, docs) {
                    res.render('produtora/list.ejs', { msg: "Problema ao editar!", Produtoras: docs })
                })
            } else {
                produtora.find({}).lean().exec(function (err, docs) {
                    res.render('produtora/list.ejs', { msg: "Editado com sucesso!", Produtoras: docs })
                })
            }
        })
}

function deleta(req, res) {
    produtora.findByIdAndDelete(req.params.id, function () {
        produtora.find({}).lean().exec(function (err, docs) {
            res.render('produtora/list.ejs', { msg: "Removido com sucesso!", Produtoras: docs })
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
    getProdutoras
}