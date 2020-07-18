/*===============================IMPORT MODULES===============================*/
const { check, validationResult } = require('express-validator'); /*Modulo responsável por fazer a validação dos dados que chegam nas requisições.*/
/*============================================================================*/

/*================================USER ROUTES=================================*/
module.exports = function (app) {

/*===============================CREATE PROJECT===============================*/
    /** 
     * =======================================================================
     * |Route createProject responsável por verificar se o usuário possuí    |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de criação de  |
     * |projeto, caso contrário, retorna a pagina de sign In.                |
     * =======================================================================
    */
    app.get('/createProject', function (req, res) {
        /*Verificação se o usuário possui sessão aberta para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Renderiza tela de criação de projeto.*/
            return res.render("./project/createProject");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });

    /** 
     * =======================================================================
     * |Route createProject responsável por verificar se o usuário possuí    |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados   |
     * |são validos, e realiza o cadastro do projeto, caso contrario,        |
     * |retorna o erro.                                                      |
     * =======================================================================
    */
    app.post('/createProject', 
    [
        check('projectName', 'Nome do Projeto inválido!').not().isEmpty().escape().isString().isLength({ max: 127 })
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a inserção do novo projeto.*/
                app.src.controllers.project.createProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*==========================CREATE PROJECT VARIABLE===========================*/
    /** 
     * =======================================================================
     * |Route createProjectVariable responsável por verificar se o usuário   |
     * |possuí sessão aberta para acessar essa rota.                         |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados   |
     * |são validos, e realiza o cadastro das variáveis do projeto,          |
     * |caso contrario, retorna o erro.                                      |
     * =======================================================================
    */
    app.post('/createProjectVariable', 
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
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a inserção do novo projeto.*/
                app.src.controllers.project.createProjectVariable(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*=================================LIST PROJECT===============================*/
    /** 
     * =======================================================================
     * |Route listProject responsável por verificar se o usuário possuí      |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de listagem de |
     * |projetos, caso contrário, retorna a pagina de sign In.               |
     * =======================================================================
    */
    app.get('/listProject', function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Renderiza tela de listagem de projetos.*/
            return res.render("./project/listProject");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });

    /** 
     * ========================================================================
     * |Route listProject responsável por verificar se o usuário possuí       |
     * |sessão aberta para acessar essa rota.                                 |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados    |
     * |são validos, e realiza a busca dos dados projetos requisitados,       |
     * |caso contrario, retorna o erro.                                       |
     * ========================================================================
    */
    app.post('/listProject', [check('idProject', 'Identificador do Projeto inválido').isArray()], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller parar realizar a busca dos projetos.*/
                app.src.controllers.project.listProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*===============================DELETE PROJECT===============================*/
    /** 
     * ==========================================================================
     * |Route deleteProject responsável por verificar se o usuário possuí       |
     * |sessão aberta para acessar essa rota.                                   |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados      |
     * |são validos, e deleta o projeto, caso contrario, retorna o erro.        |
     * ==========================================================================
    */
    app.post('/deleteProject', [check('idProject', 'Identificador do Projeto Inválido!').not().isEmpty().escape().isInt()], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller para deletar um determinado projeto.*/
                app.src.controllers.project.deleteProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/

/*================================HOME PROJECT================================*/
    /** 
     * =======================================================================
     * |Route dashboard responsável por verificar se o usuário possuí        |
     * |sessão aberta para acessar essa rota.                                |
     * |Caso as condições sejam verdadeiras, retorna a pagina de dashboard do|
     * |projeto, caso contrário, retorna a pagina de sign In.                |
     * =======================================================================
    */
    app.get('/dashboard', function (req, res) {
        /*Verificação se o usuário possui sessão aberta para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Renderiza tela de home de projeto.*/
            return res.render("./project/dashboard");
        }
        else{
            /*Redirecionamento para página de sigIn, pois não possui permissão de acesso.*/
            return res.redirect("/signIn");
        }
    });
/*============================================================================*/

/*================================DATA PROJECT================================*/
    /** 
     * ==========================================================================
     * |Route dataProject responsável por verificar se o usuário possuí         |
     * |sessão aberta para acessar essa rota.                                   |
     * |Caso as condições sejam verdadeiras, verifica se os dados enviados      |
     * |são validos, e buscar as medidas do projeto na base de dados,           |
     * |caso contrario, retorna o erro.                                         |
     * ==========================================================================
    */
    app.post('/dataProject', 
    [
        check('idProject', 'Identificador do Projeto Inválido!').not().isEmpty().escape().isInt(),
        check('startDate', 'Data de início Inválida!'          ).not().isEmpty().escape().isISO8601(),
        check('endDate'  , 'Data final Inválida!'              ).not().isEmpty().escape().isISO8601(),
    ], 
    function (req, res) {
        /*Verificação se o usuário possui permissão para acessar essa rota.*/
        if (req.session.idUser !== undefined) {
            /*Chamada da função que valida os dados da requisição.*/
            const errors = validationResult(req)
            /*Verificação se os parâmetros não apresentam inconsistências.*/            
            if (!errors.isEmpty()) {
                /*Envio da respostas.*/
                return res.status(400).send({status: "error", msg: errors.array()});
            }
            else {
                /*Chamada do controller para buscar medidas de um determinado projeto.*/
                app.src.controllers.project.dataProject(app, req, res);
            }
        }
        else {
            /*Envio da respostas.*/
            return res.status(400).send({status: "error", msg: "Acesso Negado!"});
        }
    });
/*============================================================================*/


};
/*============================================================================*/
