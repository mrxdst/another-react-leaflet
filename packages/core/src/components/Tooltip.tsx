import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { LayerContext } from '../context';
import { EventedProps, useEvented } from '../hooks/useEvented';

export type TooltipProps = React.PropsWithChildren<L.TooltipOptions & EventedProps & {
  onOpen?: L.LeafletEventHandlerFnMap['tooltipopen'],
  onClose?: L.LeafletEventHandlerFnMap['tooltipclose'],
}>;

const _Tooltip = React.forwardRef(function Tooltip(props: TooltipProps, ref: React.ForwardedRef<L.Tooltip | undefined>): ReactElement {
  const { children, onOpen, onClose, ...options } = props;

  const _options = useRef(options);

  const context = useContext(LayerContext);

  const [instance, setInstance] = useState<L.Tooltip>();

  const divRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    if (!context) {
      return;
    }
    context.bindTooltip(divRef.current, _options.current);
    setInstance(context.getTooltip());

    return () => {
      context.unbindTooltip();
    };
  }, [context]);

  useEvented(instance, options);

  useEffect(() => {
    if (!context || !onOpen) {
      return;
    }
    context.addEventListener('tooltipopen', onOpen);
    return () => {
      context.removeEventListener('tooltipopen', onOpen);
    };
  }, [context, onOpen]);

  useEffect(() => {
    if (!context || !onClose) {
      return;
    }
    context.addEventListener('tooltipclose', onClose);
    return () => {
      context.removeEventListener('tooltipclose', onClose);
    };
  }, [context, onClose]);

  useImperativeHandle(ref, () => instance, [instance]);
  
  return ReactDOM.createPortal(children, divRef.current);
  return <></>; // :)
});

export const Tooltip = React.memo(_Tooltip) as React.ForwardRefExoticComponent<TooltipProps & React.RefAttributes<L.Tooltip | undefined>>;