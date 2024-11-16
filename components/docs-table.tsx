// https://mui.com/material-ui/material-icons/
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import { useState } from 'react';

export const DocsTable = ({ data }) => {

    const [searchTerm, setSearchTerm] = useState('');

    const handleClearSearch = () => {
        setSearchTerm('');
    };

    const filteredData = data.filter(row =>
        row[0].toLowerCase().includes(searchTerm.toLowerCase()) ||
        row[2].toLowerCase().includes(searchTerm.toLowerCase()) ||
        row[3].toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            {data.length > 1 ?
                <div className='search-bar'>
                    <input
                        type="text"
                        placeholder={"Rechercher parmi " + filteredData.length + " mods..."}
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
                :
                <br />
            }
            <table className='docs-table'>
                <thead>
                    <tr>
                        <th className='docs-table-name'>Mods</th>
                        <th className='docs-table-wiki'>Lien vers le wiki</th>
                        <th className='docs-table-version'>Version</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData.map((row, index) => (
                        <tr key={index}>
                            <td>
                                <a href={row[1]} target='_blank' className={'link' + (row[5] ? ' gold-gradient-effect' : '')}>
                                    {(row[5] ? "⭐ " : "") + row[0]}
                                </a>
                            </td>
                            <td className='center-text'>
                                <a href={row[4]} target='_blank' className={'link wiki' + (row[5] ? ' gold-gradient-effect' : '')}>
                                    {row[3]} {!!row[3] && <SearchRoundedIcon className='search-icon' />} 
                                </a>
                            </td>
                            <td className='center-text'>{row[2]}</td>
                            {/* <td>
                                <a href={"https://modrinth.com/mods?q=" + row[0]} target='_blank'>
                                    Modrinth
                                </a>
                            </td>
                            <td>
                                <a href={"https://www.curseforge.com/minecraft/mc-mods/search?search=" + row[0]} target='_blank'>
                                    Curseforge
                                </a>
                            </td> */}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};