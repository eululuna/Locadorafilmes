const conexao = require('./conexao')

var produtora = conexao.Schema({
    nome:{
        type:String
    },
    endereco:{
        type:String
    },
    datafundacao:{
        type:Date
    },
    foto:{
        type:String
    }
})

module.exports = conexao.model("produtora",produtora)