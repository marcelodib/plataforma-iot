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

/*==============================DELETE PROJECT================================*/
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

/*==============================DELETE PROJECT================================*/
/**
 * ================================================================
 * |Model selectProjectMeasure responsável por buscar as medidas  |
 * |de um determinado projeto em um intervalo de tempo no         |
 * |banco de dados.                                               |
 * ================================================================
 */
model.prototype.selectProjectMeasure = function (search, idUser) {
    return this._connection.select().from({p:"project", v:"variable", m:"measure"})
    .whereRaw("v.idVariable = m.idVariable")
    .whereRaw("p.idProject = v.idProject")
    .whereRaw(`p.idProject = ${search.idProject}`)
    .whereRaw(`p.idUser = ${idUser}`)
    .whereRaw(`m.dateTime > \'${search.startDate} 00:00:00\'`)
    .whereRaw(`m.dateTime < \'${search.endDate} 23:59:59\'`)
    .orderBy("m.dateTime");
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

