import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { LayersControlContextProvider } from '../context';
import { useLayersControl } from '../hooks/useLayersControl';

export type LayersControlProps = React.PropsWithChildren<L.Control.LayersOptions>;

const _LayersControl = React.forwardRef(function LayersControl(props: LayersControlProps, ref: React.ForwardedRef<L.Control.Layers | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Control.Layers>();

  useEffect(() => {
    setInstance(new L.Control.Layers(undefined, undefined,_options.current));
  }, []);

  useLayersControl(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <LayersControlContextProvider value={instance}>
      {children}
    </LayersControlContextProvider>
  );
});

export const LayersControl = React.memo(_LayersControl) as React.ForwardRefExoticComponent<LayersControlProps & React.RefAttributes<L.Control.Layers | undefined>>;