import L from 'leaflet';
import { useEffect } from 'react';

const EVENT_MAP = {
  onBaseLayerChange: 'baselayerchange',
  onOverlayAdd: 'overlayadd',
  onOverlayRemove: 'overlayremove',
  onLayerAdd: 'layeradd',
  onLayerRemove: 'layerremove',
  onZoomLevelsChange: 'zoomlevelschange',
  onUnload: 'unload',
  onViewReset: 'viewreset',
  onLoad: 'load',
  onZoomStart: 'zoomstart',
  onMoveStart: 'movestart',
  onZoom: 'zoom',
  onMove: 'move',
  onZoomEnd: 'zoomend',
  onMoveEnd: 'moveend',
  onAutoPanStart: 'autopanstart',
  onDragStart: 'dragstart',
  onDrag: 'drag',
  onAdd: 'add',
  onRemove: 'remove',
  onLoading: 'loading',
  onError: 'error',
  onUpdate: 'update',
  onDown: 'down',
  onPreDrag: 'predrag',
  onResize: 'resize',
  onPopupOpen: 'popupopen',
  onPopupClose: 'popupclose',
  onTooltipOpen: 'tooltipopen',
  onTooltipClose: 'tooltipclose',
  onLocationError: 'locationerror',
  onLocationFound: 'locationfound',
  onClick: 'click',
  onDblClick: 'dblclick',
  onMouseDown: 'mousedown',
  onMouseUp: 'mouseup',
  onMouseOver: 'mouseover',
  onMouseOut: 'mouseout',
  onMouseMove: 'mousemove',
  onContextMenu: 'contextmenu',
  onPreClick: 'preclick',
  onKeyPress: 'keypress',
  onKeyDown: 'keydown',
  onKeyUp: 'keyup',
  onZoomAnim: 'zoomanim',
  onDragEnd: 'dragend',
  onTileUnload: 'tileunload',
  onTileLoadStart: 'tileloadstart',
  onTileLoad: 'tileload',
  onTileError: 'tileerror',
} as const;

type EventMap = typeof EVENT_MAP;

// Validates that all events are mapped
// type LeafletEvents = keyof LeafletEventHandlerFnMap;
// type MappedEvents = EventMap[keyof EventMap];
// type Validator1<T extends MappedEvents> = T;
// type Validator2<T extends LeafletEvents> = T;
// type Valid1 = Validator1<LeafletEvents>;
// type Valid2 = Validator2<MappedEvents>;

export type EventedProps = {
  [Key in keyof EventMap]?: L.LeafletEventHandlerFnMap[EventMap[Key]];
}

export function useEvented(instance: L.Evented | undefined, options: EventedProps): void {
  for (const [_reactName, _leafletName] of Object.entries(EVENT_MAP)) {
    const reactName = _reactName as keyof EventMap;
    const leafletName = _leafletName as string;
    const handler = options[reactName] as ((event: L.LeafletEvent) => void) | undefined;

    // This is safe because the loop is the same every time
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      if (!instance || !handler) {
        return;
      }
      instance.addEventListener(leafletName, handler);
      
      return () => {
        instance.removeEventListener(leafletName, handler);
      };
    }, [instance, reactName, leafletName, handler]);
  }
}