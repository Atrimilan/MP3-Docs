import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import { LinkButton } from "./link-button";

const fetchGameInfo = (id: string) => {
    return fetch(`https://api.mp3.pixelfucker.com/steam/${id}`, { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .then((result) => result[id].data)
        .catch((error) => console.error(error));
};

export const GamePlatform = {
    STEAM: { name: "Steam", uriScheme: "steam://rungameid/" },
    UBISOFT: { name: "Ubisoft", uriScheme: "uplay://launch/" },
}

export const GameInfo = ({ data }) => {

    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        fetchGameInfo(data.id).then(info => setGameInfo(info));
    }, []);

    return (
        <div>
            {gameInfo ?
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ flex: "0 0 200px" }}>
                        <a href={`steam://store/${data.id}`}>
                            <img alt={`${gameInfo.name} thumbnail`} src={gameInfo.header_image} />
                        </a>
                    </div>
                    <div>
                        <h3>{gameInfo.name} – {gameInfo.is_free
                            ? <span className="mp3-gradient-effect">Gratuit</span>
                            : gameInfo.price_overview
                                ? <span className="gold-gradient-effect">{gameInfo.price_overview.final_formatted}</span>
                                : <span className="gold-gradient-effect">-,--€</span>}
                        </h3>

                        {/* Start game */}
                        <LinkButton data={{
                            url: (data.gamePlatform && data.overrideGameId)
                                ? data.gamePlatform.uriScheme + data.overrideGameId
                                : `steam://rungameid/${data.id}`,
                            label: "Lancer avec " + (data.gamePlatform?.name || GamePlatform.STEAM.name)
                        }} />

                        {/* Open the game page on Steam */}
                        <LinkButton data={{
                            url: `steam://store/${data.id}`,
                            label: "Page du magasin",
                            isTransparent: true
                        }} />
                    </div>
                </div>
                : <Blocks height="30" width="30" visible={true} />
            }
        </div>
    );
};