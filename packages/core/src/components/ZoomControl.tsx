import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { ZoomControlContextProvider } from '../context';
import { useZoomControl } from '../hooks/useZoomControl';

export type ZoomControlProps = React.PropsWithChildren<L.Control.ZoomOptions>;

const _ZoomControl = React.forwardRef(function ZoomControl(props: ZoomControlProps, ref: React.ForwardedRef<L.Control.Zoom | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.Control.Zoom>();

  useEffect(() => {
    setInstance(new L.Control.Zoom(_options.current));
  }, []);

  useZoomControl(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <ZoomControlContextProvider value={instance}>
      {children}
    </ZoomControlContextProvider>
  );
});

export const ZoomControl = React.memo(_ZoomControl) as React.ForwardRefExoticComponent<ZoomControlProps & React.RefAttributes<L.Control.Zoom | undefined>>;