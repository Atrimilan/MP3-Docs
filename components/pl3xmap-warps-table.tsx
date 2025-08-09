import { useEffect, useState } from "react";
import { CoordinatesTable } from './coordinates-table';
import { Blocks } from 'react-loader-spinner';

const fetchStatus = (server, world, file) => {
    return fetch(`https://api.mp3.pixelfucker.com/pl3xmap/${server}/${world}/${file}`, { method: "GET", redirect: "follow" })
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

    // Sort warps alphabetically (when starting with "_" it should be at the end of the list)
    const sortedWarps = [...warps].sort((a, b) => {
        const warpA = a.options.tooltip.content;
        const warpB = b.options.tooltip.content;

        if (warpA.startsWith('~') && !warpB.startsWith('~')) return 1;
        if (!warpA.startsWith('~') && warpB.startsWith('~')) return -1;
        return warpA.localeCompare(warpB);
    });

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