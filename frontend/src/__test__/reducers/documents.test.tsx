import { setDocuments } from '../../actions/documents';
import { documents } from '../../reducers/documents';
import { DocumentsAction, IDocument } from '../../types/documents';
import { docs } from '../../util/docs';

const mockMath = Object.create(global.Math);
mockMath.random = () => 0.4999;
global.Math = mockMath;

describe('documents reducer', () => {
    it('should return default docs', () => {
        const currentState: undefined = undefined;
        const expected: IDocument[] = docs();
        const action: DocumentsAction = {
            payload: {
                documents: [],
            },
            type: 'default'
        };
        const received: IDocument[] = documents(currentState, action);
        expect(received).toEqual(expected);
    })
    it('should return given docs', () => {
        const currentState: IDocument[] = [];
        const expected: IDocument[] = docs();
        const action: DocumentsAction = setDocuments(docs());
        const received: IDocument[] = documents(currentState, action);
        expect(received).toEqual(expected);
    })
});