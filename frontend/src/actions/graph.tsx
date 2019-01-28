import { ACTIONS, GraphAction, IGraph } from '../types/graph';

/**
 * creates a graph action to dispatch
 * @param {IGraph} graph the graph to enter into the action's payload
 */
export const setGraph = (graph: IGraph): GraphAction => ({
    payload: {
        graph,
    },
    type: ACTIONS.SET_GRAPH,
})