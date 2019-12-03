var express = require('express')
var route = express.Router()
var produtoraCtr = require('../control/produtoraCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',produtoraCtr.getprodutoras, produtoraCtr.listar)

//rota para listar todos
route.get('/', produtoraCtr.listar)

//rota para listar por filtro
route.post('/', produtoraCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', produtoraCtr.abrirAdiciona)

//rota para adicionar
route.post('/add',multer.single('foto'), produtoraCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', produtoraCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), produtoraCtr.edita)

//rota para deletar
route.get('/del/:id', produtoraCtr.deleta)

module.exports = route;