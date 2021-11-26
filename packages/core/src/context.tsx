import React, { ReactElement } from 'react';
import L from 'leaflet';
import { StyleOptions } from './hooks/usePath';

export type ContextProviderProps<T> = React.PropsWithChildren<{ value: Exclude<T extends React.Context<infer C> ? C : never, undefined> }>;

function createContext<T>(displayName: string) {
  const ctx = React.createContext<T | undefined>(undefined);
  ctx.displayName = displayName;
  return ctx;
}

export function makeContextProvider<T, P extends ContextProviderProps<React.Context<T>>>(contexts: ReadonlyArray<React.Context<T>>): (props: P) => ReactElement {
  const last = contexts[contexts.length - 1];
  if (!last) {
    throw new Error('No contexts provided');
  }

  const displayName = (last.displayName || 'Context') + 'Provider';

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return {
    [displayName]: function (props: P) {
      return recurse(contexts, props, 0) as ReactElement;
    }
  }[displayName]!;

  function recurse(contexts: ReadonlyArray<React.Context<T>>, props: P, index: number) {
    const context = contexts[index];
    if (!context) {
      return props.children;
    }

    return (
      <context.Provider value={props.value}>
        {recurse(contexts, props, index + 1)}
      </context.Provider>
    );
  }
}


export const MapContext = createContext<L.Map>('MapContext');
export const MapContextProvider = makeContextProvider([MapContext]);

export const ControlContext = createContext<L.Control>('ControlContext');
export const ControlContextProvider = makeContextProvider([ControlContext]);


export const AttributionControlContext = createContext<L.Control.Attribution>('AttributionControlContext');
export const AttributionControlContextProvider = makeContextProvider([ControlContext, AttributionControlContext] as typeof AttributionControlContext[]);


export const LayersControlContext = createContext<L.Control.Layers>('LayersControlContext');
export const LayersControlNameTypeContext = createContext<[string, 'baseLayer' | 'overlay']>('LayersControlNameTypeContext');
export const LayersControlContextProvider = makeContextProvider([ControlContext, LayersControlContext] as typeof LayersControlContext[]);


export const ScaleControlContext = createContext<L.Control.Scale>('ScaleControlContext');
export const ScaleControlContextProvider = makeContextProvider([ControlContext, ScaleControlContext] as typeof ScaleControlContext[]);


export const ZoomControlContext = createContext<L.Control.Zoom>('ZoomControlContext');
export const ZoomControlContextProvider = makeContextProvider([ControlContext, ZoomControlContext] as typeof ZoomControlContext[]);


export const LayerContext = createContext<L.Layer>('LayerContext');
export function LayerContextProvider(props: ContextProviderProps<React.Context<L.Layer | undefined>>): ReactElement {
  return (
    <LayerContext.Provider value={props.value}>
      <LayersControlNameTypeContext.Provider value={undefined}>
        {props.children}
      </LayersControlNameTypeContext.Provider>
    </LayerContext.Provider>
  );
}


export const TileLayerContext = createContext<L.TileLayer>('TileLayerContext');
export const TileLayerContextProvider = makeContextProvider([LayerContext, TileLayerContext] as typeof TileLayerContext[]);


export const WMSTileLayerContext = createContext<L.TileLayer.WMS>('WMSTileLayerContext');
export type WMSTileLayerContextProviderProps = ContextProviderProps<typeof WMSTileLayerContext>;
export const WMSTileLayerContextProvider = makeContextProvider([LayerContext, TileLayerContext, WMSTileLayerContext] as typeof WMSTileLayerContext[]);


export const MarkerContext = createContext<L.Marker>('MarkerContext');
export const MarkerContextProvider = makeContextProvider([LayerContext, MarkerContext] as typeof MarkerContext[]);


export const ImageOverlayContext = createContext<L.ImageOverlay>('ImageOverlayContext');
export const ImageOverlayContextProvider = makeContextProvider([LayerContext, ImageOverlayContext] as typeof ImageOverlayContext[]);


export const VideoOverlayContext = createContext<L.VideoOverlay>('VideoOverlayContext');
export const VideoOverlayContextProvider = makeContextProvider([LayerContext, ImageOverlayContext, VideoOverlayContext] as typeof VideoOverlayContext[]);


export const SVGOverlayContext = createContext<L.SVGOverlay>('SVGOverlayContext');
export const SVGOverlayContextProvider = makeContextProvider([LayerContext, ImageOverlayContext, SVGOverlayContext] as typeof SVGOverlayContext[]);


export const LayerGroupContext = createContext<L.LayerGroup>('LayerGroupContext');
export const LayerGroupContextProvider = makeContextProvider([LayerContext, LayerGroupContext] as typeof LayerGroupContext[]);


export const FeatureGroupContext = createContext<L.FeatureGroup>('FeatureGroupContext');
export const FeatureGroupStyleContext = createContext<StyleOptions>('FeatureGroupStyleContext');
export const FeatureGroupContextProvider = makeContextProvider([LayerContext, LayerGroupContext, FeatureGroupContext] as typeof FeatureGroupContext[]);


export const GeoJSONContext = createContext<L.GeoJSON>('GeoJSONContext');
export const GeoJSONContextProvider = makeContextProvider([LayerContext, LayerGroupContext, FeatureGroupContext, GeoJSONContext] as typeof GeoJSONContext[]);


export const PathContext = createContext<L.Path>('PathContext');
export const PathContextProvider = makeContextProvider([LayerContext, PathContext] as typeof PathContext[]);


export const PolylineContext = createContext<L.Polyline>('PolylineContext');
export const PolylineContextProvider = makeContextProvider([LayerContext, PathContext, PolylineContext] as typeof PolylineContext[]);


export const PolygonContext = createContext<L.Polygon>('PolygonContext');
export const PolygonContextProvider = makeContextProvider([LayerContext, PathContext, PolylineContext, PolygonContext] as typeof PolygonContext[]);


export const RectangleContext = createContext<L.Rectangle>('RectangleContext');
export const RectangleContextProvider = makeContextProvider([LayerContext, PathContext, PolylineContext, PolygonContext, RectangleContext] as typeof RectangleContext[]);


export const CircleMarkerContext = createContext<L.CircleMarker>('CircleMarkerContext');
export const CircleMarkerContextProvider = makeContextProvider([LayerContext, PathContext, CircleMarkerContext] as typeof CircleMarkerContext[]);


export const CircleContext = createContext<L.Circle>('CircleContext');
export const CircleContextProvider = makeContextProvider([LayerContext, PathContext, CircleMarkerContext, CircleContext] as typeof CircleContext[]);
