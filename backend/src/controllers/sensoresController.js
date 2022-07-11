// acessar o banco
const conexao = require('../config/conexao')

exports.listar = (req, res) => {
    const query = 'select * from sensoresArduino'
    conexao.query(query, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500)
            res.json({ "message": "Internal Server Error" })
        } else if (rows.length > 0) {
            res.status(200)
            res.json(rows)
        } else {
            res.status(404)
            res.json({ "message": "Nenhum dado cadastrado para esta busca" })
        }
    })
}

exports.listarUltimaLeitura = (req, res) => {
    const query = 'SELECT * FROM sensoresArduino order by id desc limit 1;'
    conexao.query(query, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500)
            res.json({ "message": "Internal Server Error" })
        } else if (rows.length > 0) {
            res.status(200)
            res.json(rows)
        } else {
            res.status(404)
            res.json({ "message": "Não foi possível buscar leitura" })
        }
    })
}

//ultima leitura umidade SELECT umidadeSoloPorc FROM projetoarduino.sensoresarduino order by id desc limit 1;

exports.listarRegas = (req, res) => {
    const query = 'SELECT data_leitura FROM projetoarduino.sensoresarduino where rega = 1 limit 10;'
    conexao.query(query, (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500)
            res.json({ "message": "Internal Server Error" })
        } else if (rows.length > 0) {
            res.status(200)
            res.json(rows)
        } else {
            res.status(404)
            res.json({ "message": "Não foi possível buscar regas" })
        }
    })
}

// listar por ID
exports.listarPorId = (req, res) => {
    const id = req.params.id
    const query = 'select * from sensoresArduino where id = ?'
    conexao.query(query, [id], (err, rows) => {
        if (err) {
            console.log(err)
            res.status(500)
            res.json({ "message": "Internal Server Error" })
        } else if (rows.length > 0) {
            res.status(200)
            res.json(rows[0])
        } else {
            res.status(404)
            res.json({ "message": "Nenhuma dado cadastrado com esse id" })
        }
    })
}

//post
exports.inserir = (req, res, valor) => {

    // const temperatura = {}
    // temperatura.descricao = req.body.descricao
    // temperatura.data = req.body.data

    const query = 'insert into sensoresArduino (temperatura) values (?)'

    conexao.query(query, [valor], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
            res.json({ "message": "Internal Server Error" })
        } else {
            res.status(201)
            res.json({ "message": result.insertId })
        }
    })
}

//put
exports.alterar = (req, res) => {

    const temperatura = {}
    temperatura.id = req.params.idTemp
    // temperatura.temperatura = req.query.temperatura
    temperatura.temperatura = req.params.temperatura

    const query = 'update sensoresArduino set temperaturaAr = ? where id = ?'

    conexao.query(query, [temperatura.temperatura, temperatura.id], (err, result) => {
        if (err) {
            console.log(err)
            res.status(500)
            res.json({ "message": "Internal Server Error" })
        } else if (result.affectedRows > 0) {
            res.status(202)
            res.json({ "message": "Temperatura alterada" })
        } else {
            res.status(404)
            res.json({ "message": "temperatura não encontrada" })
        }
    })
}

//delete
exports.deletar = (req, res) => {
 
    const id = req.params.id
  
    const query = 'delete from sensoresArduino where id = ?'
  
    conexao.query(query, [id], (err, result) => {
      if (err){
        console.log(err)
        res.status(500)
        res.json({"message": "Internal Server Error"})
      } else if (result.affectedRows > 0){
        res.status(200)
        res.json({"message": "Dados excluídos"})
      } else {
        res.status(404)
        res.json({"message": "Dados não encontrados"})
      }
    })
  }

{/*create table sensoresArduino (
	id int auto_increment not null,
	umidadeSoloAnalog int,
	umidadeSoloPorc int,
	umidadeAr int,
	temperaturaAr double,
	rega boolean,
	data_leitura timestamp default current_timestamp,
	Constraint pk_sensoresArduino  primary key (id)
);
 */}

