import { useState } from "react";
import { useEffect } from "react";

interface ArtistTopTrackProps {
    id: string;

}

interface Track {
    album: {
        images: { url: string }[],
        name: string
    };
}


export const ArtistTopTrack = ({ id }: ArtistTopTrackProps) => {



    const [resTopTrack, setResTopTrack] = useState<Track[]>([]);

    useEffect(() => {

        fetch(`https://spotify-search-api-seven.vercel.app/api/ArtistTopTracks?id=${id}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ token: localStorage.getItem('access_token') })
        })
            .then((response) => response.json())
            .then((data) => {

                setResTopTrack(data.tracks);

                console.log(data.tracks);

            }).catch((error) => {
                console.error('Error fetching top tracks:', error);
            });
    }, [id]);


    return (
        <>
            {
                resTopTrack &&

                resTopTrack.slice(0, 3).map((track, index) => (
                    <div key={index} className="flex justify-center items-center flex-col  shadow-yellow-50 text-white bg-slate-700 shadow-md border-green-300 border-2 rounded-xl p-4 w-[200px] h-[250px]">
                        <img
                            key={index}
                            src={track.album.images[0].url}
                            alt={`Artist image ${index + 1}`}
                            className="rounded-xl object-cover h-[180px] w-[170px]"
                        />
                        <div>
                            <p className="text-center text-sm font-bold mt-2">{track.album.name}</p>
                        </div>
                    </div>

                ))
            }
        </>





    );
}

