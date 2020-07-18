/*=============================PROJECT SERVICES===================================*/

/*==============================INSERT PROJECT====================================*/
module.exports.insertProject = async function (app, project) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);
    
    /*Chamando o model responsável pela inserção de projeto.*/
    const result = await model.insertProject(project);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertProject", error: result};
    }
}
/*================================================================================*/

/*=========================INSERT PROJECT VARIABLES===============================*/
module.exports.insertProjectVariable = async function (app, variable) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);
    
    /*Chamando o model responsável pela inserção de variáveis do projeto.*/
    const result = await model.insertProjectVariable(variable);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "insertProjectVariable", error: result};
    }
}
/*================================================================================*/

/*===============================SELECT PROJECT===================================*/
module.exports.selectProject = async function (app, idProject, idUser) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);
    
    /*Chamando o model responsável pela busca de projetos.*/
    const result = await model.selectProject(idProject, idUser);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "selectProject", error: result};
    }
}
/*================================================================================*/

/*===============================DELETE PROJECT===================================*/
module.exports.deleteProject = async function (app, idProject, idUser) {
    /*Requisitando a conexão com o banco de dados.*/
    const connection = app.config.database();
    const model = new app.src.models.project(connection);
    
    /*Chamando o model responsável pela remoção de projetos.*/
    const result = await model.deleteProject(idProject, idUser);
    
    /*Verificação do resultado.*/
    if (result) {
        return result;
    } else {
        throw {type: "Database error", model: "deleteProject", error: result};
    }
}
/*================================================================================*/

/*================================================================================*/
