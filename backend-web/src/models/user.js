/*===================================MODELS===================================*/

/*================================INSERT USER=================================*/
/**
 * ================================================================
 * |Model insertUser responsável por inserir um novo usuário      |
 * |no banco de dados.                                            |
 * ================================================================
 */
model.prototype.insertUser = function (user) {
    return this._connection("user").insert([user]);
}
/*============================================================================*/

/*================================SELECT USER=================================*/
/**
 * ================================================================
 * |Model selectUser responsável por buscar um determinado usuário|
 * |no banco de dados.                                            |
 * ================================================================
 */
model.prototype.selectUser = function (userInfo) {
    return this._connection.select().from("user").where("userEmail", userInfo.userEmail);
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

