
declare module 'react-bingmaps' {
    import * as React from 'react';
    
    interface ReactBingmapsProps {
        bingmapKey: string | number,
        center?: number[] | string[],
        mapTypeId?: string,
        navigationBarMode?: string,
        supportedMapTypes?: string[],
        heading?: string | number,
        zoom?: number,
        pushPins?: Array<{
            location: number[] | string[],
            option: object,
            addHandler?: {
                "type": string,
                callback: Function
            }
        }>,
        disableStreetside?: boolean,
        infoboxes?: Array<{
            location: number[],
            option: object,
            addHandler?: {
                "type": string,
                callback: Function
            }
        }>,
        infoboxesWithPushPins?: Array<{
            location: number[] | string[],
            addHandler?: string,
            infoboxOption: object,
            pushPinOption: object,
            infoboxAddHandler?: {
                "type": string,
                callback: Function
            },
            pushPinAddHandler?: {
                "type": string,
                callback: Function
            }
        }>
        getLocation?: object,
        regularPolygons?: Array<{
            center: number[],
            radius: number,
            points: number,
            option: object
        }>,
        boundary?: {
            location: number[] | string[],
            option: object,
            polygonStyle: object,
            search?: string,
        },
        mapOptions?: object,
        polyline?: {
            location: number[][],
            option: object
        }
        directions?: object,
        mapHandlers?: object[],
        disableBirdseye?: boolean,
    }

    class ReactBingmaps extends React.Component<ReactBingmapsProps,any> {}
}