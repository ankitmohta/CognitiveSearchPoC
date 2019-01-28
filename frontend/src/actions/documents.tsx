import { ACTIONS, DocumentsAction, IDocument } from '../types/documents';

/**
 * creates a documents action to dispatch
 * @param {IDocument[]} documents the documents to enter into the action's payload
 */
export const setDocuments = (documents: IDocument[]): DocumentsAction => ({
    payload: {
        documents,
    },
    type: ACTIONS.SET_DOCUMENTS,
})