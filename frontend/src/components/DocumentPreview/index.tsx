import * as PropTypes from 'prop-types';
import * as React from 'react';
import IconButton from 'react-uwp/IconButton';
import { IDocument, IPage } from '../../types/documents';
import Title from '../Title';
import * as Style from './style';

export interface IDocumentPreviewProps extends React.HTMLAttributes<HTMLDivElement> {
    doc: IDocument,
}

interface IDocumentPreviewState {
    currentSource: number,
    modalOpen: boolean,
    showTags: boolean,
}

export default class DocumentPreview extends React.Component<IDocumentPreviewProps, IDocumentPreviewState> {
    public static contextTypes = { theme: PropTypes.object };
    constructor(props: IDocumentPreviewProps) {
        super(props);
        this.state = {
            currentSource: 0,
            modalOpen: false,
            showTags: false,
        }
    }

    public toggleModal = () => {
        const modalOpen = !this.state.modalOpen;
        this.setState({ modalOpen })
    }
    public toggleTags = () => {
        const showTags = !this.state.showTags;
        this.setState({ showTags });
    }
    public setCurrentSource = (currentSource: number) => () => {
        this.setState({ currentSource })
    }
    public render() {
        const { theme } = this.context;
        const modalResponsive: boolean = window.innerHeight / window.innerWidth > (3/4);
        const previewStyles: React.CSSProperties = Style.previewStyles(theme, this.state.showTags, this.props.style);
        const imgContainer: React.CSSProperties = Style.imgContainer(previewStyles.height);
        const tagContainer: React.CSSProperties = Style.tagContainer(theme, previewStyles, this.state.showTags);
        const tagStyles: React.CSSProperties = Style.tagStyles(this.state.showTags);
        const modalStyle: React.CSSProperties = Style.modalStyle(this.state.modalOpen);
        const modalDocStyle: React.CSSProperties = Style.modalDocStyle(modalResponsive);
        const modalTagStyle: React.CSSProperties = Style.modalTagStyle(modalResponsive);
        const { pages, title } = this.props.doc;
        const tags: string[] = pages.reduce((a: string[], i: IPage) => [...a, ...i.tags], [])
                                .filter((t, i, arr) => arr.indexOf(t) === arr.lastIndexOf(t));
        const sources: string[] = pages.reduce((a: string[], i: IPage) => [...a, i.source], []);
        return (
            <>
                <div style={previewStyles}>
                    <div style={imgContainer}>
                        <img src={pages[0].source} alt={title} style={Style.imgStyles} onClick={this.toggleModal} />
                    </div>
                    <span>
                        &nbsp;&nbsp;&nbsp;&nbsp;{title}
                    </span>
                    <IconButton style={Style.float('right')} onClick={this.toggleTags}>{this.state.showTags ? 'ChevronUp' : 'ChevronDown'}</IconButton>
                </div>
                <div style={tagContainer}>
                    {tags.map(t => <span key={t} style={tagStyles}>{t}</span>)}
                </div>
                <div style={modalStyle}>
                    <div style={Style.modalHeaderStyle}>
                        <Title style={Style.titleStyle} />
                        <IconButton style={Style.modalCancelStyle} onClick={this.toggleModal}>Cancel</IconButton>
                    </div>
                    <div style={modalDocStyle}>
                        <img src={sources[this.state.currentSource]} alt={title} style={{ width: '100%' }} />
                        <div style={{...Style.modalDocsControlStyle, ...theme.typographyStyles.subTitle}}>
                            <IconButton onClick={this.setCurrentSource((this.props.doc.pages.length + this.state.currentSource - 1) % this.props.doc.pages.length)} style={Style.float('left')}>ChevronLeft</IconButton>
                            <span>{`${this.state.currentSource+1}/${sources.length}`}</span>
                            <IconButton onClick={this.setCurrentSource((this.state.currentSource + 1) % this.props.doc.pages.length)} style={Style.float('right')}>ChevronRight</IconButton>
                        </div>
                    </div>
                    <div style={modalTagStyle}>
                        {
                            this.props.doc.pages[this.state.currentSource].tags.map((tag, i) => 
                                <span key={`${tag}_${i}`} style={theme.typographyStyles.base}>{tag} </span>
                            )
                        }
                    </div>
                </div>
            </>
        );
    }
}
