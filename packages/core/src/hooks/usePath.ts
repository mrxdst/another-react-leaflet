import L from 'leaflet';
import { useContext, useEffect, useMemo } from 'react';
import { FeatureGroupStyleContext } from '../context';
import { getDefaultOptions } from '../util';
import { EventedProps } from './useEvented';
import { useLayer } from './useLayer';

export type StyleOptions = Omit<L.PathOptions, keyof L.InteractiveLayerOptions>;

export function usePath(instance: L.Path | undefined, options: L.PathOptions & EventedProps): void {
  useLayer(instance, options);

  const styles = useMemoizedStyles(options);

  const featureGroupStyle = useContext(FeatureGroupStyleContext);

  useEffect(() => {
    if (!instance) {
      return;
    }
    const defaultOptions = getDefaultOptions(instance);
    instance.setStyle({
      stroke:      styles.stroke      ?? featureGroupStyle?.stroke      ?? defaultOptions.stroke,
      color:       styles.color       ?? featureGroupStyle?.color       ?? defaultOptions.color,
      weight:      styles.weight      ?? featureGroupStyle?.weight      ?? defaultOptions.weight,
      opacity:     styles.opacity     ?? featureGroupStyle?.opacity     ?? defaultOptions.opacity,
      lineCap:     styles.lineCap     ?? featureGroupStyle?.lineCap     ?? defaultOptions.lineCap,
      lineJoin:    styles.lineJoin    ?? featureGroupStyle?.lineJoin    ?? defaultOptions.lineJoin,
      dashArray:   styles.dashArray   ?? featureGroupStyle?.dashArray   ?? defaultOptions.dashArray,
      dashOffset:  styles.dashOffset  ?? featureGroupStyle?.dashOffset  ?? defaultOptions.dashOffset,
      fill:        styles.fill        ?? featureGroupStyle?.fill        ?? defaultOptions.fill,
      fillColor:   styles.fillColor   ?? featureGroupStyle?.fillColor   ?? defaultOptions.fillColor,
      fillOpacity: styles.fillOpacity ?? featureGroupStyle?.fillOpacity ?? defaultOptions.fillOpacity,
      fillRule:    styles.fillRule    ?? featureGroupStyle?.fillRule    ?? defaultOptions.fillRule,
      renderer:    styles.renderer    ?? featureGroupStyle?.renderer    ?? defaultOptions.renderer,
      className:   styles.className   ?? featureGroupStyle?.className   ?? defaultOptions.className,
    });
  }, [
    instance,
    styles,
    featureGroupStyle,
  ]);
}

export function useMemoizedStyles(options: StyleOptions): StyleOptions {
  return useMemo(() => ({
    stroke: options.stroke,
    color: options.color,
    weight: options.weight,
    opacity: options.opacity,
    lineCap: options.lineCap,
    lineJoin: options.lineJoin,
    dashArray: options.dashArray,
    dashOffset: options.dashOffset,
    fill: options.fill,
    fillColor: options.fillColor,
    fillOpacity: options.fillOpacity,
    fillRule: options.fillRule,
    renderer: options.renderer,
    className: options.className,
  }), [
    options.stroke,
    options.color,
    options.weight,
    options.opacity,
    options.lineCap,
    options.lineJoin,
    options.dashArray,
    options.dashOffset,
    options.fill,
    options.fillColor,
    options.fillOpacity,
    options.fillRule,
    options.renderer,
    options.className,
  ]);
}