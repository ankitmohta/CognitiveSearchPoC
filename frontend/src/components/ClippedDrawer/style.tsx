/**
 * 
 * @param open if true width is 95% otherwise width is 100%
 */
export const documentsStyle = (open: boolean): React.CSSProperties => ({
    marginLeft: 'auto',
    marginRight: 'auto',
    width: open ? '95%' : '100%',
})

export const nav: React.CSSProperties = {
    height: '100vh',
    width: '100%',
}

/**
 * 
 * @param theme the react-uwp theme
 */
export const searchBarStyle = (theme: any): React.CSSProperties => ({
    background: theme.acrylicTexture40.background,
    color: '#EEEEEE88',
    display: 'block',
    margin: '0 auto',
    width: '90%'
})

export const checkBoxContainerStyle: React.CSSProperties = {
    margin: '0 auto',
    width: '80%'
}

/**
 * 
 * @param open if true hamburger icon is hidden otherwise hamburger icon is visible
 */
export const hamburg = (open: boolean): React.CSSProperties => ({
    left: 0,
    position: 'absolute',
    top: 0,
    visibility: open ? 'hidden' : 'visible',
})

/**
 * 
 * @param open if open uses navWidthOpen and mainWidthOpen values otherwise uses navWidthClose and mainWidthClose values
 * @param navWidthOpen position from left when open or closed
 * @param mainWidthOpen width when open or closed
 */
export const titleStyle = (open: boolean, navWidth: {[key: string]: string | number}, mainWidth: {[key: string]: string | number}): React.CSSProperties => ({
    borderTop: '2px solid #88888888',
    bottom: 4,
    height: 36,
    left: open ? navWidth.open : navWidth.close,
    position: 'absolute',
    transition: "left .25s ease-in-out, width .25s ease-in-out",
    width: open ? mainWidth.open : mainWidth.close,
})

