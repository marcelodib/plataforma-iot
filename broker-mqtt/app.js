/*===============================IMPORT MODULES===============================*/
const mosca = require('mosca');   /*Modulo responsável por fazer a configuração e criação do broker mqtt.*/
const dotenv = require('dotenv'); /*Modulo responsável por fazer a leitura das variáveis de ambiente.*/
const {insertMeasure} = require('./src/controllers/measure');
/*============================================================================*/

/*=========================DEFINE CONFIGURATION SERVER========================*/
/*Chamada da função que realiza a leitura das variáveis de ambiente.*/
dotenv.config();

const settings = {
    http: {
        port: parseInt(process.env.PORT_SERVER),
        bundle: true,
        static: './'
    }
};

const server = new mosca.Server(settings);
/*============================================================================*/

/*=========================LISTENER CLIENT CONNECTION=========================*/
server.on('clientConnected', function(client) {
    console.log('Dispositivo Conectado!', client.id);
});
/*============================================================================*/

/*=========================LISTENER CLIENT PUBLICATION========================*/
server.on('published', function(packet, client) {
    try {
        /*Atribuição do tópico enviado separado por '/'.*/
        const topic = packet.topic.split('/');

        /*Verificação se o formato do tópico está correto.*/
        if (topic == undefined || topic == null || !Array.isArray(topic) || topic.length != 2) {
            console.log("Error: Tópico inválido!");
            return;
        }

        /*Verificação se o tópico está correto.*/
        if (topic[0] === "post-data") {
            /*Atribuição do token e dos dados enviados na publicação.*/
            const token = topic[1];
            const data = JSON.parse(packet.payload.toString())[0];

            /*Verificação se os dados enviados estão corretos.*/
            if (data == undefined || data == null) {
                console.log("Error: Paylod inválido!");
                return;
            }

            /*Chamada do controller para inserção da medida enviada.*/
            insertMeasure(token, data);
        }
    } catch (error) {
        console.log(error);
        return;
    }
});
/*============================================================================*/

/*===========================LISTENER SERVER READY============================*/
server.on('ready', setup);


function setup() {
    console.log('Platform IoT On!');
}
/*============================================================================*/