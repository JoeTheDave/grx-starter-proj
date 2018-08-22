import { create } from 'jss';
import nested from 'jss-nested';
import compose from 'jss-compose';
import camelCase from 'jss-camel-case';
import defaultUnit from 'jss-default-unit';
import expand from 'jss-expand';
import vendorPrefixer from 'jss-vendor-prefixer';
import propsSort from 'jss-props-sort';

const defaultUnitOverrides = {
  'animation-delay': '',
  'animation-duration': '',
  'perspective-origin-x': '',
  'perspective-origin-y': '',
  'transform-origin': '',
  'transform-origin-x': '',
  'transform-origin-y': '',
  'transform-origin-z': '',
  'transition-delay': '',
  'transition-duration': '',
  'line-height': 'px',
};

const jssInstance = create({
  plugins: [
    // Order matters!
    // https://github.com/cssinjs/jss/blob/master/docs/plugins.md#order-does-matter
    nested(),
    compose(),
    camelCase(),
    defaultUnit(defaultUnitOverrides),
    expand(),
    vendorPrefixer(),
    propsSort(),
  ],
});

export default jssInstance;
