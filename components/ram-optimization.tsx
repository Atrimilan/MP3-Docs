import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import { InfoTooltip } from './info-tooltip';

export const MinecraftJvmFlags = () => {
    const [ram, setRam] = useState(4);
    const [jvm21, setJvm21] = useState(true);
    const [alwaysPreTouch, setAlwaysPreTouch] = useState(false);
    const [isCopyPressed, setIsCopyPressed] = useState(false);

    const ramMB = Math.round(ram * 1024); // Convert GB to MB

    const ramSliderTooltip = "Il est conseillé d'allouer au moins 4 Go de mémoire vive à Minecraft.";
    const jvm21Tooltip = "⚠️ Désactivez cette option si vous utilisez une version de Java antérieure à 21.";
    const alwaysPreTouchTooltip = "Cette option peut être légèrement bénéfique pour les modpacks lourds. ⚠️ Elle est à éviter si vous disposez de peu de mémoire vive.";

    // Based on https://noflags.sh/
    const baseFlags = [
        `-Xms${ramMB}M`,
        `-Xmx${ramMB}M`,
        ...(jvm21 ? ["-XX:+UseZGC", "-XX:+ZGenerational"] : ["-XX:+UseShenandoahGC"]),
        alwaysPreTouch ? "-XX:+AlwaysPreTouch" : null
    ].filter(Boolean); // Remove any null values

    const command = baseFlags.join(" ").replace(/-/g, '\u2011'); // Join flags and use non-breaking hyphen

    return (
        <div style={{ borderRadius: "8px", border: "1px solid var(--ifm-toc-border-color)", marginBottom: "1rem" }}>

            {/* Header with inputs */}
            <div style={{ padding: "0.5rem", background: "var(--ifm-background-color)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", display: "flex" }}>
                <div style={{ display: "flex", alignItems: "center", width: "80%", gap: "2rem" }}>
                    {/* RAM slider */}
                    <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
                        <label title="Ceci est une petite description"
                            style={{ display: "flex", alignItems: "center", gap: "0.3rem", accentColor: "var(--ifm-color-primary)", flex: 1 }}>
                            <input type="range" min="2" max="10" step="0.5" value={ram} onChange={(e) => setRam(parseFloat(e.target.value))} style={{ flex: 1 }} />
                            {ram} Go
                        </label>
                        <InfoTooltip text={ramSliderTooltip} />
                    </div>

                    {/* JVM >= 21 toggle */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.3rem", accentColor: "var(--ifm-color-primary)" }}>
                            <input type="checkbox" checked={jvm21} onChange={(e) => setJvm21(e.target.checked)} />
                            Java ≥ 21
                        </label>
                        <InfoTooltip text={jvm21Tooltip} />
                    </div>

                    {/* Always PreTouch toggle */}
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <label style={{ display: "flex", alignItems: "center", gap: "0.3rem", accentColor: "var(--ifm-color-primary)" }}>
                            <input type="checkbox" checked={alwaysPreTouch} onChange={(e) => setAlwaysPreTouch(e.target.checked)} />
                            RAM dédiée
                        </label>
                        <InfoTooltip text={alwaysPreTouchTooltip} />
                    </div>
                </div>

                {/* Copy button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", width: "20%" }}>
                    <CopyToClipboard text={command} tooltip="Copier la commande">
                        <ContentCopyRoundedIcon
                            className='copy-icon'
                            onMouseDown={() => setIsCopyPressed(true)}
                            onMouseUp={() => setIsCopyPressed(false)}
                            onMouseLeave={() => setIsCopyPressed(false)}
                            style={{ cursor: 'pointer', opacity: isCopyPressed ? 0.5 : 1 }}
                        />
                    </CopyToClipboard>
                </div>
            </div>

            {/* Body with generated JVM arguments */}
            <pre style={{
                whiteSpace: "pre-wrap", wordBreak: "break-word", lineHeight: "1.7", marginBottom: "0",
                borderTopLeftRadius: "0", borderTopRightRadius: "0"
            }}>
                {command}
            </pre>
        </div>
    );
}
