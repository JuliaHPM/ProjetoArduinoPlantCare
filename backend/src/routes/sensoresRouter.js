const express = require('express')
const router = express.Router()
const sensoresController = require('../controllers/sensoresController')
const conexao = require('../config/conexao')

router.get('/', sensoresController.listar)
router.get('/ultimaLeitura', sensoresController.listarUltimaLeitura)
router.get('/regas', sensoresController.listarRegas)
router.get('/:id', sensoresController.listarPorId)
router.post('/', sensoresController.inserir)
router.put('/:id', sensoresController.alterar)
router.delete('/:id', sensoresController.deletar)

//comunicação com a porta serial do Arduino
const { SerialPort } = require('serialport')
const port = new SerialPort({ path: 'COM4', baudRate: 115200 })

port.on('open', onOpen);
port.on('data', data => setTimeout(() => {  onData(`${data}`); }, 2000)); //esperar 2 segundos para pegar todos os valores de uma vez

//função chamada quando a porta serial recebe dados
function onData(data) {
    console.log(data.toString('utf8'));
    value = data.toString('utf8');
    var arrayDados = value.split(','); 
    console.log(arrayDados);
  
    if(arrayDados.length == 5){
        salvarDados(arrayDados);
    }
};

//função chamada quando a porta serial é aberta
function onOpen() {
    console.log("serial port open");
}

function salvarDados(arrayDados){
       // `id`, `umidadeSoloAnalog`, `umidadeSoloPorc`, `umidadeAr`, `temperaturaAr`, `rega`
       const query = 'insert into sensoresArduino (umidadeSoloAnalog, umidadeSoloPorc, umidadeAr, temperaturaAr, rega) values (?)'
       conexao.query(query, [arrayDados], (err) => {
           if (err) {
               console.log(err)
           } else {
               console.log('Dados cadastrados!')
           }
       })
}
module.exports = router