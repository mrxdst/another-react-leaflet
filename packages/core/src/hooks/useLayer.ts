import L from 'leaflet';
import { useContext, useEffect } from 'react';
import { LayerGroupContext, LayersControlNameTypeContext, LayersControlContext, MapContext } from '../context';
import { EventedProps, useEvented } from './useEvented';

export function useLayer(instance: L.Layer | undefined, options: L.LayerOptions & EventedProps): void {
  useEvented(instance, options);

  const context = [useContext(LayerGroupContext), useContext(MapContext)].find(c => c);

  useEffect(() => {
    if (!context || !instance) {
      return;
    }
    instance.addTo(context);

    return () => {
      instance.removeFrom(context as L.Map);
    };
  }, [context, instance]);


  const layersControlContext = useContext(LayersControlContext);
  const nameTypeContext = useContext(LayersControlNameTypeContext);

  useEffect(() => {
    if (!layersControlContext || !instance || !nameTypeContext) {
      return;
    }

    const [name, type] = nameTypeContext;

    switch (type) {
      case 'baseLayer':
        layersControlContext.addBaseLayer(instance, name);
        break;
      case 'overlay':
        layersControlContext.addOverlay(instance, name);
        break;
    }
    
    return () => {
      switch (type) {
        case 'baseLayer':
          layersControlContext.removeLayer(instance);
          break;
        case 'overlay':
          layersControlContext.removeLayer(instance);
          break;
      }
    };
  }, [layersControlContext, instance, nameTypeContext]);
}