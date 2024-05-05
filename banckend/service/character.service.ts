import characterModel from '../schema/character.schema'
import { Character} from '../type/character.type'
import axios from 'axios';

class CharacterService {
    async createCharacter(characterData: any): Promise<any> {
        try {
            const newCharacter = await characterModel.create(characterData);
            return newCharacter;
        } catch (error) {
            throw new Error(`Erro ao criar personagem: ${error}`);
        }
    }

    async buscarTodosPersonagens(): Promise<any[]> {
        try {
            const personagens = await characterModel.find();
            return personagens;
        } catch (error) {
            throw new Error(`Erro ao buscar todos os personagens: ${error}`);
        }
    }

    async buscarPersonagemPorId(id: string): Promise<any> {
        try {
            const personagem = await characterModel.findById(id);
            if (!personagem) {
                throw new Error(`Personagem com o ID ${id} não encontrado`);
            }
            return personagem;
        } catch (error) {
            throw new Error(`Erro ao buscar personagem por ID: ${error}`);
        }
    }

    async deletarPersonagemPorId(id: string) {
        // Implementação para deletar um personagem por ID
        try {
            const deletedCharacter = await characterModel.findByIdAndDelete(id);
            if (!deletedCharacter) {
                throw new Error('Personagem não encontrado');
            }
            return deletedCharacter;
        } catch (error) {
            throw new Error(`Erro ao deletar personagem: ${error}`);
        }
    }

    async updateCharacter(characterId: string, newData: any): Promise<any> {
        try {
            const updatedCharacter = await characterModel.findByIdAndUpdate(characterId, newData, { new: true });
            return updatedCharacter;
        } catch (error) {
            throw new Error(`Erro ao atualizar personagem: ${(error as any).message}`);
        }
    }

    async buscarESalvarPersonagensDaMarvel(): Promise<void> {
        try {
            const eventId = '238'; // ID do evento desejado
            let offset = 0;
            let totalCharacters = 0;
    
            do {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/events/${eventId}/characters`, {
                    params: {
                        ts: 1,
                        apikey: 'a57614bc4dd5a03af2e48cb08d9da12b',
                        hash: '373f36aa724d6f8449127058e7fc354d',
                        limit: 100, // Limite de resultados por página (máximo permitido pela API da Marvel)
                        offset: offset
                    }
                });
    
                if (response.data && response.data.data && response.data.data.results) {
                    const personagens = response.data.data.results;
                    totalCharacters = response.data.data.total;
    
                    for (const personagemData of personagens) {
                        const novoPersonagem = new characterModel({
                            name: personagemData.name,
                            description: personagemData.description || '',
                            imageUrl: `${personagemData.thumbnail.path}/standard_medium.${personagemData.thumbnail.extension}`
                        });
                        await novoPersonagem.save();
                    }
    
                    offset += personagens.length;
                } else {
                    console.error('Erro ao buscar personagens da Marvel:', response.data);
                    break;
                }
            } while (offset < totalCharacters);
    
            console.log('Personagens da Marvel salvos com sucesso no banco de dados.');
        } catch (error: any) {
            console.error('Erro ao buscar personagens da Marvel:', error);
        }
    }

    async findCharacterByName(name: string): Promise<any> {
        try {
            const character = await characterModel.findOne({ name: name });
            if (!character) {
                throw new Error(`Personagem com o nome "${name}" não encontrado`);
            }
            return character;
        } catch (error) {
            throw new Error(`Erro ao buscar personagem por nome: ${error}`);
        }
    }


    async countCharacters(): Promise<number> {
        try {
            const totalCharacters = await characterModel.countDocuments();
            return totalCharacters;
        } catch (error) {
            throw new Error(`Erro ao contar personagens: ${error}`);
        }
    }
}




export default new CharacterService();
