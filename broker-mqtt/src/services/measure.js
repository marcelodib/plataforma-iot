/*===============================IMPORT MODULES===============================*/
const database = require('../../config/database')();
const model = require('../models/measure')();
/*============================================================================*/

/*==============================MEASURE SERVICES==============================*/

/*===============================INSERT MEASURE===============================*/
module.exports.insertMeasure = async function (measure) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = database();
    const _model = new model(connection);
    
    /*Chamando o model responsável pela inserção de medida.*/
    const result = await _model.insertMeasure(measure);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertMeasure", error: result};
    }
}
/*============================================================================*/

/*============================================================================*/


