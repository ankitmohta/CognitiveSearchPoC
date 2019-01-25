/**
 * 
 * @param number total number of pages in the document
 */
export const documentsStyle = (totalPages: number): React.CSSProperties => ({
    height: totalPages > 1 ? 'calc(100% - 50px)' : '100%',
    overflowY: 'auto',
    position: 'relative',
    top: totalPages > 1 ? 50 : 0,
})
export const pagenationStyle: React.CSSProperties = {
    borderTop: '2px solid #88888888',
    display: 'flex',
    height: 40,
    justifyContent: 'center',
    margin: '0 auto',
    width: '100%'
}

/**
 * 
 * @param theme the react-uwp theme
 * @param width width of the pagenation bar
 */
export const pagenationBarStyle = (theme: any, width?: string | number): React.CSSProperties => ({
    ...theme.typographyStyles.Header,
    backgroundColor: '#222',
    height: 50,
    position: 'fixed',
    top: 48,
    transition: 'width .25s ease-in-out',
    width,
    zIndex: 90001,
})