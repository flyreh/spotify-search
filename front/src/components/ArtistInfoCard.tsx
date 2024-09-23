interface ArtistInfoCardProps {
    name: string;
    followers: number;
    images: Array<{ url: string }>;
    external_url: string;
    popularity: number;
    genres: Array<string>;
    id: string;
    type: string;
}

export function ArtistInfoCard({ id, name, followers, images, external_url, popularity, genres, type }: ArtistInfoCardProps) {

    return (


        <div className="relative flex flex-col text-white bg-slate-700 shadow-md shadow-yellow-50 border-green-300 border-2 rounded-xl w-[400px] h-50">
            <div className="mx-4 mt-4 mb-4 overflow-hidden text-gray-700 bg-slate-700 bg-clip-border rounded-xl flex items-center justify-center">
                <img
                    src={images[0].url}
                    alt="card-image"
                    className=" rounded-xl object-cover h-[300px] w-[270px]"
                />
            </div>

            <div className="p-3 bg-slate-800">
                <div className="flex items-center justify-center mb-2">
                    <p className=" block  font-sans text-2xl antialiased font-medium leading-relaxed text-blue-gray-900">
                        {name}
                    </p>
                </div>
                <div className="flex flex-col items-center justify-center space-y-2 divide-y divide-dashed divide-blue-50 mb-10 ">
                    <div className="flex justify-between w-full max-w-md">
                        <span className="text-green-300 font-extrabold">Type:</span>
                        <span className="text-white">{type}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-md">
                        <span className="text-green-300 font-extrabold ">Popularidad:</span>
                        <span className="text-white">{popularity}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-md">
                        <span className="text-green-300 font-extrabold">Seguidores:</span>
                        <span className="text-white">{followers}</span>
                    </div>
                    <div className="flex justify-between w-full max-w-md">
                        <span className="text-green-300 font-extrabold">ID:</span>
                        <span className="text-white">{id}</span>
                    </div>
                    <div className="flex flex-col items-center w-full max-w-md">
                        <span className="text-green-300 font-extrabold">Géneros:</span>
                        <span className="text-white mt-2">{genres.join(', ')}</span>
                    </div>
                </div>

            </div>
            <div className="flex flex-grow justify-center items-center">
                <div className="flex h-14 pt-0 justify-center items-center  ">
                    <button
                        onClick={() => window.open(external_url, '_blank')}

                        className="px-3 py-1  bg-gray-400 text-black font-semibold rounded border-2
                         border-black hover:bg-green-300/60 hover:shadow-lg hover:shadow-black transition-all duration-300">
                        Perfil en Spotify
                    </button>
                </div>
            </div>

        </div>

    );
}