import React from 'react';
import L from 'leaflet';
import { LayerContext, LayerGroupContext, makeContextProvider } from 'another-react-leaflet';


export const MarkerClusterGroupContext = React.createContext<L.MarkerClusterGroup | undefined>(undefined);
MarkerClusterGroupContext.displayName = 'MarkerClusterGroupContext';


export const MarkerClusterGroupContextProvider = makeContextProvider([LayerContext, LayerGroupContext, MarkerClusterGroupContext] as typeof MarkerClusterGroupContext[]);
