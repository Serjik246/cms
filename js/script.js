import {getStorage} from './modules/serviceStorage.js';
import {functionTotalPrice} from './modules/control.js';
import control from './modules/control.js';
import {renderGoods} from './modules/render.js';

const {
  closeModal,
  getTotalPrice,
  modalOverlayControl,
  formControl,
} = control;

const init = () => {
  const modalForm = document.querySelector('.modal__form');
  
  modalForm.addEventListener('change', () => {
    modalForm.total.value = `$ ${
      functionTotalPrice(modalForm.price.value, modalForm.discount_count.value, modalForm.count.value)}`;
  });

  closeModal();
  renderGoods(getStorage('goods'));
  getTotalPrice(getStorage('goods'));
  modalOverlayControl();
  formControl(modalForm, 'goods');
};

init();
