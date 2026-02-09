import { useEffect, useState } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import DownloadButton from "./download-button";
import IconExternalLink from '@theme/Icon/ExternalLink';

const fetchFabricVersions = async () => {
    try {
        // Based on Fabric API versions
        const response = await fetch(`https://api.modrinth.com/v2/project/P7dR8mSH/version?version_type=release`, { method: "GET", redirect: "follow" });
        const result = (await response.json());
        const regex = /^\d+\.\d+(\.\d+)?$/;
        const gameVersions = result.map((v) => v.game_versions[0]).filter((v) => v && regex.test(v));
        return [...new Set(gameVersions)].sort((a: string, b: string) => b.localeCompare(a, undefined, { numeric: true }));
    } catch (error) {
        console.error("Could not fetch Fabric versions from Modrinth API: ", error);
        return null;
    }
};

const fetchModrinthApi = async (id: string, queryParams: string) => {
    try {
        const response = await fetch(`https://api.modrinth.com/v2/project/${id}/version${queryParams}`, { method: "GET", redirect: "follow" });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Could not fetch Modrinth API for project " + id + ": ", error);
        return null;
    }
};

export default function ModrinthDownloadList({ data }) {
    const { defaultLoader, projects } = data;

    const location = useLocation();
    const history = useHistory();

    const [fabricVersions, setFabricVersions] = useState([]);
    const [selectedVersion, setSelectedVersion] = useState("");
    const [projectsData, setProjectsData] = useState({});
    const [unavailableProjects, setUnavailableProjects] = useState(0);

    /**
     * Change the selected version and update the "version" query param
     */
    const handleVersionChange = (e: any) => {
        e?.preventDefault();
        setSelectedVersion(e.target.value);

        const params = new URLSearchParams(location.search);
        params.set("version", e.target.value);
        history.replace({ search: params.toString() });
    };

    /**
     * On page loaded, get the "version" query param and fetch fabric versions
     */
    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let versionParam = params.get("version");

        if (!versionParam) {
            versionParam = "1.21.11";
            params.set("version", versionParam);
            history.replace({ search: params.toString() });
        }

        setSelectedVersion(versionParam);

        (async () => {
            const versions = await fetchFabricVersions();
            if (versions) {
                setFabricVersions(versions);
            }
        })();
    }, []);

    const loader = !!defaultLoader ? encodeURI(`["${defaultLoader}"]`) : "";
    const version = !!selectedVersion ? encodeURI(`["${selectedVersion}"]`) : "";

    /**
     * Fetch Modrinth API for each project
     */
    useEffect(() => {
        let cancelled = false;
        setProjectsData({});
        setUnavailableProjects(0);

        if (projects.length > 0 && selectedVersion) {
            projects.forEach(async (project: any) => {
                const result = await fetchModrinthApi(project.id, `?loaders=${loader}&game_versions=${version}`); // Could also add &version_type=release

                if (cancelled) return;

                if (result && result.length > 0 && result[0].files?.length > 0) {
                    setProjectsData((prev) => ({
                        ...prev,
                        [project.id]: {
                            url: result[0].files[0].url,
                            filename: result[0].files[0].filename,
                            important: project.important === true
                        },
                    }));
                } else {
                    setUnavailableProjects((prev) => prev + 1);
                }
            });
        }
        return () => { cancelled = true }; // Cancel fetch if selectedVersion has changed
    }, [projects, selectedVersion]);

    const availableProjects = projects.filter((p: any) => projectsData[p.id]);

    return (
        <>
            <div style={{
                display: "flex",
                alignItems: "center",
                borderRadius: "8px",
                marginBottom: "1rem",
                border: "1px solid var(--ifm-toc-border-color)",
                width: "min-content",
            }}>
                <p style={{
                    marginBottom: "0",
                    whiteSpace: "nowrap",
                    padding: "0.4rem 1rem",
                    borderRadius: "8px 0 0 8px",
                    backgroundColor: "var(--ifm-background-color)"
                }}>Sélectionnez votre version Minecraft :</p>
                <select
                    value={selectedVersion}
                    onChange={handleVersionChange}
                    style={{
                        width: "150px",
                        padding: "0.5rem",
                        fontFamily: "var(--ifm-font-family-base)",
                        fontSize: "var(--ifm-font-size-base)",
                        borderRadius: "0 8px 8px 0",
                        border: "none",
                        backgroundColor: "var(--ifm-pre-background)"
                    }}>
                    {fabricVersions.map((version) => (
                        <option key={version} value={version} style={{ backgroundColor: "var(--ifm-background-color)" }}>
                            {version}
                        </option>
                    ))}
                </select>
            </div>
            <ul>
                {
                    !!selectedVersion ? (
                        availableProjects.length > 0 ? (
                            <>
                                {availableProjects.map(({ id, name, description }) => (
                                    <li key={id}>
                                        <DownloadButton data={{ url: projectsData[id]?.url, important: projectsData[id]?.important }} />
                                        {" "}
                                        <a href={projectsData[id]?.url}
                                            target="_self"
                                            style={{ fontWeight: projectsData[id]?.important ? "bold" : "" }}
                                            title={`Télécharger ${projectsData[id]?.filename}`}
                                            aria-label={`Télécharger ${projectsData[id]?.filename}`}>
                                            {name}
                                        </a>
                                        {" "}
                                        <a href={`https://modrinth.com/project/${id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ fontWeight: projectsData[id]?.important ? "bold" : "" }}
                                            title={`Voir ${name} sur Modrinth`}
                                            aria-label={`Voir ${name} sur Modrinth`}>
                                            <IconExternalLink />
                                        </a>
                                        {" - "}
                                        {description}
                                    </li>
                                ))}
                                {unavailableProjects > 0 && (
                                    <li style={{ fontStyle: "italic" }}>
                                        {unavailableProjects > 1
                                            ? `${unavailableProjects} mods sont indisponibles en ${selectedVersion}`
                                            : `${unavailableProjects} mod est indisponible en ${selectedVersion}`}
                                    </li>
                                )}
                            </>
                        ) : (
                            <li>⚠️ Aucun mod n'est disponible en {selectedVersion}</li>
                        )
                    ) : ""}
            </ul>
        </>
    );
}