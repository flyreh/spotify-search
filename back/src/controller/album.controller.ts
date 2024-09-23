import { Request, Response } from "express";

import AlbumService from "../services/album.service";

const service = new AlbumService();


const getTracks = async (req: Request, res: Response) => {

    console.log('getTracks');

    try {
        const { id } = req.query;
        const { token } = req.body;

        if (typeof id !== 'string') {
            return res.status(400).send({ message: "Invalid id query parameter" });
        }
        if (typeof token !== 'string') {
            return res.status(400).send({ message: "Invalid token" });
        }

        const tracks = await service.getTracks(id, token);

        res.json(tracks);

    } catch (error) {

        res.status(400).send({ message: "err" });
    }

}
export default { getTracks };


