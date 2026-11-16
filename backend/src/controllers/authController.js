const prisma = require('../lib/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


module.exports = {
  async login(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        return res.status(400).json({
          error: 'E-mail e senha são obrigatórios'
        });
      }

      // Buscar usuário pelo e-mail
      const usuario = await prisma.usuario.findUnique({
        where: { email }
      });

      if (!usuario) {
        return res.status(401).json({
          error: 'E-mail ou senha incorretos'
        });
      }

      // Comparar senha informada com o hash salvo
      const senhaValida = await bcrypt.compare(
        senha,
        usuario.senha
      );

      if (!senhaValida) {
        return res.status(401).json({
          error: 'E-mail ou senha incorretos'
        });
      }

      // Gerar token JWT
      const token = jwt.sign(
        {
          id: usuario.id,
          email: usuario.email
        },
        process.env.JWT_SECRET,
        {
          expiresIn: '8h'
        }
      );

      return res.status(200).json({
        message: 'Login realizado com sucesso!',
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email
        }
      });

    } catch (error) {
      console.error('Erro ao realizar login:', error);

      return res.status(500).json({
        error: 'Erro ao realizar login'
      });
    }
  }
};