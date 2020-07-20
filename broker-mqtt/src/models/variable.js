/*===================================MODELS===================================*/

/*==============================SELECT VARIABLE===============================*/
/**
 * ================================================================
 * |Model selectVariable responsável por buscar as                | 
 * |variáveis do projeto requisitado no banco de dados.           |
 * ================================================================
 */
model.prototype.selectVariable = function (idProject, idVariable) {
    return this._connection.select().from("variable").where("idProject", idProject).andWhere("idVariable", idVariable);
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

