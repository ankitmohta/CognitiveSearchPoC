import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import Main from '../../components/Main'
import { withTheme } from './util/ThemeProvider'

describe('Main Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        display: 'Maps',
        onClick: jest.fn(),
        open: true,
        views: [{component: <div/>, display: 'Maps', icon: 'Map'}]
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<Main {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})