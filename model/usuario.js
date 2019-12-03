const conexao = require('./conexao')

var usuario = conexao.Schema({
    nome:{
        type:String
    },
    endereco:{
        type:String
    },
    telefone:{
        type:String
    },
    cpf:{
        type:String
    }
})

module.exports = conexao.model("usuario",usuario)