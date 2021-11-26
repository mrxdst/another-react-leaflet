import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import type geojson from 'geojson';
import { GeoJSONContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useGeoJSON } from '../hooks/useGeoJSON';
import { StyleOptions } from '../hooks/usePath';

export type GeoJSONProps = React.PropsWithChildren<L.GeoJSONOptions & StyleOptions & EventedProps & {
  geojson?: geojson.GeoJsonObject;
}>;

const _GeoJSON = React.forwardRef(function GeoJSON(props: GeoJSONProps, ref: React.ForwardedRef<L.GeoJSON | undefined>): ReactElement {
  const { children, geojson, ...options } = props;

  const _geojson = useRef(geojson);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.GeoJSON>();

  useEffect(() => {
    setInstance(new L.GeoJSON(_geojson.current, _options.current));
  }, []);

  useGeoJSON(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <GeoJSONContextProvider value={instance}>
      {children}
    </GeoJSONContextProvider>
  );
});

export const GeoJSON = React.memo(_GeoJSON) as React.ForwardRefExoticComponent<GeoJSONProps & React.RefAttributes<L.GeoJSON | undefined>>;