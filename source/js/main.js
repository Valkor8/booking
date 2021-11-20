import './random.js';
import './object.js';
import './util.js';
import './generation.js';
import './map.js';
import './validation.js';
import './upload.js';
import './load.js';
import './map-filter.js';
import { loadData } from './load.js';
import { getPoints } from './map.js';
import {renderFilter} from './map-filter.js';


loadData( (data) => {
  getPoints(data);
  renderFilter(() => getPoints(data));
});

