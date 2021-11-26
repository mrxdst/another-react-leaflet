import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { SVGOverlayContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useSVGOverlay } from '../hooks/useSVGOverlay';

export type SVGOverlayProps = React.PropsWithChildren<L.ImageOverlayOptions & EventedProps & {
  svgImage: string | SVGElement;
  bounds: L.LatLngBoundsExpression;
}>;

const _SVGOverlay = React.forwardRef(function SVGOverlay(props: SVGOverlayProps, ref: React.ForwardedRef<L.SVGOverlay | undefined>): ReactElement {
  const { children, svgImage, bounds, ...options } = props;

  const _svgImage = useRef(svgImage);
  const _bounds = useRef(bounds);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.SVGOverlay>();

  useEffect(() => {
    setInstance(new L.SVGOverlay(_svgImage.current, _bounds.current, _options.current));
  }, []);

  useSVGOverlay(instance, svgImage, bounds, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <SVGOverlayContextProvider value={instance}>
      {children}
    </SVGOverlayContextProvider>
  );
});

export const SVGOverlay = React.memo(_SVGOverlay) as React.ForwardRefExoticComponent<SVGOverlayProps & React.RefAttributes<L.SVGOverlay | undefined>>;