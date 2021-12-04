'use stirct';
/* global _:readonly */
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

const getFnLoadData = () => {
  return () => {
    loadData( (data) => {
      getPoints(data);
      renderFilter(_.debounce(
        () => getPoints(data),
        RENDERER_DELAY));
    });
  }
}

const fnloadData = getFnLoadData ();

export {RENDERER_DELAY, fnloadData};

