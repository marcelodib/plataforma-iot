/*===============================IMPORT MODULES===============================*/
/*============================================================================*/

/*============================PROJECT CONTROLLERS=============================*/

/*===============================CREATE PROJECT===============================*/
/**
 * ================================================================
 * |Controller createProject responsável por cadastrar um novo    |
 * |projeto e vincula-lo com suas variáveis.                      |
 * ================================================================
 */
module.exports.createProject = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const project = {projectName: req.body.projectName, idUser: req.session.idUser};

		/*Chamada do service que realiza o cadastro de projetos.*/
        await app.src.services.project.insertProject(app, project);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Projeto criado com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "createProject");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao inserir o projeto!"});
	}
}
/*============================================================================*/

/*================================LIST PROJECT================================*/
/**
 * ================================================================
 * |Controller listProject responsável por buscar pelos projetos  |
 * |requisitadas.                                                 |
 * ================================================================
 */
module.exports.listProject = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const idProject = req.body.idProject;

		/*Chamada do service que realiza a busca por projetos.*/
        const projects = await app.src.services.project.selectProject(app, idProject, req.session.idUser);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", data: projects});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "listProject");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao buscar os projetos!"});
	}
}
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
/**
 * ================================================================
 * |Controller deleteProject responsável por remover um           |
 * |determinado projeto.                                          |
 * ================================================================
 */
module.exports.deleteProject = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const idProject = req.body.idProject;

		/*Chamada do service que realiza a remoção de projetos.*/
        await app.src.services.project.deleteProject(app ,idProject, req.session.idUser);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", msg: "Projeto removido com sucesso!"});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "deleteProject");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao deletar o projeto!"});
	}
}
/*============================================================================*/

/*================================DATA PROJECT================================*/
/**
 * ================================================================
 * |Controller listProjectMeasure responsável por buscar as       |
 * |medidas de determinado projeto em um periodo de tempo.        |
 * ================================================================
 */
module.exports.listProjectMeasure = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const search = req.body;

		/*Chamada do service que realiza a remoção de projetos.*/
		const measure = await app.src.services.project.selectProjectMeasure(app ,search, req.session.idUser);

		/*Envio da resposta.*/
		return res.status(200).send({status: "success", data: measure});
	} catch (error) {
		/*Chamada do tratador de erros.*/
		app.src.utils.error.errorHandler.errorHandler(error, "listProjectMeasure");
		/*Envio da resposta.*/
		return res.status(500).send({status: "error", msg: "Ocorreu um erro ao buscar as medidas do projeto!"});
	}
}
/*============================================================================*/

/*============================================================================*/

