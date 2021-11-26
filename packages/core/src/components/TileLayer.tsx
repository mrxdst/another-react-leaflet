import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { TileLayerContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useTileLayer } from '../hooks/useTileLayer';

export type TileLayerProps = React.PropsWithChildren<L.TileLayerOptions & EventedProps & {
  urlTemplate: string;
}>;

const _TileLayer = React.forwardRef(function TileLayer(props: TileLayerProps, ref: React.ForwardedRef<L.TileLayer | undefined>): ReactElement {
  const { children, urlTemplate, ...options } = props;

  const _urlTemplate = useRef(urlTemplate);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.TileLayer>();

  useEffect(() => {
    setInstance(new L.TileLayer(_urlTemplate.current, _options.current));
  }, []);

  useTileLayer(instance, urlTemplate, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <TileLayerContextProvider value={instance}>
      {children}
    </TileLayerContextProvider>
  );
});

export const TileLayer = React.memo(_TileLayer) as React.ForwardRefExoticComponent<TileLayerProps & React.RefAttributes<L.TileLayer | undefined>>;