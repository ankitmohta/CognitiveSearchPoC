import * as React from 'react';
import {ReactBingmaps} from 'react-bingmaps';
import { IInfoboxWithPushPin } from '../../types/pins';

export interface IMapProps {
  infoboxesWithPushPins?: IInfoboxWithPushPin[],
}

class Map extends React.Component<IMapProps> {
    public render() {
        return(
                <ReactBingmaps
                  bingmapKey={(process.env.BINGMAPS_KEY || process.env.REACT_APP_BINGMAPS_KEY) as string}
                  infoboxesWithPushPins={
                    this.props.infoboxesWithPushPins ? this.props.infoboxesWithPushPins.map(i => ({
                      addHandler:"mouseover",
                      infoboxOption: {title: i.infobox.title, description: i.infobox.description, ...i.infobox.options},
                      location: i.location,
                      pushPinOption: {title: i.pushPin.title, description: i.pushPin.description, ...i.pushPin.options},
                    })) : undefined
                  }
                  disableStreetside = {false}
                  disableBirdseye = {true}
                  navigationBarMode = {"compact"}
                />
        )
    } 
        
}
export default Map;