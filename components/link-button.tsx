export const LinkButton = ({ data }) => {
    return (
        <a href={data.url} target={data.targetBlank ? "_blank" : "_self"}>
            <button className={`link-button ${data.isTransparent ? "bordered" : "filled"}`}>
                {data.label}
            </button>
        </a>
    );
};