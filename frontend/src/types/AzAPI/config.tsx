export interface IAzConfig {
    apiKey: string,
    apiVer: string,
    method: 'GET' | 'POST',
    secure: boolean,
    serviceDomain: string,
    serviceName: string,
    servicePath: string,
}

export const defaultAzConfig: IAzConfig  = {
    apiKey: process.env.API_KEY || process.env.REACT_APP_API_KEY || '',
    apiVer: process.env.API_VERSION || process.env.REACT_APP_API_VERSION || '',
    method: 'GET',
    secure: true,
    serviceDomain: process.env.SERVICE_DOMAIN || process.env.REACT_APP_SERVICE_DOMAIN || '',
    serviceName: process.env.SERVICE_NAME || process.env.REACT_APP_SERVICE_NAME || '',
    servicePath: process.env.SERVICE_PATH || process.env.REACT_APP_SERVICE_PATH || '',
}

export const parseConfig = (config: IAzConfig) => {
    const root = `http${config.secure ? 's' : ''}://${config.serviceName}.${config.serviceDomain}/`;
    const path = `${config.servicePath}?api-version=${config.apiVer}`;
    return root + path;
}

export const defaultParsedConfig: string = parseConfig(defaultAzConfig);