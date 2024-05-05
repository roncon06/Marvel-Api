import { Request, Response } from 'express';
import characterService from '../service/character.service'








class CharacterController {
    async createCharacter(req: Request, res: Response): Promise<void> {
        try {
            const characterData = req.body;
            const newCharacter = await characterService.createCharacter(characterData);
            res.status(201).json(newCharacter);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message }); // Type assertion para garantir que error seja do tipo Error
        }
    }

    
    async buscarTodosPersonagens(req: Request, res: Response) {
        try {
            const personagens = await characterService.buscarTodosPersonagens();
            res.status(200).json(personagens);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async buscarPersonagemPorId(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const personagem = await characterService.buscarPersonagemPorId(id);
            res.status(200).json(personagem);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async deletarPersonagem(req: Request, res: Response) {
        const id = req.params.id;
        try {
            const deletedCharacter = await characterService.deletarPersonagemPorId(id);
            res.status(200).json(deletedCharacter);
        } catch (error: any) {
            res.status(404).json({ error: error.message });
        }
    }

    async updateCharacter(req: Request, res: Response) {
        try {
            const characterId = req.params.id;
            const updatedCharacter = await characterService.updateCharacter(characterId, req.body);
            res.status(200).json(updatedCharacter);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }
    

        async buscarESalvarPersonagensDaMarvel(req: Request, res: Response): Promise<void> {
            try {
                await characterService.buscarESalvarPersonagensDaMarvel();
                res.status(200).json({ message: 'Personagens da Marvel salvos com sucesso.' });
            } catch (error) {
                console.error('Erro ao buscar e salvar personagens da Marvel:', error);
                res.status(500).json({ error: 'Erro ao buscar e salvar personagens da Marvel.' });
            }
        }

        async findCharacterByName(req: Request, res: Response) {
            try {
                const name = req.params.name;
                const character = await characterService.findCharacterByName(name);
                res.status(200).json(character);
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
        }

        async countCharacters(req: Request, res: Response) {
            try {
                const totalCharacters = await characterService.countCharacters();
                res.status(200).json({ total: totalCharacters });
            } catch (error) {
                res.status(500).json({ error: (error as Error).message });
            }
        }
        


}
export default new CharacterController();
