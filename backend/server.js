
require('dotenv').config();

const express = require('express');
const app = express();

// Permite receber JSON nas requisições
app.use(express.json());

app.get('/teste-conexao', (req, res) => {
  res.json({
    mensagem: 'ESTOU EXECUTANDO O SERVER.JS ATUALIZADO!'
  });
});


// IMPORTAÇÃO DAS ROTAS
const usuarioRoutes = require('./src/routes/usuarioRoutes.js');
const equipamentoRoutes = require('./src/routes/equipamentoRoutes.js');
const produtoQuimicoRoutes = require('./src/routes/produtoQuimicoRoutes.js');
const acessorioRoutes = require('./src/routes/acessorioRoutes.js');
const vidrariaRoutes = require('./src/routes/vidrariaRoutes.js');

// REGISTRO DAS ROTAS
app.use('/usuarios', usuarioRoutes);
app.use('/equipamentos', equipamentoRoutes);
app.use('/produtos-quimicos', produtoQuimicoRoutes);
app.use('/acessorios', acessorioRoutes);
app.use('/vidrarias', vidrariaRoutes);

// ROTA INICIAL
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'API LabManager funcionando!'
  });
});

// INICIALIZAÇÃO DO SERVIDOR
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor LabManager rodando na porta ${PORT}`);
});
