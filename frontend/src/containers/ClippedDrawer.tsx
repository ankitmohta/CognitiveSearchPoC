import { connect } from 'react-redux';
import { IDocument } from 'src/types/documents';
import { IGraph } from 'src/types/graph';
import { IInfoboxWithPushPin } from 'src/types/pins';
import { display } from '../actions/display';
import { query } from '../actions/query';
import ClippedDrawer from '../components/ClippedDrawer';
import { IState } from '../types';

interface IOwnProps {
  children?: any,
}

interface IPropsFromState extends IOwnProps {
  display: string,
  docs: IDocument[],
  graph: IGraph,
  pins: IInfoboxWithPushPin[],
  query: string,
}

interface IPropsFromDispatch {
  onSearchClick: typeof query,
  onViewClick: typeof display,
}

const mapStateToProps = (state: IState, ownProps: IOwnProps): IPropsFromState => ({
  display: state.display,
  docs: state.documents,
  graph: state.graph,
  pins: state.pins,
  query: state.query,
  ...ownProps
})

const mapDispatchToProps: IPropsFromDispatch = ({
  onSearchClick: query,
  onViewClick: display,
})

export default connect(mapStateToProps, mapDispatchToProps)(ClippedDrawer);