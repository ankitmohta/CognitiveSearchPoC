import { graph } from '../../actions/graph';
import { ACTIONS, GraphAction, IGraph } from '../../types/graph';

describe('graph action creators', () => {
    it('should return a SET_GRAPH action',() => {
        const g: IGraph = {nodes: [], links: []};
        const expected: GraphAction = {
            payload: {
                graph: g,
            },
            type: ACTIONS.SET_GRAPH,
        }
        const received: GraphAction = graph(g);
        expect(received).toEqual(expected);
    });
});