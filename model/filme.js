const conexao = require('./conexao')

var filme = conexao.Schema({
    titulo:{
        type:String
    },
    sinopse:{
        type:String
    },
    foto:{
        type:String
    },
    genero:{
        type:conexao.Schema.Types.ObjectId,
        ref: "genero"
    },
    produtora:{
        type:conexao.Schema.Types.ObjectId,
        ref: "produtora"
    },
    diretores:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "diretor"
    }]
})

module.exports = conexao.model("filme",filme)