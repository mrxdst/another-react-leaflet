import React, { ReactElement, useMemo } from 'react';
import { LayersControlNameTypeContext } from '../context';

export type LayersControlOverlayProps = {
  name: string;
  children: ReactElement;
};

export function LayersControlOverlay(props: LayersControlOverlayProps): ReactElement {
  const { children, name } = props;

  const value = useMemo((): [string, 'overlay'] => ([name, 'overlay']), [name]);

  return (
    <LayersControlNameTypeContext.Provider value={value}>
      {children}
    </LayersControlNameTypeContext.Provider>
  );
}