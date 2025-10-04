export const LinkButton = ({ data }) => {
    return (
        <a href={data.url} target={data.targetBlank ? "_blank" : "_self"} rel="noopener noreferrer">
            <button className={`link-button ${data.isTransparent ? "bordered" : "filled"}`}>
                {data.label}
            </button>
        </a>
    );
};