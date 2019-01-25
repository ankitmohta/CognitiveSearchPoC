import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import Documents from '../../components/Documents'
import { withTheme } from './util/ThemeProvider'

describe('Documents Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        docs: 'abcd'.split('').map(d => ({title: d, pages: []})),
        pagePadding: 2,
        pageSize: 10,
        pagenationWidth: '100%',
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<Documents {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})