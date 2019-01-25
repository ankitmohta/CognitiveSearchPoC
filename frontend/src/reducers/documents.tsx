import { defaultReduce, IReduce } from '.';
import { ACTIONS, DocumentsAction, IDocument } from '../types/documents';
import { docs } from '../util/docs';

const reduce: IReduce<IDocument[], DocumentsAction> = {
    [ACTIONS.SET_DOCUMENTS]: (state, action) => action.payload.documents
}

export const documents = (state: IDocument[] = docs(), action: DocumentsAction) => (reduce[action.type] || defaultReduce)(state, action);