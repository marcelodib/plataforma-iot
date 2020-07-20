/*===============================IMPORT MODULES===============================*/
const { check, validationResult } = require('express-validator'); /*Modulo responsável por fazer a validação dos dados que chegam nas requisições.*/
/*============================================================================*/

/*===============================VARIABLE ROUTES===============================*/
module.exports = function (app) {
/*===============================CREATE VARIABLE===============================*/
    /** 
     * =======================================================================
     * |Route createVariable responsável por verificar se o usuário          |
     * |possuí sessão aberta para acessar essa rota.                         |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados   |
     * |são validos, e realiza o cadastro das variáveis do projeto,          |
     * |caso contrario, retorna erro.                                        |
     * =======================================================================
    */
    app.post('/createVariable', 
    [
        check('variableName', 'Nome de variável inválido!'        ).not().isEmpty().escape().isString().isLength({ max: 127 }),
        check('idExhibition', 'Modo de exibição inválido!'        ).not().isEmpty().escape().isInt(),
        check('idProject'   , 'Identificador do Projeto inválido!').not().isEmpty().escape().isInt(),
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a inserção da nova variável do projeto.*/
                app.src.controllers.variable.createVariable(app, req, res);
            }
        }
        else {
            /*Envio da resposta.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*================================LIST VARIABLE===============================*/
    /** 
     * ========================================================================
     * |Route listVariable responsável por verificar se o usuário             |
     * |possuí sessão aberta para acessar essa rota.                          |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados    |
     * |são validos, e realiza a busca das variáveis do projeto requisitado,  |
     * |caso contrario, retorna o erro.                                       |
     * ========================================================================
    */
    app.post('/listVariable', [check('idProject', 'Identificador do Projeto inválido').not().isEmpty().isInt()],
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if(req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req);
            /*Verificação se os parâmetros apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da resposta.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a busca das variáveis de um projeto.*/
                app.src.controllers.variable.listVariable(app, req, res);
            }
        }
        else {
            /*Envio da resposta.*/
            return res.status(400).send({status: "error", msg: "Acesso negado!"});
        }
    });
/*============================================================================*/

/*===============================DELETE VARIABLE===============================*/
    /** 
     * ==========================================================================
     * |Route deleteProject responsável por verificar se o usuário possuí       |
     * |sessão aberta para acessar essa rota.                                   |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados      |
     * |são validos, e deleta o projeto, caso contrario, retorna o erro.        |
     * ==========================================================================
    */
    app.post('/deleteVariable', 
    [
        check('idProject', 'Identificador do Projeto Inválido!').not().isEmpty().escape().isInt(),
        check('idVariable', 'Identificador da Variável Inválida!').not().isEmpty().escape().isInt(),
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da resposta.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller para deletar uma variável de um determinado projeto.*/
                app.src.controllers.variable.deleteVariable(app, req, res);
            }
        }
        else {
            /*Envio da resposta.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

};
/*============================================================================*/
