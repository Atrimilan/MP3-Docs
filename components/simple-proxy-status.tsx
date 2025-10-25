import { useEffect, useState } from "react";
import WifiOutlinedIcon from '@mui/icons-material/WifiOutlined';
import WifiOffOutlinedIcon from '@mui/icons-material/WifiOffOutlined';
import { Blocks } from "react-loader-spinner";

const fetchStatus = () => {
    return fetch("https://api.mp3.pixelfucker.com/crafty/server-stats", { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .catch((error) => console.error(error));
};

export default function SimpleProxyStatus() {
    const [servers, setServers] = useState(null);

    useEffect(() => {
        fetchStatus().then(data => setServers(data));

        const intervalId = setInterval(() => {
            fetchStatus().then(data => setServers(data));
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <ul>
            {
                servers ?
                    servers.map((server) => (
                        <li key={server.id}>
                            <div style={{ display: 'inline-block', marginRight: '6px', verticalAlign: 'middle' }}>
                                {server.running ?
                                    <WifiOutlinedIcon style={{ color: 'var(--status-on)' }} /> :
                                    <WifiOffOutlinedIcon style={{ color: 'var(--status-off)' }} />}
                            </div>
                            Serveur <span style={{ fontWeight: "bold" }}>{server.world_name}</span>
                            {server.running && (
                                <> - Minecraft version <span style={{ fontWeight: "bold" }}>{server.version.replace(/^[^\d]*/, "")}</span></>
                            )}
                        </li>
                    ))
                    : <Blocks height="30" width="30" visible={true} />
            }
        </ul>
    );
}