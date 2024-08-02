import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined';
import { useEffect, useState } from "react";

const fetchStatus = () => {
    return fetch("http://mp3.pixelfucker.com:3000/proxy-status", { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .then((result) => result.data)
        .catch((error) => console.error(error));
};

export const ServerStatus = () => {
    const [servers, setServers] = useState(null);

    useEffect(() => {
        fetchStatus().then(data => setServers(data));
    }, []);

    return (
        <>
            {
                servers?.map(server => (
                    <div className="info-box">

                        <img src={"/img/" + server.id + ".png"} alt="Photo du serveur" />

                        <div className="content">

                            <div className="title">
                                <h1>{server.world_name}</h1>
                            </div>

                            <div className="description">
                                <span>{"Serveur " + server.version}</span>
                            </div>

                            <div className="status">
                                {server.running ?
                                    <><span className='on'>En ligne</span>&nbsp;<WifiOutlinedIcon className='on' /></>
                                    :
                                    <><span className='off'>Hors ligne</span>&nbsp;<WifiOffOutlinedIcon className='off' /></>
                                }
                            </div>

                            <div className="connected">
                                <span>Joueurs : {server.online} / {server.max}</span>
                            </div>

                        </div>
                    </div>
                ))
            }
        </>
    )
};