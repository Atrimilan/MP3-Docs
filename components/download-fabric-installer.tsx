import { useEffect, useMemo, useState } from "react";
import DownloadButton from "./download-button";
import IconExternalLink from '@theme/Icon/ExternalLink';

const REPO_URL = "https://maven.fabricmc.net/net/fabricmc/fabric-installer";

async function getLatestFabricInstallerUrl(): Promise<string> {
    try {
        const response = await fetch(`${REPO_URL}/maven-metadata.xml`);
        const xmlText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const version = xmlDoc.querySelector("release")?.textContent;
        return !!version ? `${REPO_URL}/${version}/fabric-installer-${version}.exe` : null;
    } catch (error) {
        console.error("Could not fetch latest version of Fabric installer: ", error);
        return null;
    }
}

export default function DownloadFabricInstaller() {
    const [fabricInstallerUrl, setFabricInstallerUrl] = useState(null);

    useEffect(() => {
        getLatestFabricInstallerUrl().then(setFabricInstallerUrl);
    }, []);

    const fabricInstallerfilename = useMemo(() => {
        return fabricInstallerUrl ? fabricInstallerUrl.split("/").pop() : "Fabric";
    }, [fabricInstallerUrl]);

    return (
        <>
            <DownloadButton data={{
                url: fabricInstallerUrl ?? "https://fabricmc.net/use/installer/",
                important: true,
                targetBlank: !fabricInstallerUrl
            }} />
            {' '}
            <a href={fabricInstallerUrl ?? "https://fabricmc.net/use/installer/"}
                target={fabricInstallerUrl ? "_self" : "_blank"}
                rel="noopener noreferrer"
                style={{ fontWeight: "bold" }}
                title={`Télécharger ${fabricInstallerfilename}`}
                aria-label={`Télécharger ${fabricInstallerfilename}`}>
                Fabric
            </a>
            {' '}
            <a href="https://fabricmc.net/use/installer/"
                target="_blank"
                rel="noopener noreferrer"
                title="Voir sur le site officiel de Fabric"
                aria-label="Voir sur le site officiel de Fabric">
                <IconExternalLink />
            </a>
        </>
    );
}