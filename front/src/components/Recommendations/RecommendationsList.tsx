import { song } from "../../pages/Recommendations";
import { ButtonRecomendation } from "./ButtonRecommendation";

interface RecommendationsCardProps {
    recommendations: Array<song>;
    setCurrentRecommendation: (song: song) => void;
    RefAudioCard: React.RefObject<HTMLAudioElement | null>;
}

const RecommendationsList = ({ recommendations, setCurrentRecommendation, RefAudioCard }: RecommendationsCardProps) => {


    return (

        <div className="grid justify-items-center flex-col gap-y-2">
            <div className="w-[500px] h-[550px] rounded-xl border-green-300 border-2 bg-slate-700 py-4 px-2 shadow-md shadow-yellow-50">
                <div className="flex items-center px-2 text-base font-medium text-slate-50">
                    <div className="flex-1 text-center text-xl text-green-300">
                        Recomendaciones
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
                            recommendations && recommendations.map((song) => {

                                return (
                                    <ButtonRecomendation RefAudioCard={RefAudioCard} key={song.id} song={song} setCurrentRecommendation={setCurrentRecommendation} />
                                );
                            })
                        }
                    </div>
                </div>
            </div>
        </div>

    );
}

export { RecommendationsList }
