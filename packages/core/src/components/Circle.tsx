import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { CircleContextProvider } from '../context';
import { useCircle } from '../hooks/useCircle';
import { EventedProps } from '../hooks/useEvented';

export type CircleProps = React.PropsWithChildren<L.CircleMarkerOptions & EventedProps & {
  latlng: L.LatLngExpression;
}>;

const _Circle = React.forwardRef(function Circle(props: CircleProps, ref: React.ForwardedRef<L.Circle | undefined>): ReactElement {
  const { children, latlng, ...options } = props;

  const _latlng = useRef(latlng);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Circle>();

  useEffect(() => {
    setInstance(new L.Circle(_latlng.current, _options.current));
  }, []);

  useCircle(instance, latlng, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <CircleContextProvider value={instance}>
      {children}
    </CircleContextProvider>
  );
});

export const Circle = React.memo(_Circle) as React.ForwardRefExoticComponent<CircleProps & React.RefAttributes<L.Circle | undefined>>;