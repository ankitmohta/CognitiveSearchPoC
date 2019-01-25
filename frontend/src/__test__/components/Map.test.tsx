import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import Map from '../../components/Map'
import { withTheme } from './util/ThemeProvider'

describe('Map Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<Map {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})