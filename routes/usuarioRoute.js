var express = require('express')
var route = express.Router()
var usuarioCtr = require('../control/usuarioCtr')
var multer = require('../config/multerConfig')

//rota para listar todos usando middleware
//route.get('/',usuarioCtr.getusuarios, usuarioCtr.listar)

//rota para listar todos
route.get('/', usuarioCtr.listar)

//rota para listar por filtro
route.post('/', usuarioCtr.filtrar)

//rota para abrir o adiciona
route.get('/add', usuarioCtr.abrirAdiciona)

//rota para adicionar
route.post('/add', usuarioCtr.adiciona)

//rota para abrir o edita
route.get('/edit/:id', usuarioCtr.abrirEdita)

//rota para editar
route.post('/edit/:id',multer.single('foto'), usuarioCtr.edita)

//rota para deletar
route.get('/del/:id', usuarioCtr.deleta)

module.exports = route;