import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useImageOverlay } from './useImageOverlay';

export function useVideoOverlay(instance: L.VideoOverlay | undefined, video: string | string[] | HTMLVideoElement, bounds: L.LatLngBoundsExpression, options: L.VideoOverlayOptions & EventedProps): void {
  useImageOverlay(instance as L.ImageOverlay, video as string, bounds, options);
}