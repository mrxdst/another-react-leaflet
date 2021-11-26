import React, { ReactElement, useMemo } from 'react';
import { LayersControlNameTypeContext } from '../context';

export type LayersControlBaseLayerProps = {
  name: string;
  children: ReactElement;
};

export function LayersControlBaseLayer(props: LayersControlBaseLayerProps): ReactElement {
  const { children, name } = props;

  const value = useMemo((): [string, 'baseLayer'] => ([name, 'baseLayer']), [name]);

  return (
    <LayersControlNameTypeContext.Provider value={value}>
      {children}
    </LayersControlNameTypeContext.Provider>
  );
}