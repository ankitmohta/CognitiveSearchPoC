import * as React from 'react';
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow';
import ForceDirectedGraph from '../../components/ForceDirectedGraph';
import G from '../../util/json/miserables';
import { withTheme } from './util/ThemeProvider';

describe('ForceDirectedGraph Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        graph: G,
        height: jest.fn(),
        width: jest.fn(),
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<ForceDirectedGraph {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})