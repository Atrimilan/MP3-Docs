import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined';
import { useEffect, useState } from "react";

const fetchStatus = () => {
    return fetch("http://mp3.pixelfucker.com:3000/proxy-status", { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .then((result) => result.data)
        .catch((error) => console.error(error));
};

const ServerBackgroundImage = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);

    const handleImageError = () => {
        setImgSrc('/img/server_thumbnail/default-server-bg.png');
    };

    return <img src={imgSrc} alt={alt} onError={handleImageError} />;
};

export const ServerStatus = () => {
    const [servers, setServers] = useState(null);

    useEffect(() => {
        fetchStatus().then(data => setServers(data));

        const intervalId = setInterval(() => {
            fetchStatus().then(data => setServers(data));
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <>
            {
                servers?.map((server, index) => (
                    <div key={server.id} className={`info-box ${index > 0 ? 'spaced' : ''}`}>

                        <ServerBackgroundImage src={`/img/server_thumbnail/${server.id}.png`} alt="Photo du serveur" />

                        <div className="content">

                            <div className="title">
                                <h1>{server.world_name}</h1>
                            </div>

                            <div className="description">
                                <h4>{server.running && "Serveur " + server.version}</h4>
                            </div>

                            <div className="status">
                                {server.running ?
                                    <><span className='on'>En ligne</span>&nbsp;<WifiOutlinedIcon className='on' /></>
                                    :
                                    <><span className='off'>Hors ligne</span>&nbsp;<WifiOffOutlinedIcon className='off' /></>
                                }
                            </div>

                            <div className="connected">
                                <span>{server.online} / {server.max}</span>
                            </div>

                        </div>
                    </div>
                ))
            }
        </>
    )
};