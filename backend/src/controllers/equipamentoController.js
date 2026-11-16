
const prisma = require('../lib/prisma');

module.exports = {
  // LISTAR EQUIPAMENTOS
  async getAllEquipamentos(req, res) {
    try {
      const equipamentos = await prisma.equipamento.findMany();

      return res.status(200).json(equipamentos);
    } catch (error) {
      console.error('Erro ao listar equipamentos:', error);

      return res.status(500).json({
        error: 'Erro ao listar equipamentos'
      });
    }
  },

  // CADASTRAR EQUIPAMENTO
  async createEquipamento(req, res) {
    try {
      const { nome, descricao, material } = req.body;

      if (!nome || !material) {
        return res.status(400).json({
          error: 'Nome e material são obrigatórios'
        });
      }

      const newEquipamento = await prisma.equipamento.create({
        data: {
          nome,
          descricao,
          material
        }
      });

      return res.status(201).json({
        message: 'Equipamento cadastrado com sucesso!',
        equipamento: newEquipamento
      });
    } catch (error) {
      console.error('Erro ao cadastrar equipamento:', error);

      return res.status(500).json({
        error: 'Erro ao cadastrar equipamento'
      });
    }
  },

  // DELETAR EQUIPAMENTO
  async deleteEquipamento(req, res) {
    try {
      const { id } = req.params;

      if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'ID do equipamento inválido'
        });
      }

      const equipamento = await prisma.equipamento.delete({
        where: {
          id: BigInt(id)
        }
      });

      return res.status(200).json({
        message: 'Equipamento deletado com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao deletar equipamento:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Equipamento não encontrado'
        });
      }

      return res.status(500).json({
        error: 'Erro ao deletar equipamento'
      });
    }
  },

  // ATUALIZAR EQUIPAMENTO
  async updateEquipamento(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, material } = req.body;

      if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'ID do equipamento inválido'
        });
      }

      if (!nome || !material) {
        return res.status(400).json({
          error: 'Nome e material são obrigatórios'
        });
      }

      const equipamentoUpdate = await prisma.equipamento.update({
        where: {
          id: BigInt(id)
        },
        data: {
          nome,
          descricao,
          material
        }
      });

      return res.status(200).json({
        message: 'Equipamento atualizado com sucesso!',
        equipamento: equipamentoUpdate
      });
    } catch (error) {
      console.error('Erro ao atualizar equipamento:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Equipamento não encontrado'
        });
      }

      return res.status(500).json({
        error: 'Erro ao atualizar equipamento'
      });
    }
  }
};
