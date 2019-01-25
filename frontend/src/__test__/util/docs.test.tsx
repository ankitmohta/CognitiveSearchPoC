import { IDocument, IPage } from 'src/types/documents';
import * as Docs from '../../util/docs';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.4999;
global.Math = mockMath;

describe('docs util', () => {
    describe('rNumberRange', () => {
        it('should return 5', () => {
            const expected: number = 5;
            const received: number = Docs.rNumberRange(10);
            expect(received).toBe(expected);
        })
        it('should return 0', () => {
            const expected: number = 0;
            const received: number = Docs.rNumberRange(10, -4);
            expect(received).toBe(expected);
        })
    })
    describe('rLetter', () => {
        it('should return "m"', () => {
            const expected: string = 'm';
            const received: string = Docs.rLetter();
            expect(received).toBe(expected);
        })
    })
    describe('rTag', () => {
        it('should return a tag', () => {
            const expected: string = 'ut\ntortor.'
            const received: string = Docs.rTag();
            expect(received).toBe(expected);
        })
    })
    describe('rDocument', () => {
        it('should return a document', () => {
            const tags: string[] = Array(13).fill(0).map(Docs.rTag);
            const page: IPage = {
                source: '/docs/phb/3.png',
                tags,
            }
            const expected: IDocument = {
                pages: Array(3).fill(0).map(m => page),
                title: 'mmm_499900001'
            }
            const received: IDocument = Docs.rDocument();
            expect(received).toEqual(expected);
        })
    })
    describe('docs', () => {
        it('should return a document array', () => {
            const tags: string[] = Array(13).fill(0).map(Docs.rTag);
            const page: IPage = {
                source: '/docs/phb/3.png',
                tags,
            }
            const document: IDocument = {
                pages: Array(3).fill(0).map(m => page),
                title: 'mmm_499900001'
            }
            const expected: IDocument[] = Array(49).fill(0).map(m => document);
            const received: IDocument[] = Docs.docs();
            expect(received).toEqual(expected);
        })
    })
})