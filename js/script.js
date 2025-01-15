import {getStorage, getExapleData} from './modules/serviceStorage.js';
import control from './modules/control.js';
import {renderGoods} from './modules/render.js';
import {modalForm} from './modules/elements.js';

const {
  closeModal,
  getTotalPrice,
  modalOverlayControl,
  formControl,
  getBtnPic,
} = control;

const init = () => {
  getExapleData();
  closeModal();
  renderGoods(getStorage('goods'));
  getTotalPrice(getStorage('goods'));
  modalOverlayControl();
  formControl(modalForm, 'goods');
  getBtnPic();
};

init();
