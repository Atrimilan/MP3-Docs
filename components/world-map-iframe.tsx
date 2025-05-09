import { useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import IconExternalLink from '@theme/Icon/ExternalLink';

export const WorldMapIframe = ({ data }) => {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoad = () => {
        setIsLoading(false);
    };

    return (
        <div className="iframe-container" style={{ position: 'relative' }}>
            {isLoading && (
                <div className="loading-overlay">
                    <Blocks height="35" width="35" visible={true} /> Chargement...
                </div>
            )}
            <iframe
                onLoad={handleLoad} // Display the loader until the iframe is fully loaded
                className='world-map-iframe'
                src={data.url}
                title="World Map"
                style={{
                    width: data.width ?? '100%',
                    height: data.height ?? ''
                }}
            />
            {!isLoading && (
                // Custom button over the iframe to open the map in a new tab
                <div className="new-tab-link">
                    <a href={data.url} target="_blank">
                        <span>Ouvrir dans un nouvel onglet</span><IconExternalLink />
                    </a>
                </div>
            )}
        </div>
    );
};