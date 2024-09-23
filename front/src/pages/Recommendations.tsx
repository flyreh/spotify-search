import { useState, useRef } from "react";
import { SongCard } from "../components/Recommendations/SongCard";
import { RecommendationsList } from "../components/Recommendations/RecommendationsList";


export interface song {
    name: string;
    id: string;
    album: {
        images: Array<{ url: string }>;

    };
    artists: Array<ArtistRecommendation>;
    preview_url: string;
    duration_ms: number;

}

export interface ArtistRecommendation {
    name: string;
}

const Recommendations = () => {

    const [searchSong, setSearchSong] = useState('');
    const [resSong, setResSong] = useState(null);
    const [loading, setLoading] = useState(false);

    const [Recommendations, setRecommendations] = useState<Array<song> | null>(null);

    const [currentRecommendation, setCurrentRecommendation] = useState<song | null>(null);

    const RefAudioCard = useRef<HTMLAudioElement | null>(null);


    const HandleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        setLoading(true);

        const song = await getSong();

        if (song) {
            getRecommendations(song);
        }
        setCurrentRecommendation(null);

        if (RefAudioCard.current) {
            RefAudioCard.current.pause();
            RefAudioCard.current.currentTime = 0;
            RefAudioCard.current.volume = 0.2;
        }
    };

    const getSong = async () => {

        console.log(searchSong);

        try {
            const response = await fetch(`http://localhost:3030/api/Song?query=${encodeURIComponent(searchSong)}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: localStorage.getItem('access_token') })
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            setResSong(data.tracks.items[0]);

            console.log("cancion: ");

            console.log(data.tracks.items[0]);

            return data.tracks.items[0];

        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }

    const getRecommendations = async (song: song) => {

        //desectructuring

        const id = song.id;

        try {
            const response = await fetch(`http://localhost:3030/api/Recommendations?id=${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },

                body: JSON.stringify({ token: localStorage.getItem('access_token') })
            });

            if (!response.ok) {
                console.log(response);
                throw new Error('Failed to fetch data');
            }

            const data = await response.json();

            setRecommendations(data.tracks);

            console.log("Recomendaciones: ");
            console.log(data.tracks);

        } catch (error) {

            console.error('Error fetching data:', error);

        } finally {

            setLoading(false);
        }
    }


    return (
        <>
            <div className="relative grid text-center h-[500px] content-center bg-cover bg-center"
                style={{ backgroundImage: 'url("https://personal123.sirv.com/pexels-stywo-1261728.jpg")' }}>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent z-0"></div>

                <div className="">
                    <h1 className=" text-outline text-6xl mb-4 font-bold text-green-300/80">Music - Recommendations</h1>
                    <p className="text-base italic text-white font-extrabold text-outline-recommendations">This is the Home page for Artist and Music.</p>
                </div>

                <div className="mb-4 text-white font-extrabold text-outline-recommendations ">
                    Search for your Recommendations
                </div>

                <div className="flex justify-center items-center z-10"  >
                    <form onSubmit={HandleSubmit} className="h-[70px] flex justify-center items-center">
                        <input
                            type="search"
                            value={searchSong}
                            placeholder="Search Song..."
                            onChange={(e) => setSearchSong(e.target.value)}
                            className="w-[300px] px-3 py-2 mr-5 bg-gray-400 text-black font-semibold rounded border-2 border-green-300/80 placeholder-slate-600"
                        />
                        <button
                            type="submit"
                            className="px-3 py-2 bg-gray-400 text-black font-semibold rounded border-2 border-green-300/80 hover:shadow-lg hover:shadow-black hover:border-black hover:bg-green-300/70 transition-all duration-300"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
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

                {!resSong && !loading && (
                    <div className="flex flex-col items-center justify-center divide-y divide-dashed divide-blue-50 mb-10 mt-3">
                        <p className="text-white"> Busque para mostrar resultados</p>
                    </div>
                )
                }

                {loading && (
                    <div className="grid justify-items-center h-[200px]  text-white  ">
                        <div className=" animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-white"></div>
                        <p>Cargando Datos del Artista...</p>

                    </div>
                )}

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_0.3fr_1fr] lg:gap-8">
                    {resSong && !loading && (
                        <>
                            <div className="flex flex-col col-span-2 ">
                                <SongCard RefAudioCard={RefAudioCard} song={resSong} />

                                {
                                    currentRecommendation && (
                                        <SongCard RefAudioCard={RefAudioCard} song={currentRecommendation} />
                                    )
                                }

                            </div>

                            <div className="flex justify-start mt-[40px]" >
                                {Recommendations && (
                                    <RecommendationsList RefAudioCard={RefAudioCard} recommendations={Recommendations} setCurrentRecommendation={setCurrentRecommendation} />
                                )}
                            </div>
                        </>
                    )}

                </div>

            </div>
        </>
    );

}
export { Recommendations };