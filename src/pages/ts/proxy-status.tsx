import { useEffect, useState } from "react";

const fetchProxyStatus = () => {
    return fetch("https://api.mcsrvstat.us/3/mp3.pixelfucker.com")
        .then((response) => response.json())
        .then((result) => {

            const { online: online_players, max: max_players, list: player_list } = result.players;

            player_list?.forEach(player => {
                delete player.uuid;
                player.image = "https://mc-heads.net/avatar/" + player.name;
            });

            return { online_players, max_players, player_list };
        })
        .catch((error) => console.error(error));
};


export const ProxyStatus = () => {
    const [serverInfo, setServerInfo] = useState(null);

    useEffect(() => {
        fetchProxyStatus().then(data => setServerInfo(data));
    }, []);

    return (
        <>
            {serverInfo?.online_players > 0 &&
                <div>
                    <h3>Joueurs en ligne : <span>{serverInfo?.online_players}/{serverInfo?.max_players}</span></h3>
                    <div>
                        {serverInfo.player_list.map(player => (
                            <div key={player.name} style={{ alignItems: "center", display: "flex" }}>
                                <img src={player.image} alt={player.name} style={{ width: 35, height: 35, margin: 7 }} />
                                <span>{player.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </>
    );
}