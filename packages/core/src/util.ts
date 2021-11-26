import L from 'leaflet';

type Instance = L.Class & { options: object };

export function getDefaultOptions<T extends Instance>(instance: T): Required<T['options']> {
  return (instance.constructor.prototype as Instance).options as Required<T['options']>;
}
