/*===============================IMPORT MODULES===============================*/
const {selectProject}  = require('../services/project');
const {selectVariable} = require('../services/variable');
const {insertMeasure}  = require('../services/measure');
const {validatorToken} = require('../utils/token');
/*============================================================================*/

/*=============================MESAURE CONTROLLERS============================*/

/*===============================INSERT MEASURE===============================*/
/**
 * ================================================================
 * |Controller responsável por verificar os dados enviados e      |
 * |realizar inserção de uma nova medida.                         |
 * ================================================================
 */
module.exports.insertMeasure = async function (token, measure) {
    
    /*Verificação do token enviado na publicação.*/
    if (token == undefined || token == null || !isNaN(token) || token.length !== 36 || !validatorToken(token)) {
        console.log("Error: Token inválido!");
        return;
    }

    /*Verificação da variável enviada na publicação.*/
    if (measure.idVariable == undefined || measure.idVariable == null || isNaN(measure.idVariable) || measure.idVariable < 1) {
        console.log("Error: Variável inválida!");
        return;
    }

    /*Verificação do valor enviado na publicação.*/
    if (measure.value == undefined || measure.value == null || isNaN(data.value)) {
        console.log("Error: Valor inválido!");
        return;
    }

    /*Chamada do service responsável por buscar o projeto que contém o token publicada.*/
    const project = await selectProject(token);

    /*Verificação se o projeto foi encontrado.*/
    if (!Array.isArray(project) || project.length === 0) {
        console.log("Error: Projeto não encontrado!");
        return;
    }

    /*Chamada do service responsável por buscar a variável publicada.*/
    const variable = await selectVariable(project.idProject, measure.idVariable);

    /*Verificação se a variável foi encontrada.*/
    if (!Array.isArray(variable) || variable.length === 0) {
        console.log("Error: Variável não encontrada!");
        return;
    }

    /*Chamada do service responsável por inserir a medida publicada.*/
    await insertMeasure(measure);

    console.log("Success: Nova Medida inserida!");
    return;
}
/*============================================================================*/

/*============================================================================*/
