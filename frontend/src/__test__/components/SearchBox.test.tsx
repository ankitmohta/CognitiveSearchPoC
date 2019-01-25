import * as React from 'react'
import { createRenderer as ShallowRenderer } from 'react-test-renderer/shallow'
import SearchBox from '../../components/SearchBox'
import { withTheme } from './util/ThemeProvider'

describe('SearchBox Component', () => {
    const renderer = ShallowRenderer()
    const props = {
        onChange: jest.fn(),
        searchAction: jest.fn(),
        value: 'value',
    }
    it('should match snapshot', () => {
        renderer.render(withTheme(<SearchBox {...props}/>))
        const result = renderer.getRenderOutput()
        expect(result).toMatchSnapshot()
    })
})