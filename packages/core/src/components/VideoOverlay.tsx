import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { VideoOverlayContextProvider } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useVideoOverlay } from '../hooks/useVideoOverlay';

export type VideoOverlayProps = React.PropsWithChildren<L.VideoOverlayOptions & EventedProps & {
  video: string | string[] | HTMLVideoElement;
  bounds: L.LatLngBoundsExpression;
}>;

const _VideoOverlay = React.forwardRef(function VideoOverlay(props: VideoOverlayProps, ref: React.ForwardedRef<L.VideoOverlay | undefined>): ReactElement {
  const { children, video, bounds, ...options } = props;

  const _video = useRef(video);
  const _bounds = useRef(bounds);
  const _options = useRef(options);

  const [instance, setInstance] = useState<L.VideoOverlay>();

  useEffect(() => {
    setInstance(new L.VideoOverlay(_video.current, _bounds.current, _options.current));
  }, []);

  useVideoOverlay(instance, video, bounds, options);

  useImperativeHandle(ref, () => instance, [instance]);

  if (!instance) {
    return <></>;
  }
  
  return (
    <VideoOverlayContextProvider value={instance}>
      {children}
    </VideoOverlayContextProvider>
  );
});

export const VideoOverlay = React.memo(_VideoOverlay) as React.ForwardRefExoticComponent<VideoOverlayProps & React.RefAttributes<L.VideoOverlay | undefined>>;