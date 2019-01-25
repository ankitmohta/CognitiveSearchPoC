import { documents } from '../../actions/documents';
import { ACTIONS, DocumentsAction, IDocument } from '../../types/documents';

describe('documents action creators', () => {
    it('should return a SET_DOCUMENTS action',() => {
        const docs: IDocument[] = [];
        const expected: DocumentsAction = {
            payload: {
                documents: docs,
            },
            type: ACTIONS.SET_DOCUMENTS,
        }
        const received: DocumentsAction = documents(docs);
        expect(received).toEqual(expected);
    });
});