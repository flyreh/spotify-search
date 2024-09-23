import "./TwitterCard.css";

import { ComponentType, useState } from "react";

interface TwitterCardProps {
    nombre: string;
    username: string;
    image: string;
    Aniadir: ComponentType;
    initialIsFollowing?: boolean;
}

//Se puede agregar el prop Aniadir para agregar un componente y renderizar su elemento en este componente, 
//aniadir es un componente que se renderiza en el componente TwitterCard

export function TwitterCard({ nombre, username, image, initialIsFollowing /*Aniadir*/ }: TwitterCardProps) {


    const [follow, setFollow] = useState(initialIsFollowing);

    const ButtonText = follow ? "Following" : "Follow";

    const handleClick = () => {
        setFollow(!follow);
    }

    const ButtonClassName = follow ?
        "article-tw-card-button is-following"
        : "article-tw-card-button";

    return (
        <article className="article-tw-card text-left   items-center ">
            <header className="article-tw-header">
                <img className="article-tw-img" alt="Primera Imagen" src={`https://unavatar.io/${image}`} />
                <div className="article-tw-div-info">
                    <strong className="hover:underline">
                        {nombre}
                    </strong>
                    <span className="article-tw-div-info-span">
                        {username}
                    </span>
                </div>
            </header>
            <aside>
                <button className={ButtonClassName} onClick={handleClick}  >

                    <span className="article-tw-card-button-textNormal">{ButtonText}</span>
                    <span className="article-tw-card-button-stop-following">Unfollow</span>
                </button>
            </aside>

        </article>
    );
}
