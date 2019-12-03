var express = require('express')
var route = express.Router()
var emprestimoCtr = require('../control/emprestimoCtr')
var multer = require('../config/multerConfig')

// rota para listar todos usando middleware
route.get('/',emprestimoCtr.getEmprestimos, emprestimoCtr.listar)

//rota para listar por filtro
route.post('/', emprestimoCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', emprestimoCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), emprestimoCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', emprestimoCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), emprestimoCtr.edita)

//rota para deletar
route.get('/del/:id', emprestimoCtr.deleta)

module.exports = route;