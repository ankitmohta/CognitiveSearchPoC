import * as PropTypes from 'prop-types';
import * as React from 'react';
import CheckBox from 'react-uwp/CheckBox';
import IconButton from 'react-uwp/IconButton';
import NavigationView from 'react-uwp/NavigationView';
import { IDocument, IPage } from '../../types/documents';
import { IGraph } from '../../types/graph';
import { IInfoboxWithPushPin } from '../../types/pins';
import Documents from '../Documents';
import ForceDirectedGraph from '../ForceDirectedGraph';
import GraphIcon from '../GraphIcon';
import Main from '../Main';
import Map from '../Map';
import SearchBox from '../SearchBox';
import Title from '../Title';
import * as Style from './style';

export interface IChecked<T> {
    checked: boolean,
    value: T,
}

export interface IClippedDrawerProps extends React.HTMLAttributes<HTMLDivElement>{
    children?: object,
    display: string,
    docs: IDocument[],
    graph: IGraph,
    onSearchClick: (query: string) => void,
    onViewClick: (display: string) => void,
    pins: IInfoboxWithPushPin[],
    query: string,
}

interface IClippedDrawerState {
    open: boolean,
    search: string,
    tags: Array<IChecked<string>>,
}

const docsToUniqueTags = (docs: IDocument[]): Array<IChecked<string>> => {
    const o: object = {};
    docs.reduce((a: IPage[], i: IDocument) => [...a, ...i.pages], []).reduce((a: string[], i: IPage) => [...a, ...i.tags], []).forEach((t: string) => o[t] = 0);
    return Object.keys(o).map(t => ({checked: false, value: t}));
}

class ClippedDrawer extends React.Component<IClippedDrawerProps,IClippedDrawerState> {
    public static contextTypes = {theme: PropTypes.object};

    constructor(props: IClippedDrawerProps) {
        super(props);
        this.state = {
            open: true,
            search: props.query,
            tags: docsToUniqueTags(props.docs),
        }
    }

    public componentWillReceiveProps(nextProps: IClippedDrawerProps) {
        if(JSON.stringify(this.props.docs) !== JSON.stringify(nextProps.docs)) {
            const tags = docsToUniqueTags(nextProps.docs);
            this.setState({tags});
        }
    }

    public onNavClick = (e: any) => {
        const open = !this.state.open;
        this.setState({open});
    }

    public onSearchChange = (e: any) => {
        this.setState({search: e.target.value});
    }

    public onCheckBoxClick = (id: number) => (e: any) => {
        const tags = [...this.state.tags];
        tags[id].checked = !tags[id].checked;
        this.setState({tags})
    }

    public render() {
    const { display, docs, graph, onViewClick, pins } = this.props;
    const mainWidth: {[key: string]: number | string} = {
        close: '100%',
        open: window.innerWidth > 500 ? '67%' : '0%',
    }
    const navWidth: {[key: string]: number | string} = {
        close: 0,
        open: window.innerWidth > 500 ? '33%' : '100%',
    }
    const { theme } = this.context;
    const documentsStyle: React.CSSProperties = Style.documentsStyle(this.state.open);
    const nav: React.CSSProperties = Style.nav;
    const checkBoxContainerStyle: React.CSSProperties = Style.checkBoxContainerStyle;
    const hamburg: React.CSSProperties = Style.hamburg(this.state.open);
    const titleStyle: React.CSSProperties = Style.titleStyle(this.state.open, navWidth, mainWidth);

    const topIcon = <IconButton onClick={this.onNavClick}>GlobalNavButton</IconButton>
    const tags = (this.state.open ? this.state.tags.map((t,i) => 
    <div key={t.value} style={checkBoxContainerStyle}>
    <CheckBox
        id={`${t}--${i}`}
        defaultChecked={t.checked}
        onClick={this.onCheckBoxClick(i)}
        label={t.value}
        />
    </div>) : []);
    const navTopNodes = [
        <SearchBox
          key={1}
          value={this.state.search}
          onChange={this.onSearchChange}
          placeholder={'Search'}
          searchAction={this.props.onSearchClick}
        />,
        ...tags
    ]
    const onClick = (d: string) => (e: any) => onViewClick(d);
    const visibleDocs: IDocument[] = this.state.tags.reduce((a, i) => a || i.checked, false) ?
    docs.filter(doc => {
        const docTags = doc.pages.reduce((a, i) => [...a, ...i.tags], []);
        return this.state.tags.reduce((a, i) => a || (i.checked && docTags.indexOf(i.value) !== -1), false)
    }
    ) : docs;
    const onWidthResize = (width: number): number => width*(this.state.open ? Number((mainWidth.open as string).slice(0,-1))/100 : 1);
    const onHeightResize = (height: number): number => height-92;
    return (
        <>
            <NavigationView
            isControlled={true}
            displayMode={'minimal'}
            topIcon={topIcon}
            autoResize={false}
            defaultExpanded={true}
            expandedWidth={this.state.open ? navWidth.open : navWidth.close}
            style={{...nav, background: theme.acrylicTexture40.background}}
            pageTitle={''}
            focusNavigationNodeIndex={2}
            navigationTopNodes={navTopNodes}
            >
            <IconButton onClick={this.onNavClick} style={hamburg}>
                GlobalNavButton
            </IconButton>
            <Title style={titleStyle}/>
            {
                (window.innerWidth > 500 || !this.state.open && window.innerWidth <= 500) &&
                <Main
                display={display}
                onClick={onClick}
                open={this.state.open}
                views={[
                    {component: <Documents key={'Results'} docs={visibleDocs} pageSize={10} pagePadding={window.innerWidth > 320 ? 2 : 1} pagenationWidth={this.state.open ? mainWidth.open : mainWidth.close} style={documentsStyle}/>, display: 'Results', icon: 'List'},
                    {component: <Map key={'Maps'} infoboxesWithPushPins={pins}/>, display: 'Maps', icon: 'MapPinLegacy'},
                    {component: <ForceDirectedGraph key={'Graph'} graph={graph} width={onWidthResize} height={onHeightResize}/>, display: 'Graph', icon: <GraphIcon/>},
                ]}
                />
            }   
            </NavigationView>
            </>
  );
}}

export default ClippedDrawer;