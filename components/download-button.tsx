import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded';

export default function DownloadButton({ data }) {
    return (
        <a href={data.url} target={data.targetBlank ? '_blank' : '_self'} rel="noopener noreferrer" download className={data.important ? "important-download-button" : "download-button"}>
            <DownloadRoundedIcon className="download-icon" />
        </a>
    );
};