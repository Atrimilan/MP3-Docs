// Custom module that forces the definition of a different custom background for archive pages

export function onRouteDidUpdate({ location, previousLocation }) {
    if (location.pathname !== previousLocation?.pathname) {

        // Not "/archives/" as it may be a redirection page
        const archivePages = ['/archives/', '/fallen_kingdom/', '/creatif/'];

        if (archivePages.some(page => location.pathname.includes(page))) {
            document.querySelector('.main-wrapper').classList.add('archive-page');
        } else {
            document.querySelector('.main-wrapper').classList.remove('archive-page');
        }
    }
}