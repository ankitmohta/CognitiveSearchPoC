import { SimulationNodeDatum } from 'd3';
import { IAction, IActionType } from './';

export interface Id3Node extends SimulationNodeDatum {
    id: string,
    group: number
  };
  
  export interface Id3Link {
    source: string,
    target: string,
    value: number
  };
  
  export interface IGraph {
    nodes: Id3Node[],
    links: Id3Link[]
  };

  export const ACTIONS: IActionType<string> = {
      SET_GRAPH: 'SET_GRAPH'
  }
  
  export interface IPayload {
      graph: IGraph,
  }
  
  export type GraphAction = IAction<IPayload, typeof ACTIONS.SET_GRAPH>;