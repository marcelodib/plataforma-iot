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

        await app.src.services.project.insertProject(app, project);

		return res.status(200).send({status: "success", msg: "Projeto criado com sucesso!"});
	} catch (error) {
        app.src.utils.error.errorHandler.errorHandler(error, "createProject");
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao inserir o projeto!"});
	}
}
/*============================================================================*/

/*==========================CREATE PROJECT VARIABLE===========================*/
/**
 * ================================================================
 * |Controller createProjectVariable responsável por cadastrar uma|
 * |nova variável em um determinado projeto.                      |
 * ================================================================
 */
module.exports.createProjectVariable = async function (app, req, res) {
    try {
		/*Atribuição dos dados enviados na requisição.*/
        const variable = req.body;

        const project = await app.src.services.project.selectProject(app, [variable.idProject], req.session.idUser);

        if (Array.isArray(project) && project.length === 1) {
            await app.src.services.project.insertProjectVariable(app, [variable]);
        }

		return res.status(200).send({status: "success", msg: "Variável criada com sucesso!"});
	} catch (error) {
        app.src.utils.error.errorHandler.errorHandler(error, "createProjectVariable");
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao inserir a variável!"});
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

        const projects = await app.src.services.project.selectProject(app, idProject, req.session.idUser);

		return res.status(200).send({status: "success", data: projects});
	} catch (error) {
        app.src.utils.error.errorHandler.errorHandler(error, "listProject");
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao buscar os projetos!"});
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

        await app.src.services.project.deleteProject(app ,idProject);

		return res.status(200).send({status: "success", msg: "Projeto removido com sucesso!"});
	} catch (error) {
        app.src.utils.error.errorHandler.errorHandler(error, "deleteProject");
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao deletar o projeto!"});
	}
}
/*============================================================================*/

/*============================================================================*/

