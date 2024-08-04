import { useEffect, useState } from "react";
import { Blocks } from 'react-loader-spinner'

const fetchProxyStatus = () => {
    return fetch("https://api.mcsrvstat.us/3/mp3.pixelfucker.com")
        .then((response) => response.json())
        .then((result) => {

            const { online: online_players, max: max_players, list: player_list } = result.players;

            player_list?.forEach(player => {
                delete player.uuid;
                player.image_avatar = "https://mc-heads.net/avatar/" + player.name;
                player.image_head = "https://mc-heads.net/head/" + player.name;
                player.current_image = player.image_avatar;
            });

            return { online_players, max_players, player_list };
        })
        .catch((error) => console.error(error));
};


export const ProxyStatus = () => {
    const [serverInfo, setServerInfo] = useState(null);

    useEffect(() => {
        fetchProxyStatus().then(data => setServerInfo(data));

        const intervalId = setInterval(() => {
            fetchProxyStatus().then(data => setServerInfo(data));
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    const handleMouseEnter = (player) => {
        player.current_image = player.image_head;
        setServerInfo({ ...serverInfo });
    }

    const handleMouseLeave = (player) => {
        player.current_image = player.image_avatar;
        setServerInfo({ ...serverInfo });
    }

    return (
        <>
            <div>
                <h2 style={{ margin: 0, display: "flex", alignContent: 'center' }}>
                    <span>Joueurs en ligne :&nbsp;</span>
                    {serverInfo ?
                        <span>{serverInfo.online_players}/{serverInfo.max_players}</span> :
                        <Blocks
                            height="30"
                            width="30"
                            visible={true}
                        />
                    }
                </h2>
                <div>
                    {serverInfo &&
                        serverInfo.online_players > 0 && serverInfo.player_list.map(player => (
                            <div key={player.name} style={{ alignItems: "center", display: "flex" }}
                                onMouseEnter={() => handleMouseEnter(player)}
                                onMouseLeave={() => handleMouseLeave(player)}>
                                <img src={player.current_image} alt={player.name} style={{ width: 35, height: 35, margin: 7 }} />
                                <span>{player.name}</span>
                            </div>
                        ))
                    }
                </div>
            </div>
        </>
    );
}