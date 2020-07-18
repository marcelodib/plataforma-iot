/*===================================MODELS===================================*/

/*===============================INSERT PROJECT===============================*/
/**
 * ================================================================
 * |Model insertProject responsável por inserir um novo projeto   |
 * |no banco de dados.                                            |
 * ================================================================
 */
model.prototype.insertProject = function (project) {
    return this._connection("project").insert([project]);
}
/*============================================================================*/

/*========================INSERT PROJECT VARIABLES============================*/
/**
 * ================================================================
 * |Model insertProjectVariables responsável por cadastrar as     |
 * |variáveis de um projeto no banco de dados.                    |
 * ================================================================
 */
model.prototype.insertProjectVariable = function (variable) {
    return this._connection("variable").insert(variable);
}
/*============================================================================*/

/*==============================SELECT PROJECT================================*/
/**
 * ================================================================
 * |Model selectProject responsável por buscar determinados       | 
 * |projetos no banco de dados.                                   |
 * ================================================================
 */
model.prototype.selectProject = function (idProject, idUser) {
    if (Array.isArray(idProject) && idProject.length > 0) {
        return this._connection.select().from("project").whereIn("idProject", idProject).andWhere("idUser", idUser);
    } else {
        return this._connection.select().from("project").where("idUser", idUser);
    }
}
/*============================================================================*/

/*==============================SELECT PROJECT================================*/
/**
 * ================================================================
 * |Model deleteProject responsável por remover um determinado    | 
 * |projeto do banco de dados.                                    |
 * ================================================================
 */
model.prototype.deleteProject = function (idProject, idUser) {
        return this._connection("project").where("idProject", idProject).andWhere("idUser", idUser).del();
}
/*============================================================================*/

/*===============================FUNCTION MODEL===============================*/
/**
 * ================================================================
 * |Função responsável por receber a conexão com a base de dados  |
 * |e guarda-la como uma varivável local, para acesso dos models. |
 * ================================================================
 */
function model(connection) {
	this._connection = connection;
}
/*============================================================================*/

module.exports = function () {
	return model;
};
/*============================================================================*/

