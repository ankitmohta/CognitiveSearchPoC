export interface IAzConfig {
    apiKey: string,
    apiVer: string,
    method: 'GET' | 'POST',
    protocol: string,
    serviceDomain: string,
    serviceName: string,
    servicePath: string,
}

export const defaultAzConfig: IAzConfig  = {
    apiKey: process.env.API_KEY || process.env.REACT_APP_API_KEY || '',
    apiVer: process.env.API_VERSION || process.env.REACT_APP_API_VERSION || '',
    method: 'GET',
    protocol: process.env.PROTOCOL || process.env.REACT_APP_PROTOCOL || '',
    serviceDomain: process.env.SERVICE_DOMAIN || process.env.REACT_APP_SERVICE_DOMAIN || '',
    serviceName: process.env.SERVICE_NAME || process.env.REACT_APP_SERVICE_NAME || '',
    servicePath: process.env.INDEX_NAME || process.env.REACT_APP_INDEX_NAME || '',
}

export const parseConfig = (config: IAzConfig) => {
    const root = `${config.protocol}://${config.serviceName}.${config.serviceDomain}/`;
    const path = `${config.servicePath}?api-version=${config.apiVer}`;
    return root + path;
}

export const defaultParsedConfig: string = parseConfig(defaultAzConfig);