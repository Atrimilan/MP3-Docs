import { useEffect, useState } from "react";
import DownloadButton from "./download-button";

const REPO_URL = "https://maven.fabricmc.net/net/fabricmc/fabric-installer";

function getLatestFabricInstallerUrl(): Promise<string> {
    return fetch(`${REPO_URL}/maven-metadata.xml`)
        .then((response) => response.text())
        .then((xmlText) => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, "application/xml");
            const version = xmlDoc.querySelector("release")?.textContent;
            return !!version ? `${REPO_URL}/${version}/fabric-installer-${version}.exe` : null;
        })
        .catch(error => {
            console.error("Could not fetch latest version of Fabric installer: ", error);
            return null;
        });
}

export default function DownloadFabricInstaller() {
    const [fabricInstallerUrl, setFabricInstallerUrl] = useState(null);

    useEffect(() => {
        getLatestFabricInstallerUrl().then(setFabricInstallerUrl);
    }, []);

    return <DownloadButton data={{
        url: fabricInstallerUrl ?? "https://fabricmc.net/use/installer/",
        important: true,
        targetBlank: !fabricInstallerUrl
    }} />;
}