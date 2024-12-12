'use strict'

const modalTitle = document.querySelector('.modal_top .modal__title');
const modalForm = document.querySelector('.modal__form');
const modalDiscountCheckbox = document.querySelector('.modal__checkbox-wrapper .modal__checkbox');
const modalDiscountInputText = document.querySelector('.modal__checkbox-wrapper .modal__input_discount');

console.log(modalTitle);
console.log(modalForm);
console.log(modalDiscountCheckbox);
console.log(modalDiscountInputText);

const statusOverlay = document.querySelector('.overlay');

statusOverlay.classList.remove('active');
/*
const test_object = {
    id: 24601654816512,
    title: 'Телевизор DEXP',
    category: 'Техника для дома',
    units: 'шт',
    count: 15,
    price: 1000,
};
*/
const createRow = (obj) => {
    const table = document.querySelector('.table__body');
    const row = document.createElement('tr');

    const getCell = (text) => {
        const cell = document.createElement('td');
        cell.className = 'table__cell';
        cell.textContent = text;
        return cell
    };

    const id = getCell(3);

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

    const price = getCell(`$${obj.price}`);

    const sum = getCell(`$${obj.price * obj.count}`);

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

    return table.appendChild(row)
};
//createRow(test_object);

const goods = [
    {
      "id": 1,
      "title": "Смартфон Xiaomi 11T 8/128GB",
      "price": 27000,
      "description": "Смартфон Xiaomi 11T – это представитель флагманской линейки, выпущенной во второй половине 2021 года. И он полностью соответствует такому позиционированию, предоставляя своим обладателям возможность пользоваться отличными камерами, ни в чем себя не ограничивать при запуске игр и других требовательных приложений.",
      "category": "mobile-phone",
      "discont": false,
      "count": 3,
      "units": "шт",
      "images": {
        "small": "img/smrtxiaomi11t-m.jpg",
        "big": "img/smrtxiaomi11t-b.jpg"
      }
    },
    {
      "id": 2,
      "title": "Радиоуправляемый автомобиль Cheetan",
      "price": 4000,
      "description": "Внедорожник на дистанционном управлении. Скорость 25км/ч. Возраст 7 - 14 лет",
      "category": "toys",
      "discont": 5,
      "count": 1,
      "units": "шт",
      "images": {
        "small": "img/cheetancar-m.jpg",
        "big": "img/cheetancar-b.jpg"
      }
    },
    {
      "id": 3,
      "title": "ТВ приставка MECOOL KI",
      "price": 12400,
      "description": "Всего лишь один шаг сделает ваш телевизор умным, Быстрый и умный MECOOL KI PRO, прекрасно спроектированный, сочетает в себе прочный процессор Cortex-A53 с чипом Amlogic S905D",
      "category": "tv-box",
      "discont": 15,
      "count": 4,
      "units": "шт",
      "images": {
        "small": "img/tvboxmecool-m.jpg",
        "big": "img/tvboxmecool-b.jpg"
      }
    },
    {
      "id": 4,
      "title": "Витая пара PROConnect 01-0043-3-25",
      "price": 22,
      "description": "Витая пара Proconnect 01-0043-3-25 является сетевым кабелем с 4 парами проводов типа UTP, в качестве проводника в которых используется алюминий, плакированный медью CCA. Такая неэкранированная витая пара с одножильными проводами диаметром 0.50 мм широко применяется в процессе сетевых монтажных работ. С ее помощью вы сможете обеспечить развертывание локальной сети в домашних условиях или на предприятии, объединить все необходимое вам оборудование в единую сеть.",
      "category": "cables",
      "discont": false,
      "count": 420,
      "units": "v",
      "images": {
        "small": "img/lan_proconnect43-3-25.jpg",
        "big": "img/lan_proconnect43-3-25-b.jpg"
      }
    }
  ];

const renderGoods = (arr) => {
    arr.forEach(element => {
        return createRow(element);
    });
}
renderGoods(goods);

const addGood = document.querySelector('.panel__add-goods');
const overlayWindow = document.querySelector('.overlay__modal');
const buttonModalClose = document.querySelector('.modal__close');


addGood.addEventListener ('click', () => {
  statusOverlay.classList.add('active');
});

statusOverlay.addEventListener('click', e => {
  const target = e.target;
  if (target === statusOverlay ||
    target.closest('.modal__close')) {
      statusOverlay.classList.remove('active');
  };
});

const tableBody = document.querySelector('.table__body');

const deleteFromBD = (id, arr) => {
  for (let i = 0; i < arr.length; i++) {       
    if(arr[i].id === id) {
      arr.splice(i, 1);
    };         
  }   
};

tableBody.addEventListener('click', e => {
  const target = e.target;
  const goodId = Number(target.closest('tr').children[1].attributes[1].textContent);

  if (target.closest('.table__btn_del')) {
    target.closest('tr').remove();
    deleteFromBD(goodId, goods);

    console.log(goods)
  };
});