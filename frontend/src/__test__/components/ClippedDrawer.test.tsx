import * as React from 'react';
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow';
import ClippedDrawer from '../../components/ClippedDrawer';
import { withTheme } from './util/ThemeProvider';

describe('ClippedDrawer Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        display: 'Maps',
        docs: [],
        graph: {nodes: [], links: []},
        onSearchClick: jest.fn(),
        onViewClick: jest.fn(),
        pins: [],
        query: '',
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<ClippedDrawer {...props} />))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})