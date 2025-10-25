import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { Blocks } from 'react-loader-spinner'
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined';

const fetchStatus = () => {
    return fetch("https://api.mp3.pixelfucker.com/crafty/server-stats", { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .catch((error) => console.error(error));
};

const ServerBackgroundImage = ({ src, alt }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const handleImageError = () => setImgSrc('/img/server_thumbnail/default-server-bg.png');
    return <img src={imgSrc} alt={alt} onError={handleImageError} />;
};

export default function Index() {
    const [onlinePlayers, setOnlinePlayers] = useState(null);
    const [servers, setServers] = useState(null);

    useEffect(() => {
        fetchStatus().then(data => {
            const online = data?.reduce((acc, item) => acc + item.online, 0) || 0;
            const max = data?.reduce((acc, item) => acc + item.max, 0) || 0;
            
            const playerNames = data?.map(item => item.players)
                .filter(str => str !== 'False')
                .map(str => JSON.parse(str.replace(/'/g, '"')))
                .flat().sort();

            setServers(data)
            setOnlinePlayers({ online, max, playerNames });
        });

        const intervalId = setInterval(() => {
            fetchStatus().then(data => setServers(data));
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <div className="index">

            {/* Left part (servers info) */}
            <div className="left">
                {
                    servers?.map((server: { id: Key; world_name: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal; running: any; version: string; online: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal; max: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal; }, index: number) => (
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
            </div>

            {/* Right part (online players) */}
            <div className="right">
                <div className="separator" />
                <div>
                    <h2 style={{ display: "flex", alignContent: 'center' }}>
                        <span>Joueurs en ligne :&nbsp;</span>
                        {onlinePlayers ?
                            <span>{onlinePlayers.online}/{onlinePlayers.max}</span> :
                            <Blocks height="30" width="30" visible={true} />
                        }
                    </h2>
                    <div>
                        {onlinePlayers &&
                            onlinePlayers.online > 0 && onlinePlayers.playerNames.map(player => (
                                <div key={player} style={{ alignItems: "center", display: "flex" }}>
                                    <img
                                        src={`https://mc-heads.net/avatar/${player}`}
                                        alt={player}
                                        style={{ width: 35, height: 35, margin: 7 }}
                                        onMouseEnter={e => e.currentTarget.src = `https://mc-heads.net/head/${player}`}
                                        onMouseLeave={e => e.currentTarget.src = `https://mc-heads.net/avatar/${player}`}
                                    />
                                    <span>{player}</span>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}