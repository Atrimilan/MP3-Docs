import React, { useState } from "react";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import InfoTooltip from './info-tooltip';

export const MINECRAFT_JVM_PROFILES = {
    FROM_26_1: {
        id: "from-26.1",
        label: "Minecraft ≥ 26.1",
        flags: "-XX:+UseZGC -XX:+UseCompactObjectHeaders"
    },
    FROM_1_20_5_TO_1_21_11: {
        id: "from-1.20.5-to-1.21.11",
        label: "Minecraft 1.20.5 - 1.21.11",
        flags: "-XX:+UseZGC -XX:+ZGenerational"
    },
    TO_1_20_4: {
        id: "to-1.20.4",
        label: "Minecraft ≤ 1.20.4",
        flags: "-XX:+UseShenandoahGC"
    }
} as const;

export type MinecraftJvmProfileId = typeof MINECRAFT_JVM_PROFILES[keyof typeof MINECRAFT_JVM_PROFILES]["id"];

export default function MinecraftJvmFlags() {
    const [ram, setRam] = useState(4);
    const [selectedProfileId, setSelectedProfileId] = useState<MinecraftJvmProfileId>(MINECRAFT_JVM_PROFILES.FROM_1_20_5_TO_1_21_11.id);
    const [alwaysPreTouch, setAlwaysPreTouch] = useState(false);
    const [isCopyPressed, setIsCopyPressed] = useState(false);

    const ramMB = Math.round(ram * 1024); // Convert GB to MB

    const ramSliderTooltip = "Il est conseillé d'allouer au moins 4 Go de mémoire vive à Minecraft.";
    const minecraftProfileTooltip = "Sélectionnez la tranche de versions Minecraft pour obtenir la configuration JVM associée.";
    const alwaysPreTouchTooltip = "Cette option peut être légèrement bénéfique pour les modpacks lourds.\n⚠️ Cependant, elle est à éviter si vous disposez de peu de mémoire vive, ou si plusieurs autres logiciels sont en cours d'exécution.";

    const selectedProfileConfig = Object.values(MINECRAFT_JVM_PROFILES).find(p => p.id === selectedProfileId)!;

    const isMinecraftJvmProfile = (value: string): value is MinecraftJvmProfileId => {
        return Object.values(MINECRAFT_JVM_PROFILES).some(profile => profile.id === value);
    };

    const handleProfileChange = (value: string) => {
        if (isMinecraftJvmProfile(value)) {
            setSelectedProfileId(value);
        }
    };

    // Based on https://exa.y2k.diy/garden/jvm-args/
    const baseFlags = [
        `-Xms2048M`,
        `-Xmx${ramMB}M`,
        selectedProfileConfig.flags,
        alwaysPreTouch ? "-XX:+AlwaysPreTouch" : null
    ].filter(Boolean); // Remove any null values

    const command = baseFlags.join(" ").replace(/-/g, '\u2011'); // Join flags and use non-breaking hyphen

    return (
        <div style={{ borderRadius: "8px", border: "1px solid var(--ifm-toc-border-color)", marginBottom: "1rem" }}>
            {/* Header */}
            <div style={{ padding: "0.5rem", background: "var(--ifm-background-color)", borderTopLeftRadius: "8px", borderTopRightRadius: "8px", display: "flex" }}>
                {/* Inputs */}
                <div style={{ display: "flex", alignItems: "center", width: "80%", gap: "2rem" }}>
                    {/* RAM slider */}
                    <div style={{ display: "flex", alignItems: "center", flex: 1, accentColor: "var(--ifm-color-primary)" }}>
                        <input type="range" min="2" max="10" step="0.5" value={ram} onChange={(e) => setRam(parseFloat(e.target.value))} style={{ flex: 1 }} />
                        <span style={{ whiteSpace: 'nowrap', width: '4rem', marginLeft: '0.5rem', display: "flex", alignItems: "center" }}>
                            {ram} Go
                            <InfoTooltip text={ramSliderTooltip} />
                        </span>
                    </div>

                    {/* Minecraft version selector */}
                    <div style={{ display: "flex", alignItems: "center", gap: "2rem", accentColor: "var(--ifm-color-primary)" }}>
                        <label style={{ display: "flex", alignItems: "center", accentColor: "var(--ifm-color-primary)" }}>
                            <select
                                value={selectedProfileId}
                                onChange={(e) => handleProfileChange(e.target.value)}
                                style={{
                                    borderRadius: "6px",
                                    border: "1px solid var(--ifm-color-emphasis-300)",
                                    backgroundColor: "var(--ifm-background-surface-color)",
                                    color: "var(--ifm-font-color-base)",
                                    font: "inherit",
                                    padding: "0.3rem 0.6rem"
                                }}
                            >
                                {Object.values(MINECRAFT_JVM_PROFILES).map((profile) => (
                                    <option key={profile.id} value={profile.id}>
                                        {profile.label}
                                    </option>
                                ))}
                            </select>
                            <InfoTooltip text={minecraftProfileTooltip} />
                        </label>

                        {/* Always PreTouch toggle */}
                        <label style={{ display: "flex", alignItems: "center", accentColor: "var(--ifm-color-primary)" }}>
                            <input type="checkbox" checked={alwaysPreTouch} onChange={(e) => setAlwaysPreTouch(e.target.checked)} />
                            <span style={{ whiteSpace: 'nowrap', marginLeft: '0.5rem' }}>RAM dédiée</span>
                            <InfoTooltip text={alwaysPreTouchTooltip} />
                        </label>
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
