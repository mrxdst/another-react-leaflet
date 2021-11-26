import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useImageOverlay } from './useImageOverlay';

export function useSVGOverlay(instance: L.SVGOverlay | undefined, svgImage: string | SVGElement, bounds: L.LatLngBoundsExpression, options: L.ImageOverlayOptions & EventedProps): void {
  useImageOverlay(instance as L.ImageOverlay, svgImage as string, bounds, options);
}