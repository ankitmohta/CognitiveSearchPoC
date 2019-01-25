import * as React from 'react';
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow';
import DocumentPreview from '../../components/DocumentPreview';
import { withTheme } from './util/ThemeProvider';

describe('DocumentPreview Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        doc: {
            pages: [],
            title: 'title',
        }
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<DocumentPreview {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})