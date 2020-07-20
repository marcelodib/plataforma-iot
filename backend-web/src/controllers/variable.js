/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*============================VARIABLE CONTROLLERS============================*/

/*===============================CREATE VARIABLE==============================*/
/**
 * ================================================================
 * |Controller createVariable responsável por cadastrar uma       |
 * |nova variável em um determinado projeto.                      |
 * ================================================================
 */
module.exports.createVariable = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const variable = req.body;

		/*Chamada do service que realiza a busca pelo projeto requisitado.*/
        const project = await app.src.services.project.selectProject(app, [variable.idProject], req.session.idUser);

		/*Verificação se o projeto requisitado foi encontrado.*/
        if (!Array.isArray(project) || project.length === 0) {
			/*Envio da resposta.*/
			return res.status(400).send({status: "error", msg: "Ocorreu um erro ao cadastrar a variável, nenhum projeto foi encontrado!"});
		}
		
		/*Chamada do service que realiza o cadastro de variáveis do projeto.*/
		await app.src.services.variable.insertVariable(app, [variable]);
		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Variável criada com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "createVariable");
		/*Envio da resposta.*/
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao inserir a variável!"});
	}
}
/*============================================================================*/

/*================================LIST VARIABLE===============================*/
/**
 * ================================================================
 * |Controller listVariable responsável por buscar pelas          |
 * |variáveis do projeto requisitado.                             |
 * ================================================================
 */
module.exports.listVariable = async function (app, req, res) {
	try {
		/*Atribuição dos dados enviados na requisição.*/
		const idProject = req.body.idProject;

		/*Chamada do service que realiza a busca por variáveis de um determinado projetos.*/
		const variables = await app.src.services.variable.selectVariable(app, idProject, req.session.idUser);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", data: variables});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "listVariable");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao buscar as variáveis do projeto!"});
	}
}
/*============================================================================*/

/*===============================DELETE VARIABLE==============================*/
/**
 * ================================================================
 * |Controller deleteVariable responsável por remover um           |
 * |determinado projeto.                                          |
 * ================================================================
 */
module.exports.deleteVariable = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
		const variable = req.body;

		/*Chamada do service responsável por buscar os projetos do usuário.*/
		const project = await app.src.services.project.selectProject(app, [variable.idProject], req.session.idUser);

		/*Verificação se o projeto pertence ao usuário.*/
		if (!Array.isArray(project) || project.length === 0) {
			/*Envio da resposta.*/
			return res.status(400).send({status: "error", msg: "Variável não pertence a nenhum projeto do usuário!"});
		}

		/*Chamada do service que realiza a remoção de variáveis.*/
        await app.src.services.variable.deleteVariable(app, variable.idVariable, variable.idProject);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Variável removida com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "deleteVariable");
		/*Envio da resposta.*/
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao deletar a variável!"});
	}
}
/*============================================================================*/

/*============================================================================*/
