/*===============================IMPORT MODULES===============================*/
const database = require('../../config/database')();
const model = require('../models/measure')();
/*============================================================================*/

/*==============================VARIABLE SERVICES=============================*/

/*===============================SELECT VARIABLE==============================*/
module.exports.selectVariable = async function (idProject, idVariable) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = database();
    const _model = new model(connection);
    
    /*Chamando o model responsável pela busca de variável.*/
    const result = await _model.selectVariable(idProject, idVariable);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectVariable", error: result};
    }
}
/*============================================================================*/

/*============================================================================*/


