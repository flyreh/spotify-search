
import { useState } from 'react';
import { Album } from './ArtistAlbums';
import { ModalSongsAlbum } from './ModalSongsAlbum';

//import { ModalSongsAlbum } from './ModalSongsAlbum';

interface ButtonAlbumProps {
    album: Album;
}

export const ButtonAlbum = ({ album }: ButtonAlbumProps) => {

    const [Songs, SetSongs] = useState(null);
    const [loading, SetLoading] = useState(false);

    const [ModalOpen, SetModalOpen] = useState(false);

    const OpenModal = () => {

        console.log(loading);

        SetLoading(true);

        fetch(`https://spotify-search-api-seven.vercel.app/api/AlbumSongs?id=${album.id}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('access_token') })
            })
            .then((response) => response.json())
            .then((data) => {

                SetSongs(data.items);
                SetModalOpen(true);
                console.log(data.items);

            }).catch((error) => {
                console.error('Error fetching albums:', error);
            });

        SetLoading(false);
    }

    return (
        <>
            <button onClick={OpenModal} key={album.id} className="group text-left flex items-stretch 
         gap-x-5 rounded-md px-2.5 py-2 transition-all duration-200 hover:bg-green-100
          hover:text-black">
                <div className="flex h-14 w-14 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                    <span className="tag w-full text-center text-xl font-medium text-gray-700 group-hover:text-green-900">
                        <svg className="mx-auto h-12 w-12 rounded-md" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <image href={album.images[0].url} x="0" y="0" className="rounded-md mx-auto h-10 w-10" />
                        </svg>
                    </span>
                </div>
                <div className="flex flex-col items-start  font-normal hover:text-gray-600 ">
                    <p className="text-[17px]"> {album.name} </p>
                    <span className="text-xs font-light text-green-300">{album.release_date}</span>
                </div>
            </button>

            {
                ModalOpen && Songs && (
                    <ModalSongsAlbum songs={Songs} onClose={() => SetModalOpen(false)} />
                )
            }
        </>

    );

}