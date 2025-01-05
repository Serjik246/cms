import {createRow} from './createElement.js';
import {getStorage, setStorage, removeStorage} from './serviceStorage.js';
import {renderGoods} from './render.js';

const modalDiscountCheckbox = document.querySelector('.modal__checkbox-wrapper .modal__checkbox');
const modalDiscountInputText = document.querySelector('.modal__checkbox-wrapper .modal__input_discount');
const statusOverlay = document.querySelector('.overlay');
const panelAddGood = document.querySelector('.panel__add-goods');
const tableBody = document.querySelector('.table__body');
const vendorCodeId = document.querySelector('.vendor-code__id');
const cmsTotalPrice = document.querySelector('.cms__total-price');

export const functionTotalPrice = (price, discont, count) => {
  return price * (1 - discont * 0.01) * count;
};

const closeModal = () => {
  statusOverlay.classList.remove('active');
};

const getTotalPrice = (arr) => {
  const total = arr.reduce((acc, item) => {
    return acc + (functionTotalPrice(item.price, item.discont, item.count));
  }, 0);
  cmsTotalPrice.textContent = `$ ${total}`;
};

const modalOverlayControl = () => {
  const modalInput = document.querySelectorAll('.modal__input');

  for (const elem of modalInput) {
    elem.setAttribute('required', '');
    if (['price', 'count', 'discount_count'].includes(elem.getAttribute('name'))) {
      elem.setAttribute('type', 'number');
    };
  };

  panelAddGood.addEventListener('click', () => {
    statusOverlay.classList.add('active');
    vendorCodeId.textContent = Math.floor(Math.random() * 100000);
  });

  statusOverlay.addEventListener('click', e => {
    const target = e.target;
    if (target === statusOverlay ||
      target.closest('.modal__close')) {
      closeModal();
    };
  });

  modalDiscountCheckbox.addEventListener('click', () => {
    modalDiscountInputText.toggleAttribute('disabled');
    if (modalDiscountInputText.disabled) {
      modalDiscountInputText.value = '';
    };
  });

  tableBody.addEventListener('click', e => {
    const target = e.target;
  
    if (target.closest('.table__btn_del')) {
      const goodId = Number(target.closest('tr').children[1].attributes[1].textContent);
      const allContainers = tableBody.querySelectorAll('tr');
      removeStorage(goodId, 'goods');
      allContainers.forEach((val) => val.remove());
      renderGoods(getStorage('goods'));
      getTotalPrice(getStorage('goods'));
      console.log(getStorage('goods'));
    };
  });
}; 

const formControl = (form, arr) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const newGood = Object.fromEntries(formData);
    newGood.title = newGood.name;
    newGood.discont = newGood.discount_count ? newGood.discount_count : 0;
    newGood.id = Number(vendorCodeId.textContent);

    setStorage(arr, newGood);
    createRow(newGood, getStorage(arr).length);
    form.reset();
    if (!modalDiscountInputText.attributes.disabled) {
      modalDiscountInputText.setAttribute('disabled', '');
    };
    closeModal();
    getTotalPrice(getStorage(arr));
  });
};

export default {
  closeModal,
  getTotalPrice,
  modalOverlayControl,
  formControl,
};