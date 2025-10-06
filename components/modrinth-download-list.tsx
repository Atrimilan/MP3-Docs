import { useEffect, useState } from "react";
import { useHistory, useLocation } from "@docusaurus/router";
import DownloadButton from "./download-button";

const fetchModrinthApi = async (id: string, queryParams: string) => {
    try {
        const response = await fetch(`https://api.modrinth.com/v2/project/${id}/version${queryParams}`, { method: "GET", redirect: "follow" });
        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Could not fetch modrinth API for project " + id + ": ", error);
        return null;
    }
};

export default function ModrinthDownloadList({ data }) {
    const { defaultLoader, projects } = data;

    const location = useLocation();
    const history = useHistory();

    const [versionInputValue, setVersionInputValue] = useState("");
    const [selectedVersion, setSelectedVersion] = useState("");
    const [projectsData, setProjectsData] = useState({});
    const [unavailableProjects, setUnavailableProjects] = useState(0);

    const handleVersionSubmit = (e) => {
        e?.preventDefault();
        setSelectedVersion(versionInputValue);

        const params = new URLSearchParams(location.search);
        params.set("version", versionInputValue);
        history.replace({ search: params.toString() });
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        let versionParam = params.get("version");

        if (!versionParam) {
            versionParam = "1.21.8";
            params.set("version", versionParam);
            history.replace({ search: params.toString() });
        }

        setSelectedVersion(versionParam);
        setVersionInputValue(versionParam);
    }, []);

    const loader = !!defaultLoader ? encodeURI(`["${defaultLoader}"]`) : "";
    const version = !!selectedVersion ? encodeURI(`["${selectedVersion}"]`) : "";
    const versionType = "release";

    useEffect(() => {
        setProjectsData({});
        setUnavailableProjects(0);

        if (projects.length > 0 && selectedVersion) {
            projects.forEach(async (project) => {
                const result = await fetchModrinthApi(project.id, `?loaders=${loader}&game_versions=${version}&version_type=${versionType}`);
                if (result && result.length > 0 && result[0].files?.length > 0) {
                    setProjectsData((prev) => ({
                        ...prev,
                        [project.id]: {
                            url: result[0].files[0].url,
                            important: project.important === true
                        },
                    }));
                } else {
                    setUnavailableProjects((unavailableProjects) => ++unavailableProjects);
                }
            });
        }
    }, [projects, selectedVersion]);

    const availableProjects = projects.filter((p) => projectsData[p.id]);

    return (
        <>
            <form onSubmit={handleVersionSubmit}>
                <input
                    type="text"
                    id="version"
                    name="version"
                    placeholder="Saisissez une version de Minecraft"
                    value={versionInputValue}
                    onChange={(e) => setVersionInputValue(e.target.value)}
                    pattern="^\d+\.\d+(\.\d+)?$"
                    required
                    title="Saisissez une version de Minecraft valide, par exemple : 1.21.8"
                    style={{
                        width: "30%",
                        marginBottom: "1rem",
                        marginRight: "1rem",
                        padding: "0.7rem 1rem",
                        backgroundColor: "var(--ifm-pre-background)",
                        border: "1px solid var(--ifm-toc-border-color)",
                        fontFamily: "var(--ifm-font-family-base)",
                        fontSize: "var(--ifm-font-size-base)",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                    }}
                />
                <button
                    type="submit"
                    style={{
                        marginBottom: "1rem",
                        padding: "0.7rem 1rem",
                        backgroundColor: "var(--ifm-background-color)",
                        border: "1px solid var(--ifm-toc-border-color)",
                        fontFamily: "var(--ifm-font-family-base)",
                        fontSize: "var(--ifm-font-size-base)",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        cursor: "pointer",
                    }}
                >Rechercher</button>
            </form>
            <ul>
                {
                    !!selectedVersion ? (
                        availableProjects.length > 0 ? (
                            <>
                                {availableProjects.map(({ id, name, description }) => (
                                    <li key={id}>
                                        <DownloadButton data={{ url: projectsData[id]?.url, important: projectsData[id]?.important }} />
                                        {" "}
                                        <a href={`https://modrinth.com/project/${id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{ fontWeight: projectsData[id]?.important ? "bold" : "" }} >
                                            {name}
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