import { Request, Response } from 'express';
import creatorService from '../service/creator.service';

class CreatorController {

    async getAllCreators(req: Request, res: Response): Promise<void> {
        try {
            const creators = await creatorService.findAllCreators();
            res.status(200).json(creators);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async getCreatorById(req: Request, res: Response): Promise<void> {
        const creatorId = req.params.id;
        try {
            const creator = await creatorService.findCreatorById(creatorId);
            if (!creator) {
                res.status(404).json({ message: `Criador com o ID ${creatorId} não encontrado.` });
            } else {
                res.status(200).json(creator);
            }
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async createCreator(req: Request, res: Response) {
        try {
            const creatorData = req.body;
            const newCreator = await creatorService.createCreator(creatorData);
            res.status(201).json(newCreator);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async deleteCreator(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;
            await creatorService.deleteCreatorById(creatorId);
            res.status(204).send(); // Retorna status 204 (No Content) para indicar sucesso sem conteúdo
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }

    async updateCreator(req: Request, res: Response) {
        try {
            const creatorId = req.params.id;
            const creatorData = req.body;
            const updatedCreator = await creatorService.updateCreatorById(creatorId, creatorData);
            res.status(200).json(updatedCreator);
        } catch (error: any) {
            res.status(500).json({ error: error.message });
        }
    }


    async fetchAndSaveCreators(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.eventId;
            await creatorService.fetchAndSaveCreators(eventId);
            res.status(200).json({ message: 'Creators salvos com sucesso no banco de dados!' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

  async  getCreatorByName(req: Request, res: Response): Promise<void> {
        const name: string = req.params.name;
    
        try {
            const creator = await creatorService.findCreatorByName(name);
            if (!creator) {
                res.status(404).json({ error: `Criador com o nome "${name}" não encontrado` });
                return;
            }
            res.json(creator);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }

  
}


}

export default new CreatorController();
