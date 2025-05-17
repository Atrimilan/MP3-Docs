import { useEffect, useState } from "react";
import { CoordinatesTable } from './coordinates-table';
import { Blocks } from 'react-loader-spinner';

const fetchStatus = (server, world, file) => {
    return fetch(`http://mp3.pixelfucker.com:3000/pl3xmap/${server}/${world}/${file}`, { method: "GET", redirect: "follow" })
        .then((response) => response.json())
        .catch((error) => console.error(error));
};

export const Pl3xmapWarps = ({ data }) => {
    const [warps, setWarps] = useState(null);
    const { server, world, file } = data;

    useEffect(() => {
        fetchStatus(server, world, file).then(data => setWarps(data));

        const intervalId = setInterval(() => {
            fetchStatus(server, world, file).then(data => {
                setWarps(data)
            });
        }, 10000);
        return () => clearInterval(intervalId);
    }, []);

    // Loading message
    if (!warps) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Blocks height="35" width="35" visible={true} /> Chargement...
            </div>
        );
    }

    // Sort warps alphabetically
    const sortedWarps = [...warps].sort((a, b) =>
        a.options.tooltip.content.localeCompare(b.options.tooltip.content)
    );

    // Display warps in a table
    return (
        <CoordinatesTable data={
            sortedWarps.map(warp => {
                const { x, z } = warp.data.point;
                return [warp.options.tooltip.content, `${x} ~ ${z}`];
            })
        } />
    );
}