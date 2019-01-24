import * as PropTypes from 'prop-types';
import * as React from 'react';
import { IconButton } from 'react-uwp';
import { IDocument } from '../../types/documents';
import DocumentPreview from '../DocumentPreview';
import * as Style from './style';

export interface IDocumentsProps extends React.HTMLAttributes<HTMLDivElement> {
    docs: IDocument[],
    pageSize: number,
    pagenationWidth: string | number,
    pagePadding: number,
}

export interface IDocumentsState {
    currentPage: number,
}

const pagenator = (currentPage: number, padding: number, totalPages: number) => {
    if (2 * padding + 1 >= totalPages) {
        return Array(totalPages).fill(0).map((p, i) => i + 1);
    } else {
        const min = Math.max(1, currentPage + padding + 1 < totalPages ? currentPage - padding + 1 : totalPages - (2 * padding));
        return Array(2 * padding + 1).fill(min).map((p, i) => p + i);
    }
}

export default class Documents extends React.Component<IDocumentsProps, IDocumentsState> {
    public static contextTypes = { theme: PropTypes.object };
    constructor(props: IDocumentsProps) {
        super(props);
        this.state = {
            currentPage: 0,
        }
    }

    public componentWillReceiveProps(nextProps: IDocumentsProps) {
        if (this.props.docs.length > nextProps.docs.length) {
            this.setState({ currentPage: 0 });
        }
    }

    public setCurrentPage = (currentPage: number) => () => {
        this.setState({ currentPage })
    }
    public render() {
        const { theme } = this.context;
        const { docs, pagenationWidth, pagePadding, pageSize } = this.props;
        const totalPages: number = Math.ceil(docs.length / pageSize);
        const documentsStyle: React.CSSProperties = Style.documentsStyle(totalPages);
        const pagenationStyle: React.CSSProperties = Style.pagenationStyle;
        const pagenationBarStyle: React.CSSProperties = Style.pagenationBarStyle(theme, pagenationWidth);
        const pageIndices: number[] = pagenator(this.state.currentPage, pagePadding, totalPages);
        return (
            <>
                {
                    totalPages > 1 ?
                        <div style={pagenationBarStyle}>
                            <div style={pagenationStyle}>
                                <IconButton disabled={this.state.currentPage <= 0} onClick={this.setCurrentPage(this.state.currentPage > 0 ? this.state.currentPage - 1 : this.state.currentPage)}>ChevronLeft</IconButton>
                                {pageIndices.map(index => <IconButton key={index} onClick={this.setCurrentPage(index - 1)} disabled={(index - 1) === this.state.currentPage}>{index}</IconButton>)}
                                <IconButton disabled={(this.state.currentPage + 1) >= totalPages} onClick={this.setCurrentPage((this.state.currentPage + 1) < totalPages ? this.state.currentPage + 1 : this.state.currentPage)}>ChevronRight</IconButton>
                            </div>
                        </div>
                        : undefined
                }
                <div style={documentsStyle}>
                    {
                        docs.slice(this.state.currentPage * pageSize, (this.state.currentPage + 1) * pageSize).map(doc => <DocumentPreview key={doc.title} style={this.props.style} doc={doc} />)
                    }
                </div>
            </>
        );
    }
}
