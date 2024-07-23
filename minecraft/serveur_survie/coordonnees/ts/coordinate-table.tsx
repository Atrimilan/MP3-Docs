
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded'; // https://mui.com/material-ui/material-icons/
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export const CoordinatesTable = ({ data }) => {

    const [isPressed, setIsPressed] = useState({});

    const handleMouseDown = (index) => {
        setIsPressed({ ...isPressed, [index]: true });
    };

    const handleMouseUp = (index) => {
        setIsPressed({ ...isPressed, [index]: false });
    };

    const handleMouseLeave = (index) => {
        setIsPressed({ ...isPressed, [index]: false });
    };

    return (
        <table className='coordinates-table'>
            <thead>
                <tr>
                    <th className='coordinates-table-description'>Description</th>
                    <th className='coordinates-table-coordinates'>Coordonnées</th>
                    <th>Copier</th>
                </tr>
            </thead>
            <tbody>
                {data.map((row, index) => (
                    <tr key={index}>
                        <td>{row[0]}</td>
                        <td className='center-text'>{row[1]}</td>
                        <td className='center-icon'>
                            <CopyToClipboard text={row[1]}>
                                <ContentCopyRoundedIcon
                                    className='copy-icon'
                                    onMouseDown={() => handleMouseDown(index)}
                                    onMouseUp={() => handleMouseUp(index)}
                                    onMouseLeave={() => handleMouseLeave(index)}
                                    style={{
                                        cursor: 'pointer',
                                        opacity: isPressed[index] ? 0.5 : 1,
                                    }}
                                />
                            </CopyToClipboard>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};