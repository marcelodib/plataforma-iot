/*===================================MODELS===================================*/

/*==============================SELECT PROJECT================================*/
/**
 * ================================================================
 * |Model selectProject responsável por buscar determinados       | 
 * |projetos no banco de dados.                                   |
 * ================================================================
 */
model.prototype.selectProject = function (token) {
    return this._connection.select().from("project").where("token", token);
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

