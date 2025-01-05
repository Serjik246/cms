import {functionTotalPrice} from './control.js';

export const createRow = (obj, i) => {
  const table = document.querySelector('.table__body');
  const row = document.createElement('tr');

  const getCell = (text) => {
    const cell = document.createElement('td');
    cell.className = 'table__cell';
    cell.textContent = text;
    return cell
  };

  const id = getCell(i);

  const title = getCell(obj.title);
  title.className += ' table__cell_left table__cell_name';
  title.setAttribute('data-id', obj.id);
  const spanId = document.createElement('span');
  spanId.className = 'table__cell-id';
  spanId.textContent = `id: ${obj.id}`
  title.insertAdjacentElement('afterbegin', spanId)

  const category = getCell(obj.category);
  category.className += ' table__cell_left'

  const units = getCell(obj.units);

  const count = getCell(obj.count);

  const price = getCell(`$${functionTotalPrice(obj.price, obj.discont, 1)}`);

  const sum = getCell(`$${functionTotalPrice(obj.price, obj.discont, obj.count)}`);

  const button = getCell('');
  const getButton = (className) => {
    const buttonTag = document.createElement('button');
    buttonTag.className = 'table__btn';
    buttonTag.className += ` ${className}`;
    return buttonTag;
  };
  const btnPic = getButton('table__btn_pic');
  const btnEdit = getButton('table__btn_edit');
  const btnDel = getButton('table__btn_del');
  button.className += ' table__cell_btn-wrapper';

  button.append(btnPic, btnEdit, btnDel);

  row.append(id, title, category, units, count, price, sum, button);

  table.appendChild(row)

  return table;
};