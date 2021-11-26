import L from 'leaflet';
import { EventedProps } from './useEvented';
import { useFeatureGroup } from './useFeatureGroup';
import { StyleOptions } from './usePath';

export function useGeoJSON(instance: L.GeoJSON | undefined, options: L.GeoJSONOptions & StyleOptions & EventedProps): void {
  useFeatureGroup(instance, options);
}