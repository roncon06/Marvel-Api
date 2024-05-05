import { Request, Response } from 'express';
import comicService from '../service/comics.service';
import { title } from 'process';

class ComicController {
    async createComic(req: Request, res: Response): Promise<void> {
        try {
            const comicData = req.body;
            const newComic = await comicService.createComic(comicData);
            res.status(201).json(newComic);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getAllComics(req: Request, res: Response): Promise<void> {
        try {
            const comics = await comicService.getAllComics();
            res.json(comics);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async getComicById(req: Request, res: Response): Promise<void> {
        try {
            const comicId = req.params.id;
            const comic = await comicService.getComicById(comicId);
            if (!comic) {
                res.status(404).json({ message: 'Quadrinho não encontrado' });
                return;
            }
            res.json(comic);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async updateComic(req: Request, res: Response): Promise<void> {
        try {
            const comicId = req.params.id;
            const comicData = req.body;
            const updatedComic = await comicService.updateComic(comicId, comicData);
            res.json(updatedComic);
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async deleteComic(req: Request, res: Response): Promise<void> {
        try {
            const comicId = req.params.id;
            await comicService.deleteComic(comicId);
            res.json({ message: 'Quadrinho deletado com sucesso' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async fetchAndSaveComics(req: Request, res: Response): Promise<void> {
        try {
            const eventId = req.params.eventId;
            await comicService.fetchAndSaveComics(eventId);
            res.status(200).json({ message: 'Quadrinhos salvos com sucesso no banco de dados!' });
        } catch (error) {
            res.status(500).json({ error: (error as Error).message });
        }
    }

    async countComics(req: Request, res: Response): Promise<void> {
        try {
            const count = await comicService.countComics();
            res.status(200).json({ count });
        } catch (error) {
            res.status(500).json({  error: (error as Error).message });
        }
}

async getComicByName(req: Request, res: Response): Promise<void> {
    const title: string = req.params.title;

    try {
        const comic = await comicService.findComicByName(title);
        if (!comic) {
            res.status(404).json({ error: `Quadrinho com o nome "${title}" não encontrado` });
            return;
        }
        res.json(comic);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
}

}

export default new ComicController();
