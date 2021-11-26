import L from 'leaflet';
import { useEffect } from 'react';
import { getDefaultOptions } from '../util';
import { useControl } from './useControl';

export function useAttributionControl(instance: L.Control.Attribution | undefined, options: L.Control.AttributionOptions): void {
  useControl(instance, options);

  useEffect(() => {
    instance?.setPrefix((options.prefix ?? getDefaultOptions(instance).prefix) as string | false);
  }, [instance, options.prefix]);
}