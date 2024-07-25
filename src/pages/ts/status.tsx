import { useEffect } from "react";

const fetchStatus = () => {
    fetch("http://mp3.pixelfucker.com:3000/proxy-status", { method: "GET", redirect: "follow" })
        .then((response) => response.text())
        .then((result) => console.log(result))
        .catch((error) => console.error(error));
};

export const Status = () => {
    useEffect(() => {
        fetchStatus();
    }, []);

    return (
        <div>
        </div>
    )
};