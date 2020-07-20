/*===================================MODELS===================================*/

/*=============================INSERT VARIABLE================================*/
/**
 * ================================================================
 * |Model insertVariable responsável por cadastrar as             |
 * |variáveis de um projeto no banco de dados.                    |
 * ================================================================
 */
model.prototype.insertVariable = function (variable) {
    return this._connection("variable").insert(variable);
}
/*============================================================================*/

/*==============================SELECT VARIABLE===============================*/
/**
 * ================================================================
 * |Model selectVariable responsável por buscar as        | 
 * |variáveis do projeto requisitado no banco de dados.           |
 * ================================================================
 */
model.prototype.selectVariable = function (idProject, idUser) {
    return this._connection.select().from({p:"project", v:"variable"})
    .whereRaw(`v.idProject = ${idProject}`)
    .whereRaw(`p.idUser = ${idUser}`)
    .whereRaw("p.idProject = v.idProject");
}
/*============================================================================*/

/*==============================DELETE VARIABLE===============================*/
/**
 * ================================================================
 * |Model deleteVariable responsável por remover um determinado   | 
 * |projeto do banco de dados.                                    |
 * ================================================================
 */
model.prototype.deleteVariable = function (idVariable, idProject) {
    return this._connection("variable").where("idVariable", idVariable).del();
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

