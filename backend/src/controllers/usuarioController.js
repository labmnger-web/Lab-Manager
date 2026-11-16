const prisma = require('../lib/prisma');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports = {
  async getAllUsers(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (error) {
      console.error('Erro ao listar usuarios:', error);
      res.status(500).json({ error: 'Erro ao listar usuarios' });
    }
  },

  async createUser(req, res) {
    try {

      const { nome, email, senha } = req.body;

      if (!nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const senhaHash = await bcrypt.hash(senha, 10);

      const newUser = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaHash,
        },
      });

      return res.status(201).json({
  message: 'Usuário cadastrado com sucesso!',
  usuario: {
    id: newUser.id,
    nome: newUser.nome,
    email: newUser.email
  }
});
    }  catch (error) {
  console.error('Erro ao cadastrar usuário:', error);

  if (error.code === 'P2002') {
    return res.status(409).json({
      error: 'Este e-mail já está cadastrado!'
    });
  }

  return res.status(500).json({
    error: 'Erro ao cadastrar usuário'
  });
}
  },

 
  
  async deleteUser(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ error: 'ID do usuário é obrigatório' });
      }

      const usuario = await prisma.usuario.delete({
        where: { id: parseInt(id) },
      });

      res.status(200).json(usuario);
    } catch (error) {
      console.error('Erro ao deletar usuário:', error);
      res.status(500).json({ error: 'Erro ao deletar usuário' });
    }
  },

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const { nome, email, senha } = req.body;

      if (!id || !nome || !email || !senha) {
        return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
      }

      const userUpdate = await prisma.usuario.update({
        where: { id: parseInt(id) },
        data: {
          nome,
          email,
          senha,
        },
      });

      res.status(200).json(userUpdate);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      res.status(500).json({ error: 'Erro ao atualizar usuário' });
    }
  }
}