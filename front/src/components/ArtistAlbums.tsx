import { ButtonAlbum } from "./ButtonAlbum";
import { Artist } from "../pages/Artist";
import { useState, useEffect } from "react";



interface ArtistAlbumsProps {
    ArtistDetails: Artist;
}

export interface Album {
    id: string;
    name: string;
    images: { url: string }[];
    release_date: string;

}


export const ArtistAlbums = ({ ArtistDetails }: ArtistAlbumsProps) => {

    const { id } = ArtistDetails;

    const [Albums, setAlbums] = useState<Album[]>([]);

    useEffect(() => {

        fetch(`http://localhost:3030/api/ArtistAlbums?id=${id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('access_token') })
            })
            .then((response) => response.json())
            .then((data) => {

                setAlbums(data.items);
                console.log(data.items);

            }).catch((error) => {
                console.error('Error fetching albums:', error);
            });

    }, [id]);

    return (
        <div className="grid justify-items-center flex-col gap-y-2">
            <div className="w-[500px] h-[550px] rounded-xl border-green-300 border-2 bg-slate-700 py-4 px-2 shadow-md shadow-yellow-50">
                <div className="flex items-center px-2 text-base font-medium text-slate-50">
                    <div className="flex-1 text-center text-xl text-green-300">
                        Albums del Artista {ArtistDetails.name}
                    </div>

                    <div >
                        <button className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-black">
                            <svg className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" strokeLinejoin="round"></path>
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="mt-4 text-white">
                    <div className="flex max-h-[400px] w-full flex-col overflow-y-scroll">

                        {
                            Albums && Albums.map((album) => {

                                return (
                                    <ButtonAlbum key={album.id} album={album} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}