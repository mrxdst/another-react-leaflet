import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useLayerGroup } from './useLayerGroup';
import { StyleOptions } from './usePath';

export function useFeatureGroup(instance: L.FeatureGroup | undefined, options: L.LayerOptions & StyleOptions & EventedProps): void {
  useLayerGroup(instance, options);
}