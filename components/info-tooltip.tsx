import React, { useState } from "react";

export const InfoTooltip = ({ text }) => {
    const [hover, setHover] = useState(false);

    return (
        <span style={{ position: "relative", cursor: "help", fontSize: "0.6rem", paddingLeft: "0.3rem", fontFamily: 'sans-serif' }}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
        >
            (?)
            {hover && (
                <div style={{
                    position: "absolute",
                    bottom: "110%",
                    left: "50%",
                    transform: "translateX(-50%)",
                    backgroundColor: "var(--ifm-navbar-background-color)",
                    color: "white",
                    padding: "5px 8px",
                    borderRadius: "4px",
                    width: "300px",
                    whiteSpace: "pre-wrap",
                    zIndex: 1000,
                    fontSize: "0.8rem"
                }}>
                    {text}
                </div>
            )}
        </span>
    );
};