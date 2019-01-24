export const buttonStyle: React.CSSProperties = {
    background: 'none',
    height: '100%',
    margin: '0',
    width: '36px',
}

/**
 * 
 * @param open if true width is 67% otherwise width is 100%
 */
export const mainContainer = (open: boolean): React.CSSProperties => ({
    height: 'calc(100% - 88px)',
    overflowY: 'auto',
    position: 'absolute',
    right: 0,
    top: 48,
    transition: "width .25s ease-in-out",
    width: open ? '67%' : '100%',
})
export const tools: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    top: 0,
}