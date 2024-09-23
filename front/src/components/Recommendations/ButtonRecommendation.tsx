
import { song } from "../../pages/Recommendations"

interface ButtonRecomendationProps {

    song: song;
    setCurrentRecommendation: (song: song) => void;
    RefAudioCard: React.RefObject<HTMLAudioElement | null>;
}


const ButtonRecomendation = ({ song, setCurrentRecommendation, RefAudioCard }: ButtonRecomendationProps) => {



    const min = Math.trunc(song.duration_ms / 60000);
    const seg = Math.trunc((song.duration_ms % 60000) / 1000);
    const formattedSeg = seg.toString().padStart(2, '0');

    const handlePlay = (song: song, previewUrl: string) => {

        console.log("presionado");
        console.log(previewUrl);

        if (RefAudioCard.current) {
            RefAudioCard.current.pause();
            RefAudioCard.current.currentTime = 0;
        }
        setCurrentRecommendation(song);
    }

    return (
        <>
            <button onClick={() => { handlePlay(song, song.preview_url) }} key={song.id} className="group text-left flex items-stretch 
         gap-x-5 rounded-md px-2.5 py-2 transition-all duration-150 hover:bg-green-100
          hover:text-black">
                <div className="flex h-14 w-14 items-center rounded-lg bg-gray-200 text-black group-hover:bg-green-200">
                    <span className="tag w-full text-center text-xl font-medium text-gray-700 group-hover:text-green-900">
                        <svg className="mx-auto h-12 w-12 rounded-md" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <image href={song.album.images[0].url} x="0" y="0" className="rounded-md mx-auto h-10 w-10" />
                        </svg>
                    </span>
                </div>
                <div className="flex flex-col items-start  font-normal hover:text-gray-600 ">
                    <p className="text-[17px]"> {song.name} </p>

                    <span className="text-xs font-light text-green-300"> time {` ${min}:${formattedSeg} `}</span>
                </div>
            </button>
        </>
    );

}


export { ButtonRecomendation }