import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState } from 'react';
import L from 'leaflet';
import { FeatureGroupContextProvider, FeatureGroupStyleContext } from '../context';
import { EventedProps } from '../hooks/useEvented';
import { useFeatureGroup } from '../hooks/useFeatureGroup';
import { StyleOptions, useMemoizedStyles } from '../hooks/usePath';

export type FeatureGroupProps = React.PropsWithChildren<L.LayerOptions & StyleOptions & EventedProps>;

const _FeatureGroup = React.forwardRef(function FeatureGroup(props: FeatureGroupProps, ref: React.ForwardedRef<L.FeatureGroup | undefined>): ReactElement {
  const { children, ...options } = props;

  const _options = useRef(options);

  const [instance, setInstance] = useState<L.FeatureGroup>();

  useEffect(() => {
    setInstance(new L.FeatureGroup(undefined, _options.current));
  }, []);

  useFeatureGroup(instance, options);

  useImperativeHandle(ref, () => instance, [instance]);

  const style = useMemoizedStyles(options);

  if (!instance) {
    return <></>;
  }
  
  return (
    <FeatureGroupContextProvider value={instance}>
      <FeatureGroupStyleContext.Provider value={style}>
        {children}
      </FeatureGroupStyleContext.Provider>
    </FeatureGroupContextProvider>
  );
});

export const FeatureGroup = React.memo(_FeatureGroup) as React.ForwardRefExoticComponent<FeatureGroupProps & React.RefAttributes<L.FeatureGroup | undefined>>;