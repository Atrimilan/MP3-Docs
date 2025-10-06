import { useEffect, useState } from "react";
import { Blocks } from "react-loader-spinner";
import LinkButton from "./link-button";

/**
 * Fetch game info using MP3 API
 */
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

/**
 * Get JSX element of the game price
 */
function getGamePriceElement(free, price): JSX.Element {
    if (free) {
        return <span className="gold-gradient-effect">Gratuit</span>;
    } else if (price?.final_formatted !== "") {
        const { final_formatted, discount_percent } = price;
        return <span className="mp3-gradient-effect">{final_formatted + (discount_percent > 0 ? ` (-${discount_percent}%)` : "")}</span>;
    }
    return <span>-,--€</span>;
}

/**
 * Get JSX element of game info based on their fetched data
 */
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
                        <h3 style={{ whiteSpace: 'nowrap' }}>{gameInfo.name} – {getGamePriceElement(gameInfo.is_free, gameInfo.price_overview)}</h3>

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
 * For games not in stores, define a function to fetch the game price
 */
export const GamePriceToGet = {
    MINECRAFT: {
        fetchPrice: async () => {
            return await fetch(
                "https://displaycatalog.mp.microsoft.com/v7/products?" + new URLSearchParams({ bigIds: "9NXP44L49SHJ", languages: "fr-fr", market: "fr", actionFilte: "purchase" }))
                .then((response) => response.json())
                .then((response) => response?.Products[0]?.DisplaySkuAvailabilities[0]?.Availabilities?.find(a => a.OrderManagementData?.Price?.ListPrice > 0)?.OrderManagementData?.Price?.ListPrice)
                + "€";
        }
    },
}

/**
 * Get JSX element of game info based on hardcoded data
 */
export const GameInfoManually = ({ data }) => {
    const [priceElement, setPriceElement] = useState<JSX.Element>(<span>--,--€</span>);

    // Define JSX element of the price
    useEffect(() => {
        if (data.gamePriceToGet?.fetchPrice) {
            data.gamePriceToGet.fetchPrice().then((price) =>
                setPriceElement(getGamePriceElement(false, { final_formatted: price, discount_percent: 0 }))
            );
        } else {
            setPriceElement(getGamePriceElement(true, null));
        }
    }, [data.gamePriceToGet]);

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
                <h3 style={{ whiteSpace: 'nowrap' }}>{data.name} – {priceElement}</h3>
                <LinkButton data={{ url: data.url, label: "Site officiel", isTransparent: true, targetBlank: true }} />
            </div>
        </div>
    );
}
