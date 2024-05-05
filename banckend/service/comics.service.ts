import axios from 'axios';
import comicModel from '../schema/comics.schema';

class ComicService {
    async createComic(comicData: any): Promise<any> {
        try {
            const newComic = await comicModel.create(comicData);
            return newComic;
        } catch (error) {
            throw new Error(`Erro ao criar quadrinho: ${error}`);
        }
    }

    async getAllComics(): Promise<any> {
        try {
            const comics = await comicModel.find();
            return comics;
        } catch (error) {
            throw new Error(`Erro ao buscar todos os quadrinhos: ${error}`);
        }
    }

    async getComicById(id: string): Promise<any> {
        try {
            const comic = await comicModel.findById(id);
            return comic;
        } catch (error) {
            throw new Error(`Erro ao buscar quadrinho por ID: ${error}`);
        }
    }

    async updateComic(id: string, comicData: any): Promise<any> {
        try {
            const updatedComic = await comicModel.findByIdAndUpdate(id, comicData, { new: true });
            return updatedComic;
        } catch (error) {
            throw new Error(`Erro ao atualizar quadrinho: ${error}`);
        }
    }

    async deleteComic(id: string): Promise<void> {
        try {
            await comicModel.findByIdAndDelete(id);
        } catch (error) {
            throw new Error(`Erro ao deletar quadrinho: ${error}`);
        }
    }


    async fetchAndSaveComics(eventId: string): Promise<void> {
        try {
            let totalCount = 0;
            let comics: any[] = [];

            // Fazendo solicitações repetidas até recuperar todos os quadrinhos
            do {
                const response = await this.fetchComicsPage(eventId, comics.length);
                
                if (!response || !response.data || !response.data.data || !response.data.data.results) {
                    throw new Error('Resposta inválida da API da Marvel');
                }

                const results = response.data.data.results;
                totalCount = response.data.data.total;

                comics = [...comics, ...results];
            } while (comics.length < totalCount);

            // Salvando os quadrinhos no banco de dados local
            await comicModel.create(comics);

            console.log('Quadrinhos salvos com sucesso no banco de dados!');
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar e salvar quadrinhos: ${error.message}`);
            } else {
                throw new Error('Erro desconhecido ao buscar e salvar quadrinhos');
            }
        }
    }

    private async fetchComicsPage(eventId: string, offset: number): Promise<any> {
        try {
            const eventId = '238';
            const response = await axios.get(`https://gateway.marvel.com/v1/public/events/${eventId}/comics`, {
                params: {
                    ts: 1,
                    apikey: 'a57614bc4dd5a03af2e48cb08d9da12b',
                    hash: '373f36aa724d6f8449127058e7fc354d',
                    limit: 100, // Limite de 100 quadrinhos por página (máximo suportado pela API)
                    offset: offset
                }
            });

            return response;
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(`Erro ao buscar quadrinhos da página ${offset}: ${error.message}`);
            } else {
                throw new Error(`Erro desconhecido ao buscar quadrinhos da página ${offset}`);
            }
        }
    }

    async countComics(): Promise<number> {
        try {
            const count = await comicModel.countDocuments();
            return count;
        } catch (error) {
            throw new Error(`Erro ao contar os quadrinhos: ${error}`);
        }
}

     async findComicByName( title: string): Promise<any> {
    try {
        return await comicModel.findOne({ title: title });
    } catch (error) {
        throw new Error(`Erro ao buscar quadrinho por nome: ${error}`);
    }
}


}

export default new ComicService();
