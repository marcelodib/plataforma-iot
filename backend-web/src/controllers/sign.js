/*===============================IMPORT MODULES===============================*/
const bcrypt = require('bcryptjs');         /*Modulo responsável por gerar o hash da senha do usuário.*/
/*============================================================================*/

/*==============================SIGN CONTROLLERS==============================*/

/*=================================SIGN IN===================================*/
/**
 * ==================================================================
 * |Controller signIn responsável por buscar no banco de dados o    |
 * |usuário solicitado.  											|
 * |Caso exista, é calculado o Hash da senha e comparado com a      |
 * |registrada, estando tudo de correto, a sessão é aberta.         |
 * ==================================================================
 */
module.exports.signIn = async function (app, req, res) {
	try {
		/*Atribuição dos dados enviados na requisição.*/
		const userInfo = req.body;

		const user = await app.src.services.user.selectUser(app, userInfo);

		if (Array.isArray(user) && user.length === 0) {
			return res.status(400).send({status: "error", msg: "Email ou senha inválido!"});
		}

		/*Verificação se o hash da senha enviada confere com a registrada*/
		if (bcrypt.compareSync(userInfo.userPassword, user[0].userPassword)) {

			/*Cria a session do usuario*/
			req.session.idUser    = user[0].idUser;
			req.session.userName  = user[0].userName
			req.session.userEmail = user[0].userEmail;
			req.session.userPhone = user[0].userPhone;

			/*Chamada da função que torna o objeto user imutável.*/
			Object.freeze(req.session);

			/*Envio da respostas*/
			return res.status(200).send({status: "success", msg: "Bem Vindo!"});
		} 
		else {
			/*Envio da respostas*/
			return res.status(400).send({status: "error", msg: "Email ou senha inválido!"});
		}
	} catch (error) {
		app.src.utils.error.errorHandler.errorHandler(error, "signIn");
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao tentar autenticar o usuário!"});
	}
}
/*============================================================================*/

/*==================================SIGN UP===================================*/
/**
 * ================================================================
 * |Controller signUp responsável por calcular o Hash da         |
 * |senha enviada, e realizar a inserção do novo usuário no      |
 * |banco de dados.                                              |
 * ================================================================
 */
module.exports.signUp = async function (app, req, res) {

	try {
		/*Atribuição dos dados enviados no corpo da requisição.*/
		const user = req.body;
		
		/*Chamada da função que realiza o calculo do Hash.*/
		user.userPassword = bcrypt.hashSync(user.userPassword, 11);

		await app.src.services.user.insertUser(app, user)

		/*Envio da respostas*/
		return res.status(200).send({status: "success", msg: "Usuário foi criado com sucesso!"});
	} catch (error) {
		app.src.utils.error.errorHandler.errorHandler(error, "signUp");
		return res.status(400).send({status: "error", msg: "Ocorreu um erro ao tentar cadastrar o usuário!"});
	}
}
/*============================================================================*/

/*============================================================================*/

