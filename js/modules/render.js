import {createRow} from './createElement.js';

export const renderGoods = (arr) => {
  arr.forEach((element, i) => {
    return createRow(element, i + 1);
  });
};