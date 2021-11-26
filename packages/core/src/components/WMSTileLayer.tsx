import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { WMSTileLayerContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useWMSTileLayer } from '../hooks/useWMSTileLayer';

export type WMSTileLayerProps = React.PropsWithChildren<L.WMSOptions & EventedProps & {
  baseUrl: string;
}>;

const _WMSTileLayer = React.forwardRef(function WMSTileLayer(props: WMSTileLayerProps, ref: React.ForwardedRef<L.TileLayer.WMS | undefined>): ReactElement {
  const { children, baseUrl, ...options } = props;

  const _baseUrl = useRef(baseUrl);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.TileLayer.WMS>();

  useEffect(() => {
    setInstance(new L.TileLayer.WMS(_baseUrl.current, _options.current));
  }, []);

  useWMSTileLayer(instance, baseUrl, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <WMSTileLayerContextProvider value={instance}>
      {children}
    </WMSTileLayerContextProvider>
  );
});

export const WMSTileLayer = React.memo(_WMSTileLayer) as React.ForwardRefExoticComponent<WMSTileLayerProps & React.RefAttributes<L.TileLayer.WMS | undefined>>;