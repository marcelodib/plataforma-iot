/*===============================USER SERVICES====================================*/

/*================================INSERT USER=====================================*/
module.exports.insertUser = async function (app, user) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.user(connection);
    
    /*Chamando o model responsável pela inserção de usuário.*/
    const result = await model.insertUser(user);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertUser", error: result};
    }
}
/*================================================================================*/

/*================================SELECT USER=====================================*/
module.exports.selectUser = async function (app, user) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.user(connection);
    
    /*Chamando o model responsável pela busca de usuários.*/
    const result = await model.selectUser(user);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectUser", error: result};

    }
}
/*================================================================================*/

/*================================================================================*/
