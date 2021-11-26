'use stirct';
/* global _:readonly */
import './random.js';
// import './object.js';
// import './util.js';
// import './generation.js';
import './load.js';
import './map.js';
import './validation.js';
import './upload.js';
import './map-filter.js';
import './preview.js';
import { loadData } from './load.js';
import { getPoints } from './map.js';
import {renderFilter} from './map-filter.js';

const RENDERER_DELAY = 500;

loadData( (data) => {
  getPoints(data);
  renderFilter(_.debounce(
    () => getPoints(data),
    RENDERER_DELAY));
});

export {RENDERER_DELAY};
