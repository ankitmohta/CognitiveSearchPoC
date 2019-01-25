import { ACTIONS, GraphAction, IGraph } from '../types/graph';

/**
 * creates a graph action to dispatch
 * @param {IGraph} g the graph to enter into the action's payload
 */
export const graph = (g: IGraph): GraphAction => ({
    payload: {
        graph: g
    },
    type: ACTIONS.SET_GRAPH,
})