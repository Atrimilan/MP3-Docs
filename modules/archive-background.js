// Custom module that forces the definition of a different custom background for specified pages

export function onRouteDidUpdate({ location, previousLocation }) {
    if (location.pathname !== previousLocation?.pathname) {

        // Pages that need a different background
        const pageConfigurations = {
            '/creatif/': 'creative-page',
            '/archives/': 'archive-page',
            '/fallen_kingdom/': 'archive-page',
            '/melodia/': 'archive-page'
        };

        const mainWrapper = document.querySelector('.main-wrapper');

        Object.values(pageConfigurations)
            .forEach(className => mainWrapper.classList.remove(className));

        const currentPageConfig = Object.entries(pageConfigurations)
            .find(([page]) => location.pathname.includes(page));

        if (currentPageConfig) {
            mainWrapper.classList.add(currentPageConfig[1]);
        }
        // Else, no class is added, and the default background is used
    }
}