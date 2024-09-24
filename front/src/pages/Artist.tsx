import { TwitterCard } from "../components/TwitterCard";
import { useState, useRef } from "react";
import { ArtistInfoCard } from "../components/ArtistInfoCard";
import { ArtistTopTrack } from "../components/ArtistTopTrack";
import { ArtistAlbums } from "../components/ArtistAlbums";

import "./Artist.css";

export interface Artist {

    id: string;
    name: string;
    type: string;
    followers: { total: number };
    images: { url: string }[];
    external_urls: { spotify: string };
    popularity: number;
    genres: string[];
}

function componente() {

    return (
        <div>
            <h1>hola</h1>
        </div>
    );
}


export default function Artist() {

    const [searchTerm, setSearchTerm] = useState('');
    const [res, setRes] = useState<Artist | null>(null);
    const [loading, setLoading] = useState(false);

    const resultRef = useRef<HTMLDivElement>(null);


    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);


        try {
            const response = await fetch(`https://spotify-search-api-seven.vercel.app/api/ArtistSearch?query=${encodeURIComponent(searchTerm)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('access_token') })
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to fetch data, error en la respuesta');
            }

            const data = await response.json();

            setRes(data.artists.items[0]);

            console.log(data.artists.items[0]);

        } catch (error) {
            console.error('Error fetching data, XDDDD:', error);

        } finally {

            if (resultRef.current) {

                setTimeout(() => {
                    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' });
                }, 800);
            }

            setLoading(false);
        }
    };

    return (
        <>
            <div className="relative grid text-center h-[500px] content-center bg-cover bg-center "
                style={{ backgroundImage: 'url("https://personal123.sirv.com/pexels-francesco-ungaro-1726970.jpg")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-0"></div>

                <div className="">
                    <h1 className=" text-outline text-6xl mb-4 font-bold text-green-300/80">Music - Artist</h1>
                    <p className="text-base italic text-black">This is the Home page for Artist and Music.</p>
                </div>

                <div className="mb-4 text-black ">
                    Search for your favorite artist
                </div>

                <div className="flex justify-center items-center z-10" ref={resultRef} >
                    <form onSubmit={handleSubmit} className="h-[70px]  flex justify-center items-center">
                        <input
                            type="search"
                            value={searchTerm}
                            placeholder="Search Artist..."
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className=" w-[300px] px-3 py-2 mr-5 bg-gray-400 text-black font-semibold rounded border-2 border-green-300/80 placeholder-slate-600"
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-gray-400 text-black font-semibold rounded border-2 border-green-300/80 hover:shadow-lg hover:shadow-black hover:border-black hover:bg-green-300/70 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z">
                                </path>
                            </svg>
                        </button>
                    </form>
                </div>

                <div className=" flex justify-center items-center h-[70px] z-10">
                    <button
                        onClick={() => { }}
                        className="px-3 py-2 mr-5 bg-gray-400 text-black font-semibold rounded border-2 border-green-300/80
                        hover:bg-green-300/70 hover:border-black hover:border-2 hover:shadow-lg hover:shadow-black transition-all duration-300"
                    >
                        Preview
                    </button>
                    <button onClick={() => { }}
                        className="px-3 py-2  ml-5 bg-gray-400 text-black font-semibold rounded border-2 border-green-300/80
                        hover:bg-green-300/70 hover:border-black hover:border-2 hover:shadow-lg hover:shadow-black transition-all duration-300">
                        Next
                    </button>
                </div>
            </div>

            <div>

                <div className="flex flex-col items-center justify-center divide-y divide-dashed divide-blue-50 mb-10 mt-3">
                    { /*
                    <TwitterCard
                    Aniadir={componente}
                    nombre="Sernaque Cobeñas José Manuel "
                    username="@Sernaque"
                    image="House"
                    initialIsFollowing={true}
                />
                    */

                    }
                    {
                        /*response.map((usuario) => {
    
                            const { uuid, nombre, username, image, initialIsFollowing } = usuario;
                            return (
                                <TwitterCard
                                    key={uuid}
                                    Aniadir={componente}
                                    nombre={nombre}
                                    username={username}
                                    image={image}
                                    initialIsFollowing={initialIsFollowing}
    
                                />
                            );
                        })*/
                    }

                    {res ? (
                        <>
                            <TwitterCard
                                Aniadir={componente}
                                nombre={res.name}
                                username={res.type}
                                image={res.name}
                                initialIsFollowing={true}
                            />

                        </>

                    ) : (
                        <p className="text-white"> Busque para mostrar resultados</p>
                    )}

                </div>
                <div>
                    {loading && (
                        <div className="grid justify-items-center h-[200px]  text-white  ">
                            <div className=" animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                            <p>Cargando Datos del Artista...</p>

                        </div>
                    )}
                </div>
                <div className="flex space-x-4 items-start">
                    {res && (
                        !loading &&
                        <>
                            <div className="flex w-1/2 justify-center">
                                <ArtistInfoCard
                                    id={res.id}
                                    name={res.name}
                                    followers={res.followers?.total || 0}
                                    images={res.images}
                                    external_url={res.external_urls.spotify}
                                    popularity={res.popularity}
                                    genres={res.genres}
                                    type={res.type}
                                />
                            </div>
                            <div className="w-1/6 flex flex-col space-y-8 items-center">

                                <ArtistTopTrack id={res.id} />

                            </div>
                            <div className=" w-1/2 ">
                                <ArtistAlbums ArtistDetails={res} />
                            </div>
                        </>
                    )}

                </div>

            </div>
        </>

    );

}
