import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

export const DownloadButton = ({ data }) => {
    return (
        <a href={data.url} download className={data.important ? "important-download-button" : "download-button"}>
            <DownloadRoundedIcon className="download-icon" />
        </a>
    );
};