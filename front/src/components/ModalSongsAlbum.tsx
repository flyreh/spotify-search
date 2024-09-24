import { useState, useRef, useEffect } from "react";

interface Song {

    name: string;
    preview_url: string;
}

interface ModalSongsAlbumProps {
    songs: Array<Song>,
    onClose: () => void

}

export const ModalSongsAlbum = ({ songs, onClose }: ModalSongsAlbumProps) => {

    const [currentSong, setCurrentSong] = useState<string | null>();

    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handlePlay = (previewUrl: string) => {

        if (audioRef.current) {
            audioRef.current.pause();
            audioRef.current.currentTime = 0;
        }
        setCurrentSong(previewUrl);
    };

    useEffect(() => {

        if (audioRef.current && currentSong) {
            console.log("playing");
            audioRef.current.src = currentSong;
            audioRef.current.play();
        }
    }, [currentSong]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-black rounded-xl p-6 w-[500px] shadow-lg shadow-black border-2 border-green-200">

                <div className="flex items-center justify-between text-xl text-green-300">
                    <div className="flex-grow text-center">
                        <h2 className="text-xl font-semibold">Canciones del Album </h2>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <svg className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>
                <ul>
                    {songs.map((song, index) => {
                        return (
                            <div key={index} className="flex justify-between items-center py-1">
                                <span>{song.name}</span>

                                {song.preview_url && (
                                    <button
                                        onClick={() => song.preview_url && handlePlay(song.preview_url)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <svg className="h-9 w-9" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-6.518-3.75A1 1 0 007 8.25v7.5a1 1 0 001.234.97l6.518-3.75a1 1 0 000-1.74z"></path>
                                        </svg>
                                    </button>
                                )}
                            </div>
                        );
                    })}

                </ul>
                {currentSong && (
                    <audio ref={audioRef} controls autoPlay className="w-full mt-4">
                        <source src={currentSong} type="audio/mpeg" />
                        Your browser does not support the audio element.
                    </audio>
                )}
            </div>
        </div>
    );

}