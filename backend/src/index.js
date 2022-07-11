const express = require('express')
const app = express() // Criando uma instância do expressjs
const cors = require('cors')

app.use(cors());

// Criando uma rota
app.get('/', (req, res) => {
  res.send('<h1>Olá mundo!</h1>')
})

// Criando uma nova rota
app.get('/api', (req, res) => {
    res.json({
      message: "API Projeto Arduino v1"
    })
  })


const sensoresRouter = require('./routes/sensoresRouter')
app.use('/api/sensores', sensoresRouter)

// Configurando o servidor
const port = 5000;
app.listen(port, () => { console.log(`Servidor rodando na porta ${port}`) })