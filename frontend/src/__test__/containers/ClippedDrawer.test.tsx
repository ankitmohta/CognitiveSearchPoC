import * as React from 'react';
import { Provider } from 'react-redux';
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow';
import configureStore from '../../configureStore';
import ClippedDrawer from '../../containers/ClippedDrawer';

jest.mock('../../util/docs', () => ({
    docs: jest.fn(() => [])
}))

const store = configureStore();

describe('ClippedDrawer Container', () => {
    const renderer = ShallowRenderer()
    it('should match snapshot', () => {
        renderer.render(<Provider store={store}>
            <ClippedDrawer/>
            </Provider>
            )
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})