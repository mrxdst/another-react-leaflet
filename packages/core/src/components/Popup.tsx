import React, { ReactElement, useEffect, useRef, useImperativeHandle, useState, useContext } from 'react';
import ReactDOM from 'react-dom';
import L from 'leaflet';
import { LayerContext } from '../context';
import { EventedProps, useEvented } from '../hooks/useEvented';

export type PopupProps = React.PropsWithChildren<L.PopupOptions & EventedProps & {
  onOpen?: L.LeafletEventHandlerFnMap['popupopen'],
  onClose?: L.LeafletEventHandlerFnMap['popupclose'],
}>;

const _Popup = React.forwardRef(function Popup(props: PopupProps, ref: React.ForwardedRef<L.Popup | undefined>): ReactElement {
  const { children, onOpen, onClose, ...options } = props;

  const _options = useRef(options);

  const context = useContext(LayerContext);

  const [instance, setInstance] = useState<L.Popup>();

  const divRef = useRef<HTMLDivElement>(document.createElement('div'));

  useEffect(() => {
    if (!context) {
      return;
    }
    context.bindPopup(divRef.current, _options.current);
    setInstance(context.getPopup());

    return () => {
      context.unbindPopup();
    };
  }, [context]);

  useEvented(instance, options);

  useEffect(() => {
    if (!context || !onOpen) {
      return;
    }
    context.addEventListener('popupopen', onOpen);
    return () => {
      context.removeEventListener('popupopen', onOpen);
    };
  }, [context, onOpen]);

  useEffect(() => {
    if (!context || !onClose) {
      return;
    }
    context.addEventListener('popupclose', onClose);
    return () => {
      context.removeEventListener('popupclose', onClose);
    };
  }, [context, onClose]);

  useImperativeHandle(ref, () => instance, [instance]);
  
  return ReactDOM.createPortal(children, divRef.current);
  return <></>; // :)
});

export const Popup = React.memo(_Popup) as React.ForwardRefExoticComponent<PopupProps & React.RefAttributes<L.Popup | undefined>>;