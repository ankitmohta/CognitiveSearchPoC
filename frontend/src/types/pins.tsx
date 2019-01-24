import { IAction, IActionType } from './';

export interface IInfoboxWithPushPin {
    location: number[] | string[],
    infobox: {
      description: string,
      options?: object,
      title: string,
    },
    pushPin: {
      description: string,
      options?: object,
      title: string,
    }
  }

export const ACTIONS: IActionType<string> = {
    SET_PINS: 'SET_PINS'
}

export interface IPayload {
    pins: IInfoboxWithPushPin[],
}

export type PinsAction = IAction<IPayload, typeof ACTIONS.SET_PINS>;
