import { song } from "../../pages/Recommendations";

interface SongCard {

    song: song;

    RefAudioCard: React.RefObject<HTMLAudioElement>;
}

const SongCard = ({ song, RefAudioCard }: SongCard) => {

    const preview_url = song.preview_url ? song.preview_url : 'No disponible';

    const { name, album } = song;

    return (
        <div className="flex items-start justify-center mb-[50px]">
            <div className="flex flex-col md:flex-row bg-slate-700 rounded-lg p-[20px] md:w-[600px] md:h-[300px] border-2 border-green-300">
                <div className="flex-shrink-0">
                    <img src={album.images[0].url} alt="image" className="rounded-lg w-56 h-56 md:w-56 md:h-56" />
                </div>
                <div className="flex flex-col justify-between w-[300px] ml-4">
                    <div className="flex justify-end">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 16 16">
                            <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0zm3.669 11.538a.498.498 0 0 1-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 0 1-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 0 1 .166.686zm.979-2.178a.624.624 0 0 1-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 0 1-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 0 1 .206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 1 1-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 1 1-.764 1.288z" />
                        </svg>
                    </div>
                    <div className="text-white font-bold text-xl mt-[10px] overflow-hidden">
                        <p className="text-center text-green-300 whitespace-nowrap transition-transform duration-10000 hover:animate-scroll">{name}</p>
                    </div>
                    <div className="text-white text-sm overflow-hidden">
                        <p className="text-center whitespace-nowrap transition-transform duration-10000 hover:animate-scroll">
                            {song.artists.map((artist) => artist.name).join(', ')}
                        </p>
                    </div>
                    <div className="mt-5">
                        {
                            preview_url !== 'No disponible' ?
                                <audio ref={RefAudioCard} src={preview_url} controls className="w-64 h-16 ml-2"></audio> :
                                <p className="text-white font-bold text-center">No hay preview disponible 🥲</p>
                        }
                    </div>
                    <div className="w-[70px] h-[70px] mt-[30px] ml-[210px] bg-no-repeat bg-center cursor-pointer transition-all duration-1000 bg-[url('https://cssanimation.rocks/images/posts/steps/heart.png')]" id="heart"></div>
                </div>
            </div>
        </div>

    );

}

export { SongCard }

