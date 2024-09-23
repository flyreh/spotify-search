import express from "express";
import ArtistController from "../controller/artist.controller";

import AlbumController from "../controller/album.controller";

import SongController from "../controller/song.controller";

const router = express.Router();

router.post("/ArtistSearch", ArtistController.getArtist);

router.post("/ArtistTopTracks", ArtistController.getTopTracks);

router.post("/ArtistAlbums", ArtistController.getAlbums);

router.post("/AlbumSongs", AlbumController.getTracks);


router.post("/Song", SongController.getSong);

router.post("/Recommendations", SongController.getRecommendations);

export default router;