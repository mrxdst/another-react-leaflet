import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { MarkerContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useMarker } from '../hooks/useMarker';

export type MarkerProps = React.PropsWithChildren<L.MarkerOptions & EventedProps & {
  latlng: L.LatLngExpression;
}>;

const _Marker = React.forwardRef(function Marker(props: MarkerProps, ref: React.ForwardedRef<L.Marker | undefined>): ReactElement {
  const { children, latlng, ...options } = props;

  const _latlng = useRef(latlng);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Marker>();

  useEffect(() => {
    setInstance(new L.Marker(_latlng.current, _options.current));
  }, []);

  useMarker(instance, latlng, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <MarkerContextProvider value={instance}>
      {children}
    </MarkerContextProvider>
  );
});

export const Marker = React.memo(_Marker) as React.ForwardRefExoticComponent<MarkerProps & React.RefAttributes<L.Marker | undefined>>;