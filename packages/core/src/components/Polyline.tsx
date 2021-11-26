import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { PolylineContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { usePolyline } from '../hooks/usePolyline';

export type PolylineProps = React.PropsWithChildren<L.PolylineOptions & EventedProps & {
  latlngs: L.LatLngExpression[] | L.LatLngExpression[][];
}>;

const _Polyline = React.forwardRef(function Polyline(props: PolylineProps, ref: React.ForwardedRef<L.Polyline | undefined>): ReactElement {
  const { children, latlngs, ...options } = props;

  const _latlngs = useRef(latlngs);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Polyline>();

  useEffect(() => {
    setInstance(new L.Polyline(_latlngs.current, _options.current));
  }, []);

  usePolyline(instance, latlngs, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <PolylineContextProvider value={instance}>
      {children}
    </PolylineContextProvider>
  );
});

export const Polyline = React.memo(_Polyline) as React.ForwardRefExoticComponent<PolylineProps & React.RefAttributes<L.Polyline | undefined>>;