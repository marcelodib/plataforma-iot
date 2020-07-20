/*===================================MODELS===================================*/

/*===============================INSERT MEASURE===============================*/
/**
 * ================================================================
 * |Model insertMeasure responsável por inserir uma nova medida   |
 * |no banco de dados.                                            |
 * ================================================================
 */
model.prototype.insertMeasure = function (measure) {
    return this._connection("measure").insert([measure]);
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

