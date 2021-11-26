import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { PolygonContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { usePolygon } from '../hooks/usePolygon';

export type PolygonProps = React.PropsWithChildren<L.PolylineOptions & EventedProps & {
  latlngs: L.LatLngExpression[] | L.LatLngExpression[][];
}>;

const _Polygon = React.forwardRef(function Polygon(props: PolygonProps, ref: React.ForwardedRef<L.Polygon | undefined>): ReactElement {
  const { children, latlngs, ...options } = props;

  const _latlngs = useRef(latlngs);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Polygon>();

  useEffect(() => {
    setInstance(new L.Polygon(_latlngs.current, _options.current));
  }, []);

  usePolygon(instance, latlngs, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <PolygonContextProvider value={instance}>
      {children}
    </PolygonContextProvider>
  );
});

export const Polygon = React.memo(_Polygon) as React.ForwardRefExoticComponent<PolygonProps & React.RefAttributes<L.Polygon | undefined>>;