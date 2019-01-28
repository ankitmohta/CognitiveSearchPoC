import { setGraph } from '../../actions/graph';
import { graph } from '../../reducers/graph';
import { GraphAction, IGraph } from '../../types/graph';
import G from '../../util/json/miserables';

describe('graph reducer', () => {
    it('should return the default graph', () => {
        const currentState: undefined = undefined;
        const expected: IGraph = G;
        const action: GraphAction = {
            payload: {
                graph: expected
            },
            type: 'DEFAULT'
        };
        const received: IGraph = graph(currentState, action);
        expect(received).toEqual(expected);
    })
    it('should return the given graph', () => {
        const currentState: IGraph = {links: [], nodes: []};
        const expected: IGraph = G;
        const action: GraphAction = setGraph(G);
        const received: IGraph = graph(currentState, action);
        expect(received).toEqual(expected);
    })
});