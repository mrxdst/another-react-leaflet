import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { ScaleControlContextProvider } from '../context';
import { useScaleControl } from '../hooks/useScaleControl';

export type ScaleControlProps = React.PropsWithChildren<L.Control.ScaleOptions>;

const _ScaleControl = React.forwardRef(function ScaleControl(props: ScaleControlProps, ref: React.ForwardedRef<L.Control.Scale | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Control.Scale>();

  useEffect(() => {
    setInstance(new L.Control.Scale(_options.current));
  }, []);

  useScaleControl(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <ScaleControlContextProvider value={instance}>
      {children}
    </ScaleControlContextProvider>
  );
});

export const ScaleControl = React.memo(_ScaleControl) as React.ForwardRefExoticComponent<ScaleControlProps & React.RefAttributes<L.Control.Scale | undefined>>;