const prisma = require('../lib/prisma');
module.exports = {
  // LISTAR ACESSÓRIOS
  async getAllAcessorios(req, res) {
    try {
      const acessorios = await prisma.acessorio.findMany();

      return res.status(200).json(acessorios);
    } catch (error) {
      console.error('Erro ao listar acessórios:', error);

      return res.status(500).json({
        error: 'Erro ao listar acessórios'
      });
    }
  },

  // CADASTRAR ACESSÓRIO
  async createAcessorio(req, res) {
    try {
      const {
        nome,
        descricao,
        material,
        local_armazenamento,
        quantidade,
        quantidade_minima
      } = req.body;

      if (
        !nome ||
        !material ||
        !local_armazenamento ||
        quantidade == null ||
        quantidade_minima == null
      ) {
        return res.status(400).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos'
        });
      }

      if (
        !Number.isSafeInteger(Number(quantidade)) ||
        !Number.isSafeInteger(Number(quantidade_minima)) ||
        Number(quantidade) < 0 ||
        Number(quantidade_minima) < 0
      ) {
        return res.status(400).json({
          error: 'As quantidades devem ser números inteiros não negativos'
        });
      }

      const newAcessorio = await prisma.acessorio.create({
        data: {
          nome,
          descricao,
          material,
          local_armazenamento,
          quantidade: BigInt(quantidade),
          quantidade_minima: BigInt(quantidade_minima)
        }
      });

      return res.status(201).json({
        message: 'Acessório cadastrado com sucesso!',
        acessorio: JSON.parse(
          JSON.stringify(newAcessorio, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
          )
        )
      });
    } catch (error) {
      console.error('Erro ao cadastrar acessório:', error);

      return res.status(500).json({
        error: 'Erro ao cadastrar acessório'
      });
    }
  },

  // DELETAR ACESSÓRIO
  async deleteAcessorio(req, res) {
    try {
      const { id } = req.params;

      if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'ID do acessório inválido'
        });
      }

      const acessorio = await prisma.acessorio.delete({
        where: {
          id: BigInt(id)
        }
      });

      return res.status(200).json({
        message: 'Acessório deletado com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao deletar acessório:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Acessório não encontrado'
        });
      }

      return res.status(500).json({
        error: 'Erro ao deletar acessório'
      });
    }
  },

  // ATUALIZAR ACESSÓRIO
  async updateAcessorio(req, res) {
    try {
      const { id } = req.params;

      const {
        nome,
        descricao,
        material,
        local_armazenamento,
        quantidade,
        quantidade_minima
      } = req.body;

      if (!id || !/^\d+$/.test(id)) {
        return res.status(400).json({
          error: 'ID do acessório inválido'
        });
      }

      if (
        !nome ||
        !material ||
        !local_armazenamento ||
        quantidade == null ||
        quantidade_minima == null
      ) {
        return res.status(400).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos'
        });
      }

      if (
        !Number.isSafeInteger(Number(quantidade)) ||
        !Number.isSafeInteger(Number(quantidade_minima)) ||
        Number(quantidade) < 0 ||
        Number(quantidade_minima) < 0
      ) {
        return res.status(400).json({
          error: 'As quantidades devem ser números inteiros não negativos'
        });
      }

      const acessorioUpdate = await prisma.acessorio.update({
        where: {
          id: BigInt(id)
        },
        data: {
          nome,
          descricao,
          material,
          local_armazenamento,
          quantidade: BigInt(quantidade),
          quantidade_minima: BigInt(quantidade_minima)
        }
      });

      return res.status(200).json({
        message: 'Acessório atualizado com sucesso!',
        acessorio: JSON.parse(
          JSON.stringify(acessorioUpdate, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
          )
        )
      });
    } catch (error) {
      console.error('Erro ao atualizar acessório:', error);

      if (error.code === 'P2025') {
        return res.status(404).json({
          error: 'Acessório não encontrado'
        });
      }

      return res.status(500).json({
        error: 'Erro ao atualizar acessório'
      });
    }
  }
};
