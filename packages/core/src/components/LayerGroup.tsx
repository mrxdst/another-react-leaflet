import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { LayerGroupContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useLayerGroup } from '../hooks/useLayerGroup';

export type LayerGroupProps = React.PropsWithChildren<L.LayerOptions & EventedProps>;

const _LayerGroup = React.forwardRef(function LayerGroup(props: LayerGroupProps, ref: React.ForwardedRef<L.LayerGroup | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.LayerGroup>();

  useEffect(() => {
    setInstance(new L.LayerGroup(undefined, _options.current));
  }, []);

  useLayerGroup(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <LayerGroupContextProvider value={instance}>
      {children}
    </LayerGroupContextProvider>
  );
});

export const LayerGroup = React.memo(_LayerGroup) as React.ForwardRefExoticComponent<LayerGroupProps & React.RefAttributes<L.LayerGroup | undefined>>;