const conexao = require('./conexao')

var emprestimo = conexao.Schema({
    datae:{
        type:Date
    },
    dataentrega:{
        type:Date
    },
    usuario:
            {
        type:conexao.Schema.Types.ObjectId,
        ref: "usuario"
            }
        ,
    filme:[{
        type:conexao.Schema.Types.ObjectId,
        ref: "filme"
    }]
})

module.exports = conexao.model("emprestimo",emprestimo)