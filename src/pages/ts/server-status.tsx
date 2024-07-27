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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Serveur</th>
                        <th>Joueurs</th>
                        <th>MOTD</th>
                        <th>Version</th>
                        <th>Statut</th>
                    </tr>
                </thead>
                <tbody>
                    {servers ? (
                        servers.map(server => (
                            <tr key={server.id}>
                                <td>{server.world_name}</td>
                                <td>{server.online} / {server.max}</td>
                                <td>{server.desc}</td>
                                <td>{server.version}</td>
                                <td>{server.running ? 'En ligne' : 'Hors ligne'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>Chargement des données...</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    )
};