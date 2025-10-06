
import ContentCopyRoundedIcon from '@mui/icons-material/ContentCopyRounded';
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
// https://mui.com/material-ui/material-icons/
import { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

export default function CoordinatesTable({ data }) {

    const [searchTerm, setSearchTerm] = useState('');
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

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredData = data.filter(row =>
        row[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
        row[1].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <div className='search-bar'>
                <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button
                    onClick={handleClearSearch}
                    style={{ cursor: 'pointer', opacity: searchTerm ? 1 : 0.5 }}
                >
                    <ClearRoundedIcon />
                </button>
            </div>
            <table className='coordinates-table'>
                <thead>
                    <tr>
                        <th className='coordinates-table-description'>Description</th>
                        <th className='coordinates-table-coordinates'>Coordonnées</th>
                        <th>Copier</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
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
        </div>
    );
};