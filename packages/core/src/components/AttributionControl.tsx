import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { AttributionControlContextProvider } from '../context';
import { useAttributionControl } from '../hooks/useAttributionControl';

export type AttributionControlProps = React.PropsWithChildren<L.Control.AttributionOptions>;

const _AttributionControl = React.forwardRef(function AttributionControl(props: AttributionControlProps, ref: React.ForwardedRef<L.Control.Attribution | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Control.Attribution>();

  useEffect(() => {
    setInstance(new L.Control.Attribution(_options.current));
  }, []);

  useAttributionControl(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <AttributionControlContextProvider value={instance}>
      {children}
    </AttributionControlContextProvider>
  );
});

export const AttributionControl = React.memo(_AttributionControl) as React.ForwardRefExoticComponent<AttributionControlProps & React.RefAttributes<L.Control.Attribution | undefined>>;