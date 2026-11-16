
const prisma = require('../lib/prisma');

module.exports = {
  // LISTAR PRODUTOS QUÍMICOS
  async getAllProdutosQuimicos(req, res) {
    try {
      const produtos = await prisma.produto_quimico.findMany();

      return res.status(200).json(produtos);
    } catch (error) {
      console.error('Erro ao listar produtos químicos:', error);

      return res.status(500).json({
        error: 'Erro ao listar produtos químicos'
      });
    }
  },

  // CADASTRAR PRODUTO QUÍMICO
  async createProdutoQuimico(req, res) {
    try {
      const {
        nome,
        descricao,
        unidade_medida,
        local_armazenamento,
        quantidade,
        quantidade_minima
      } = req.body;

      if (
        !nome ||
        !unidade_medida ||
        !local_armazenamento ||
        quantidade == null ||
        quantidade_minima == null
      ) {
        return res.status(400).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos'
        });
      }

      const newProduto = await prisma.produto_quimico.create({
        data: {
          nome,
          descricao,
          unidade_medida,
          local_armazenamento,
          quantidade: Number(quantidade),
          quantidade_minima: Number(quantidade_minima)
        }
      });

      return res.status(201).json({
        message: 'Produto químico cadastrado com sucesso!',
        produto: newProduto
      });
    } catch (error) {
      console.error('Erro ao cadastrar produto químico:', error);

      if (error.code === 'P2002') {
        return res.status(409).json({
          error: 'Já existe um produto químico com esse nome'
        });
      }

      return res.status(500).json({
        error: 'Erro ao cadastrar produto químico'
      });
    }
  },

  // DELETAR PRODUTO QUÍMICO
  async deleteProdutoQuimico(req, res) {
    try {
      const { id } = req.params;

      if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'ID do produto químico inválido'
        });
      }

      const produto = await prisma.produto_quimico.delete({
        where: {
          id: BigInt(id)
        }
      });

      return res.status(200).json({
        message: 'Produto químico deletado com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao deletar produto químico:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Produto químico não encontrado'
        });
      }

      return res.status(500).json({
        error: 'Erro ao deletar produto químico'
      });
    }
  },

  // ATUALIZAR PRODUTO QUÍMICO
  async updateProdutoQuimico(req, res) {
    try {
      const { id } = req.params;

      const {
        nome,
        descricao,
        unidade_medida,
        local_armazenamento,
        quantidade,
        quantidade_minima
      } = req.body;

      if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'ID do produto químico inválido'
        });
      }

      if (
        !nome ||
        !unidade_medida ||
        !local_armazenamento ||
        quantidade == null ||
        quantidade_minima == null
      ) {
        return res.status(400).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos'
        });
      }

      const produtoUpdate = await prisma.produto_quimico.update({
        where: {
          id: BigInt(id)
        },
        data: {
          nome,
          descricao,
          unidade_medida,
          local_armazenamento,
          quantidade: Number(quantidade),
          quantidade_minima: Number(quantidade_minima)
        }
      });

      return res.status(200).json({
        message: 'Produto químico atualizado com sucesso!',
        produto: produtoUpdate
      });
    } catch (error) {
      console.error('Erro ao atualizar produto químico:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Produto químico não encontrado'
        });
      }

      if (error.code === 'P2002') {
        return res.status(409).json({
          error: 'Já existe um produto químico com esse nome'
        });
      }

      return res.status(500).json({
        error: 'Erro ao atualizar produto químico'
      });
    }
  }
};