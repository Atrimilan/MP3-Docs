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

function getGamePriceElement(gameInfo: any): JSX.Element {
    if (gameInfo.is_free) {
        return <span className="gold-gradient-effect">Gratuit</span>;
    } else if (gameInfo.price_overview?.final_formatted !== "") {
        const { final_formatted, discount_percent } = gameInfo.price_overview;
        return <span className="mp3-gradient-effect">{final_formatted + (discount_percent > 0 ? ` (-${discount_percent}%)` : "")}</span>;
    }
    return <span>-,--€</span>;
}

export const GameInfoFromStore = ({ data }) => {

    const [gameInfo, setGameInfo] = useState(null);

    useEffect(() => {
        fetchGameInfo(data.id).then(info => setGameInfo(info));
    }, []);

    return (
        <div>
            {gameInfo ?
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                    <div style={{ width: '200px', maxHeight: '120px', alignItems: 'center', justifyContent: 'center', display: 'flex', overflow: 'hidden' }}>
                        <a
                            href={`steam://store/${data.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
                        >
                            <img
                                alt={`${gameInfo.name} thumbnail`}
                                src={gameInfo.header_image}
                                style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                                onDragStart={(e) => e.preventDefault()}
                            />
                        </a>
                    </div>
                    <div>
                        <h3 style={{ whiteSpace: 'nowrap' }}>{gameInfo.name} – {getGamePriceElement(gameInfo)}</h3>

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

/**
 * Games not available on Steam or Ubisoft
 */
export const GameInfoManual = ({ data }) => {
    return (
        <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
            <div style={{ width: '200px', height: '120px', alignItems: 'center', justifyContent: 'center', display: 'flex', overflow: 'hidden' }}>
                <a
                    href={data.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center' }}
                >
                    <img
                        alt={data.name + " thumbnail"}
                        src={data.thumbnail}
                        style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }}
                        onDragStart={(e) => e.preventDefault()}
                    />
                </a>
            </div>
            <div>
                <h3 style={{ whiteSpace: 'nowrap' }}>{data.name} – <span className="gold-gradient-effect">Gratuit</span></h3>
                <LinkButton data={{ url: data.url, label: "Site officiel", isTransparent: true, targetBlank: true }} />
            </div>
        </div>
    );
}
