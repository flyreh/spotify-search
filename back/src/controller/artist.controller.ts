import { request, response } from "express";
import artistService from "../services/artist.service";

const service = new artistService();

const getArtist = async (req = request, res = response) => {

    console.log('getArtist');

    try {

        const { query: artist } = req.query;
        const { token } = req.body;

        console.log(artist);
        console.log(token);

        if (typeof artist !== 'string') {

            return res.status(400).send({ message: "Invalid artist query parameter" });
        }
        if (typeof token !== 'string') {

            return res.status(400).send({ message: "Invalid token" });
        }

        const infoArtist = await service.getInfoByName(artist, token);

        res.json(infoArtist);

    } catch (error) {

        res.status(400).send({ message: "err" });
    }

}

const getTopTracks = async (req = request, res = response) => {

    console.log("getTopTracks");

    try {
        const { id } = req.query;
        const { token } = req.body;

        if (typeof id !== 'string') {
            return res.status(400).send({ message: "Invalid id query parameter" });
        }
        if (typeof token !== 'string') {
            return res.status(400).send({ message: "Invalid token" });
        }

        const topTracks = await service.getTopTracks(id, token);

        res.json(topTracks);

    } catch (error) {

        res.status(400).send({ message: "err" });
    }

}

const getAlbums = async (req = request, res = response) => {

    console.log("getAlbums");

    const { id } = req.query;
    const { token } = req.body;

    if (typeof id !== 'string') {
        return res.status(400).send({ message: "Invalid id query parameter" });
    }
    if (typeof token !== 'string') {
        return res.status(400).send({ message: "Invalid token" });
    }

    const Albums = await service.getArtistAlbums(id, token);

    res.json(Albums);

}

export default { getArtist, getTopTracks, getAlbums };