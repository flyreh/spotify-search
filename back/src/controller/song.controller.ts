import { Request, Response } from "express";

import SongService from "../services/song.service";

const service = new SongService();

export const getSong = async (req: Request, res: Response) => {

    console.log('getSong');

    try {
        const { query: name } = req.query;
        const { token } = req.body;

        if (typeof name !== 'string') {
            return res.status(400).send({ message: "Invalid id query parameter" });
        }
        if (typeof token !== 'string') {
            return res.status(400).send({ message: "Invalid token" });
        }

        const song = await service.getSong(name, token);

        res.json(song);

    } catch (error) {

        res.status(400).send({ message: "err" });
    }


}

export const getRecommendations = async (req: Request, res: Response) => {

    console.log('getRecommendations');

    try {
        const { id } = req.query;
        const { token } = req.body;

        if (typeof id !== 'string') {
            return res.status(400).send({ message: "Invalid id query parameter" });
        }
        if (typeof token !== 'string') {
            return res.status(400).send({ message: "Invalid token" });
        }

        const recommendations = await service.getRecommendations(id, token);

        res.json(recommendations);

    } catch (error) {

        res.status(400).send({ message: "err" });


    }
}

export default { getSong, getRecommendations }