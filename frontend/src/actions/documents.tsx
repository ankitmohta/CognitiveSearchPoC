import { ACTIONS, DocumentsAction, IDocument } from '../types/documents';

/**
 * creates a documents action to dispatch
 * @param {IDocument[]} docs the documents to enter into the action's payload
 */
export const documents = (docs: IDocument[]): DocumentsAction => ({
    payload: {
        documents: docs
    },
    type: ACTIONS.SET_DOCUMENTS,
})