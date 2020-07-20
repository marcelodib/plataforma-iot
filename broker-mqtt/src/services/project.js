/*===============================IMPORT MODULES===============================*/
const database = require('../../config/database')();
const model = require('../models/measure')();
/*============================================================================*/

/*==============================PROJECT SERVICES==============================*/

/*===============================SELECT PROJECT===============================*/
module.exports.selectProject = async function (token) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = database();
    const _model = new model(connection);
    
    /*Chamando o model responsável pela busca de projeto.*/
    const result = await _model.selectProject(token);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectProject", error: result};
    }
}
/*============================================================================*/

/*============================================================================*/


