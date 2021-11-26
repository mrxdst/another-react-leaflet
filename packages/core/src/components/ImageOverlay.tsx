import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { ImageOverlayContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useImageOverlay } from '../hooks/useImageOverlay';

export type ImageOverlayProps = React.PropsWithChildren<L.ImageOverlayOptions & EventedProps & {
  imageUrl: string;
  bounds: L.LatLngBoundsExpression;
}>;

const _ImageOverlay = React.forwardRef(function ImageOverlay(props: ImageOverlayProps, ref: React.ForwardedRef<L.ImageOverlay | undefined>): ReactElement {
  const { children, imageUrl, bounds, ...options } = props;

  const _imageUrl = useRef(imageUrl);
  const _bounds = useRef(bounds);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.ImageOverlay>();

  useEffect(() => {
    setInstance(new L.ImageOverlay(_imageUrl.current, _bounds.current, _options.current));
  }, []);

  useImageOverlay(instance, imageUrl, bounds, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <ImageOverlayContextProvider value={instance}>
      {children}
    </ImageOverlayContextProvider>
  );
});

export const ImageOverlay = React.memo(_ImageOverlay) as React.ForwardRefExoticComponent<ImageOverlayProps & React.RefAttributes<L.ImageOverlay | undefined>>;