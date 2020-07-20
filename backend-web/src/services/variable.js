/*=============================VARIABLE SERVICES==================================*/

/*==============================INSERT VARIABLES==================================*/
module.exports.insertVariable = async function (app, variable) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.variable(connection);
    
    /*Chamando o model responsável pela inserção de variáveis do projeto.*/
    const result = await model.insertVariable(variable);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertVariable", error: result};
    }
}
/*================================================================================*/

/*===============================SELECT VARIABLES=================================*/
module.exports.selectVariable = async function (app, idProject, idUser) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.variable(connection);

    /*Chamando o model responsável pela busca de variáveis de um determinado projeto.*/
    const result = await model.selectVariable(idProject, idUser);

    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectVariable", error: error};
    }
}
/*================================================================================*/

/*===============================DELETE VARIABLE==================================*/
module.exports.deleteVariable = async function (app, idVariable, idProject) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.variable(connection);
    
    /*Chamando o model responsável pela remoção de variáveis.*/
    const result = await model.deleteVariable(idVariable, idProject);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "deleteVariable", error: result};
    }
}
/*================================================================================*/

/*================================================================================*/
