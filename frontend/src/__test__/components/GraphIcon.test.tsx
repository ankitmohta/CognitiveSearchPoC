import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import GraphIcon from '../../components/GraphIcon'
import { withTheme } from './util/ThemeProvider'

describe('GraphIcon Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<GraphIcon {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})