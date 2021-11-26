import L from 'leaflet';
import { useContext, useEffect } from 'react';
import { MapContext } from '../context';
import { getDefaultOptions } from '../util';

export function useControl(instance: L.Control | undefined, options: L.ControlOptions): void {
  const context = useContext(MapContext);

  useEffect(() => {
    if (!context || !instance) {
      return;
    }
    instance.addTo(context);

    return () => {
      instance.remove();
    };
  }, [context, instance]);

  useEffect(() => {
    instance?.setPosition(options.position ?? getDefaultOptions(instance).position);
  }, [instance, options.position]);
}