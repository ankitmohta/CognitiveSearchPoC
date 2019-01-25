import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import Title from '../../components/Title'
import { withTheme } from './util/ThemeProvider'

describe('Title Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<Title {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})