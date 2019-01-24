/**
 * 
 * @param theme the react-uwp theme
 * @param tagsShown specify whether tags are shown or not
 * @param style additional styles will override defaults
 */
export const previewStyles = (theme: any, tagsShown: boolean, style?: React.CSSProperties,): React.CSSProperties => ({
    ...theme.typographyStyles.subTitle,
    backgroundColor: '#FFFFFF08',
    height: 200,
    lineHeight: '48px',
    marginBottom: tagsShown ? 0 : 20,
    position: 'static',
    width: '100%',
    ...style,
})
export const imgStyles: React.CSSProperties = {
    cursor: 'pointer',
    position: 'relative',
    top: '-5%',
    width: '100%',
}
/**
 * 
 * @param height the height to be shown of the image
 */
export const imgContainer = (height?: string | number): React.CSSProperties => ({
    height: Number(height) ? height as number - 48 : `calc(${height} - 48px)`,
    overflow: 'hidden',
    width: '100%',
})
/**
 * 
 * @param theme the react-uwp theme
 * @param source the source of the backgroundColor, marginLeft, and marginRight properties; likely to be previewStyles
 * @param tagsShown if true tagContainer will be visible if false tagContainer will be hidden
 */
export const tagContainer = (theme: any, source: React.CSSProperties, tagsShown: boolean ): React.CSSProperties => ({
    ...theme.typographyStyles.caption,
    backgroundColor: source.backgroundColor,
    height: 'auto',
    marginBottom: tagsShown ? 20 : 0,
    marginLeft: source.marginLeft,
    marginRight: source.marginRight,
    maxHeight: tagsShown ? '1024px' : 0,
    overflow: 'hidden',
    padding: tagsShown ? '10px' : 0,
    textAlign: 'center',
    transition: 'max-height .25s ease-in-out',
    width: source.width,
})

/**
 * 
 * @param tagsShown if true tags will be visible if false tags will be hidden
 */
export const tagStyles = (tagsShown: boolean): React.CSSProperties => ({
    backgroundColor: '#EEE',
    borderRadius: '20px',
    color: '#222',
    display: tagsShown ? 'inline-block' : 'none',
    margin: 5,
    padding: '5px 10px',
})

/**
 * 
 * @param modalOpen if true the modal will be displayed otherwise the modal will not be displayed
 */
export const modalStyle = (modalOpen: boolean): React.CSSProperties => ({
    background: '#333333CC',
    display: modalOpen ? 'block' : 'none',
    height: '100%',
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 90001,
})
export const modalHeaderStyle: React.CSSProperties = {
    background: '#222',
    height: 48,
    left: 0,
    position: 'fixed',
    top: 0,
    width: '100%',
}
export const titleStyle: React.CSSProperties = {
    height: 36,
    position: 'absolute',
    top: 6,
    width: '100%',
}

/**
 * 
 * @param modalResponsive if true the modal will display documents on the top otherwise it will display documents to the left
 */
export const modalDocStyle = (modalResponsive: boolean): React.CSSProperties => ({
    backgroundColor: '#222',
    display: 'inline-block',
    height: modalResponsive ? '45%' : '90%',
    margin: modalResponsive ? 'calc(1% + 48px ) 5% calc(1% - 48px ) 5%' : 'calc(1% + 48px ) 2.5% calc(1% - 48px ) 2.5%',
    overflow: 'auto',
    position: 'relative',
    width: modalResponsive ? '90%' : '45%',
    zIndex: 90002,
})

/**
 * 
 * @param modalResponsive if true the modal will display document tags on the bottom otherwise it will display document tags to the right
 */
export const modalTagStyle = (modalResponsive: boolean): React.CSSProperties => ({
    backgroundColor: '#222',
    display: 'inline-block',
    height: modalResponsive ? '45%' : '90%',
    margin: modalResponsive ? 'calc(1% + 48px ) 5% calc(1% - 48px ) 5%' : 'calc(1% + 48px ) 2.5% calc(1% - 48px ) 2.5%',
    position: 'fixed',
    right: 0,
    width: modalResponsive ? '90%' : '45%',
    zIndex: 90002,
    [modalResponsive ? 'bottom' : 'top']: 0,
})

export const float = (direction: 'left' | 'right'): React.CSSProperties => ({
    float: direction
})

export const modalCancelStyle: React.CSSProperties = {
    position: 'absolute',
    right: 0,
    top: 0,
}

export const modalDocsControlStyle: React.CSSProperties = {
    backgroundColor: '#22222288',
    bottom: 0,
    height: 48,
    position: 'sticky',
    textAlign: 'center',
    width: '100%',
}