import axios from 'axios';
import creatorModel from '../schema/creator.schema';

class CreatorService {


    async findAllCreators(): Promise<any[]> {
        try {
            const creators = await creatorModel.find();
            return creators;
        } catch (error) {
            console.error('Erro ao buscar todos os criadores:', error);
            throw new Error('Erro ao buscar todos os criadores. Consulte os logs para mais detalhes.');
        }
    }

    async findCreatorById(creatorId: string): Promise<any | null> {
        try {
            const creator = await creatorModel.findById(creatorId);
            return creator;
        } catch (error) {
            console.error(`Erro ao buscar o criador com o ID ${creatorId}:`, error);
            throw new Error(`Erro ao buscar o criador com o ID ${creatorId}. Consulte os logs para mais detalhes.`);
        }
    }
    
    async createCreator(creatorData: any): Promise<any> {
        try {
            const newCreator = await creatorModel.create(creatorData);
            return newCreator;
        } catch (error) {
            throw new Error(`Erro ao criar criador: ${error}`);
        }
    }

    async deleteCreatorById(id: string): Promise<void> {
        try {
            await creatorModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Erro ao excluir criador: ${error}`);
        }
    }

    async updateCreatorById(id: string, creatorData: any): Promise<any> {
        try {
            const updatedCreator = await creatorModel.findByIdAndUpdate(id, creatorData, { new: true });
            return updatedCreator;
        } catch (error) {
            throw new Error(`Erro ao atualizar criador: ${error}`);
        }
    }
    


    async fetchAndSaveCreators(eventId: string): Promise<void> {
        try {
            const response = await this.fetchCreators(eventId);
            const creators = response.data.data.results;
            await creatorModel.create(creators);
            console.log('Creators salvos com sucesso no banco de dados!');
        } catch (error) {
            console.error('Erro ao buscar e salvar creators:', error);
            throw new Error('Erro ao buscar e salvar creators. Consulte os logs para mais detalhes.');
        }
    }

    private async fetchCreators(eventId: string): Promise<any> {
        try {
            const eventId = '238';
            const response = await axios.get(`https://gateway.marvel.com/v1/public/events/${eventId}/creators`, {
                params: {
                    ts: 1,
                    apikey: 'a57614bc4dd5a03af2e48cb08d9da12b',
                    hash: '373f36aa724d6f8449127058e7fc354d',
                    limit: 100 // Limite de 100 creators por página (máximo suportado pela API)
                }
            });
       return response;
        } catch (error) {
            console.error('Erro ao buscar creators:', error);
            throw new Error('Erro ao buscar creators. Consulte os logs para mais detalhes.');
        }
    }

    async  findCreatorByName(name: string): Promise<any> {
        try {
            const creator = await creatorModel.findOne({ fullName: name });
            if (!creator) {
                throw new Error(`Criador com o nome "${name}" não encontrado`);
            }
            return creator;
        } catch (error) {
            throw new Error(`Erro ao buscar criador por nome: ${error}`);
        }
    }
}

export default new CreatorService();
