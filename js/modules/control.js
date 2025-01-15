import {createRow} from './createElement.js';
import {getStorage, setStorage, removeStorage} from './serviceStorage.js';
import {renderGoods} from './render.js';
import {
  modalDiscountCheckbox,
  modalDiscountInputText,
  statusOverlay,
  panelAddGood,
  tableBody,
  vendorCodeId,
  cmsTotalPrice,
  modalForm,
} from './elements.js';

export const functionTotalPrice = (price, discont, count) => {
  return Math.round(price * (1 - discont * 0.01) * count * 100) / 100;
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

  modalForm.addEventListener('change', () => {
    modalForm.total.value = `$ ${
      functionTotalPrice(modalForm.price.value, modalForm.discount_count.value, modalForm.count.value)}`;
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

const getBtnPic = () => {
  const form = document.querySelector('.table__body');
  const centerWidth =  screen.width / 2 - 400;
  const centerHeight = screen.height / 2 - 300;

  form.addEventListener('click', e => {
    const btnPic = e.target.closest('.table__btn_pic');
    if (btnPic) {
      const src = btnPic.getAttribute('data-pic');
      const win = open(src, '', 'width=800,height=600');
      win.moveTo(centerWidth, centerHeight);
    };    
  });
};


export default {
  closeModal,
  getTotalPrice,
  modalOverlayControl,
  formControl,
  getBtnPic,
};