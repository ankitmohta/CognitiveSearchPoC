import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import App from '../../components/App'

describe('App Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        
    }
    it('should match snapshot', () => {
        renderer.render(<App {...props}/>)
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})