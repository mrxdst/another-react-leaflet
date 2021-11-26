import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { CircleMarkerContextProvider } from '../context';
import { useCircleMarker } from '../hooks/useCircleMarker';
import { EventedProps } from '../hooks/useEvented';

export type CircleMarkerProps = React.PropsWithChildren<L.CircleMarkerOptions & EventedProps & {
  latlng: L.LatLngExpression;
}>;

const _CircleMarker = React.forwardRef(function CircleMarker(props: CircleMarkerProps, ref: React.ForwardedRef<L.CircleMarker | undefined>): ReactElement {
  const { children, latlng, ...options } = props;

  const _latlng = useRef(latlng);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.CircleMarker>();

  useEffect(() => {
    setInstance(new L.CircleMarker(_latlng.current, _options.current));
  }, []);

  useCircleMarker(instance, latlng, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <CircleMarkerContextProvider value={instance}>
      {children}
    </CircleMarkerContextProvider>
  );
});

export const CircleMarker = React.memo(_CircleMarker) as React.ForwardRefExoticComponent<CircleMarkerProps & React.RefAttributes<L.CircleMarker | undefined>>;