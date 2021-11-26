import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { RectangleContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useRectangle } from '../hooks/useRectangle';

export type RectangleProps = React.PropsWithChildren<L.PolylineOptions & EventedProps & {
  latLngBounds: L.LatLngBoundsExpression;
}>;

const _Rectangle = React.forwardRef(function Rectangle(props: RectangleProps, ref: React.ForwardedRef<L.Rectangle | undefined>): ReactElement {
  const { children, latLngBounds, ...options } = props;

  const _latLngBounds = useRef(latLngBounds);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Rectangle>();

  useEffect(() => {
    setInstance(new L.Rectangle(_latLngBounds.current, _options.current));
  }, []);

  useRectangle(instance, latLngBounds, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <RectangleContextProvider value={instance}>
      {children}
    </RectangleContextProvider>
  );
});

export const Rectangle = React.memo(_Rectangle) as React.ForwardRefExoticComponent<RectangleProps & React.RefAttributes<L.Rectangle | undefined>>;