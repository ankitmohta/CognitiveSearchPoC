import { defaultReduce, IReduce } from '../types';
import { ACTIONS, GraphAction, IGraph } from '../types/graph';
import G from '../util/json/miserables';

const reduce: IReduce<IGraph, GraphAction> = {
    [ACTIONS.SET_GRAPH]: (state, action) => action.payload.graph
}

export const graph = (state: IGraph = G, action: GraphAction) => (reduce[action.type] || defaultReduce)(state, action);