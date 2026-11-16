
const prisma = require('../lib/prisma');

module.exports = {
  // LISTAR VIDRARIAS
  async getAllVidrarias(req, res) {
    try {
      const vidrarias = await prisma.vidraria.findMany();

      return res.status(200).json(vidrarias);
    } catch (error) {
      console.error('Erro ao listar vidrarias:', error);

      return res.status(500).json({
        error: 'Erro ao listar vidrarias'
      });
    }
  },

  // CADASTRAR VIDRARIA
  async createVidraria(req, res) {
    try {
      const {
        nome,
        material,
        descricao,
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

      const newVidraria = await prisma.vidraria.create({
        data: {
          nome,
          material,
          descricao,
          local_armazenamento,
          quantidade: BigInt(quantidade),
          quantidade_minima: BigInt(quantidade_minima)
        }
      });

      return res.status(201).json({
        message: 'Vidraria cadastrada com sucesso!',
        vidraria: JSON.parse(
          JSON.stringify(newVidraria, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
          )
        )
      });
    } catch (error) {
      console.error('Erro ao cadastrar vidraria:', error);

      return res.status(500).json({
        error: 'Erro ao cadastrar vidraria'
      });
    }
  },

  // DELETAR VIDRARIA
  async deleteVidraria(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({error: 'ID da vidraria inválido'});
      }

      const vidraria = await prisma.vidraria.delete({
        where: {
          id: BigInt(id)
        }
      });

      return res.status(200).json({
        message: 'Vidraria deletada com sucesso!'
      });
    } catch (error) {
      console.error('Erro ao deletar vidraria:', error);

      return res.status(500).json({
        error: 'Erro ao deletar vidraria'
      });
    }
  },

  // ATUALIZAR VIDRARIA
  async updateVidraria(req, res) {
    try {
      const { id } = req.params;

      const {
        nome,
        material,
        descricao,
        local_armazenamento,
        quantidade,
        quantidade_minima
      } = req.body;

      if (!id) {
        return res.status(400).json({
          error: 'ID da vidraria inválido'
        });
      }

      if (!nome ||!material ||!local_armazenamento ||quantidade == null ||quantidade_minima == null) {
          return res.status(400).json({
          error: 'Todos os campos obrigatórios devem ser preenchidos'
        });
      }

      const vidrariaUpdate = await prisma.vidraria.update({
        where: {
          id: BigInt(id)
        },
        data: {
          nome,
          material,
          descricao,
          local_armazenamento,
          quantidade: BigInt(quantidade),
          quantidade_minima: BigInt(quantidade_minima)
        }
      });

      return res.status(200).json({
        message: 'Vidraria atualizada com sucesso!',
        vidraria: JSON.parse(
          JSON.stringify(vidrariaUpdate, (_, value) =>
            typeof value === 'bigint' ? value.toString() : value
          )
        )
      });
    } catch (error) {
      console.error('Erro ao atualizar vidraria:', error);

      return res.status(500).json({
        error: 'Erro ao atualizar vidraria'
      });
    }
  }
};