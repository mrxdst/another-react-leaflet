import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import 'leaflet.markercluster';
import { MarkerClusterGroupContextProvider } from '../context';
import { useMarkerClusterGroup } from '../hooks/useMarkerClusterGroup';
import { EventedProps } from 'another-react-leaflet';

export type MarkerClusterGroupProps = React.PropsWithChildren<L.MarkerClusterGroupOptions & EventedProps>;

const _MarkerClusterGroup = React.forwardRef(function MarkerClusterGroup(props: MarkerClusterGroupProps, ref: React.ForwardedRef<L.MarkerClusterGroup | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.MarkerClusterGroup>();

  useEffect(() => {
    setInstance(new L.MarkerClusterGroup(_options.current));
  }, []);

  useMarkerClusterGroup(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <MarkerClusterGroupContextProvider value={instance}>
      {children}
    </MarkerClusterGroupContextProvider>
  );
});

export const MarkerClusterGroup = React.memo(_MarkerClusterGroup) as React.ForwardRefExoticComponent<MarkerClusterGroupProps & React.RefAttributes<L.MarkerClusterGroup | undefined>>;