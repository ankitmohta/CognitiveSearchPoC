import { isArrayEmpty, isDefinedNumber } from 'src/util';

export type AzSearchMode = 'any' | 'all';

export interface IAzOrderBy {
    fieldName: string,
    order: 'asc' | 'desc',
}

export interface IAzPayload {
    search: string,

    count?: boolean,
    // facets,
    // filters,
    minimumCoverage?: number,
    orderBy?: IAzOrderBy[],
    searchFields?: string[],
    searchMode?: AzSearchMode,
    select?: string[],
    skip?: number,
    top?: number,

    fuzzy?: boolean,
    suggesterName?: string,
    autocompleteMode?: string,
    scoringProfile?: string,
    highlight?: string,
}

const parseOrderByGET = (orderby: IAzOrderBy): string => `${orderby.fieldName} ${orderby.order}`;

export const parsePayloadGET = (payload: IAzPayload): string => [
    payload.search ? `search=${global.encodeURI(payload.search)}` : '',
    payload.searchMode === 'all' ? 'searchMode=all' : '',
    isArrayEmpty(payload.searchFields) ? '' : `searchFields=${payload.searchFields!.join(',')}`,
    isArrayEmpty(payload.orderBy) ? '' : `$orderby=${payload.orderBy!.map(parseOrderByGET).join(',')}`,
    // facets
    isArrayEmpty(payload.select) ? '' : `$select=${payload.select!.join(',')}`,
    // filters
    isDefinedNumber(payload.minimumCoverage) ? `minimumCoverage=${payload.minimumCoverage}` : '',
    payload.count ? `$count=true` : '',
    isDefinedNumber(payload.top) ? `$top=${payload.top}` : '',
    isDefinedNumber(payload.skip) ? `$skip=${payload.skip}` : '',
    payload.fuzzy ? `fuzzy=true` : '',
    payload.suggesterName ? `suggesterName=${payload.suggesterName}` : '',
    payload.autocompleteMode ? `autocompleteMode=${payload.autocompleteMode}` : '',
    payload.scoringProfile ? `scoringProfile=${payload.scoringProfile}` : '',
    payload.highlight ? `highlight=${payload.highlight}` : '',
].filter(i => i).join('&');

export const defaultPayload = (search: string): string => (parsePayloadGET({
    search
}))