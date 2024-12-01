'use strict'

// 1 задание
const statusOverlay = document.querySelector('.overlay');

statusOverlay.classList.remove('active');

// 2 задание

const test_object = {
    id: 24601654816512,
    title: 'Телевизор DEXP',
    category: 'Техника для дома',
    unit: 'шт',
    count: 15,
    price: 1000,

}

const createRow = (obj) => {
    const row = document.createElement('tr');
    
};

<tr>
                <td class="table__cell ">2</td>
                <td class="table__cell table__cell_left table__cell_name" data-id="24601654816512">
                  <span class="table__cell-id">id: 24601654816512</span>Телевизор DEXP</td>
                <td class="table__cell table__cell_left">Техника для дома</td>
                <td class="table__cell">шт</td>
                <td class="table__cell">15</td>
                <td class="table__cell">$1000</td>
                <td class="table__cell">$15000</td>
                <td class="table__cell table__cell_btn-wrapper">
                  <button class="table__btn table__btn_pic"></button>
                  <button class="table__btn table__btn_edit"></button>
                  <button class="table__btn table__btn_del"></button>
                </td>
              </tr>