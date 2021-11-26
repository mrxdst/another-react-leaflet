import L from 'leaflet';
import { useEffect } from 'react';
import { getDefaultOptions } from '../util';
import { EventedProps } from './useEvented';
import { useLayer } from './useLayer';

export function useImageOverlay(instance: L.ImageOverlay | undefined, imageUrl: string, bounds: L.LatLngBoundsExpression, options: L.ImageOverlayOptions & EventedProps): void {
  useLayer(instance, options);

  useEffect(() => {
    instance?.setUrl(imageUrl);
  }, [instance, imageUrl]);

  useEffect(() => {
    instance?.setBounds(bounds instanceof L.LatLngBounds ? bounds : new L.LatLngBounds(bounds));
  }, [instance, bounds]);

  useEffect(() => {
    instance?.setZIndex(options.zIndex ?? getDefaultOptions(instance).zIndex);
  }, [instance, options.zIndex]);
}