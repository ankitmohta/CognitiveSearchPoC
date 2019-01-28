import configureStore from '../../configureStore';
import { IState } from '../../types';
import { docs } from '../../util/docs';
import G from '../../util/json/miserables';
import { pins } from '../../util/pins';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.4999;
global.Math = mockMath;


describe('root reducer', () => {
    const store = configureStore();
    it('should return state from store', () => {
        const received: IState = store.getState();
        const expected: IState = {
            display: 'Results',
            documents: docs(),
            graph: G,
            pins,
            query: '',
        }
        expect(received).toEqual(expected);
    });
});