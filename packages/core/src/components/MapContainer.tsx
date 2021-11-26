
import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { AttributionControlContextProvider, MapContextProvider, ZoomControlContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useMapContainer } from '../hooks/useMapContainer';

const containerStyle = {
  width: '100%',
  height: '100%'
};

export type MapContainerProps = React.PropsWithChildren<L.MapOptions & EventedProps & {
  center: L.LatLngExpression;
  zoom: number;
}>;

const _MapContainer = React.forwardRef(function MapContainer(props: MapContainerProps, ref: React.ForwardedRef<L.Map | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const containerRef = useRef<HTMLDivElement>(null);

  const [instance, setInstance] = useState<L.Map>();

  useEffect(() => {
    if (!containerRef.current) {
      return;
    }
    const _instance = new L.Map(containerRef.current, _options.current);
    setInstance(_instance);

    return () => {
      _instance.remove();
    };
  }, []);

  useMapContainer(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  const sink = useRef<HTMLDivElement>(document.createElement('div'));
  
  return (
    <>
      <div ref={containerRef} style={containerStyle}/>
      {instance && ReactDOM.createPortal(
        <MapContextProvider value={instance}>
          <AttributionControlContextProvider value={instance.attributionControl}>
            <ZoomControlContextProvider value={instance.zoomControl}>
              {children}
            </ZoomControlContextProvider>
          </AttributionControlContextProvider>
        </MapContextProvider>, sink.current)
      }
    </>
  );
});

export const MapContainer = React.memo(_MapContainer) as React.ForwardRefExoticComponent<MapContainerProps & React.RefAttributes<L.Map | undefined>>;