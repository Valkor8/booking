'use stirct';

const adForm = document.querySelector('.ad-form');
const formTitle = adForm.querySelector('#title');
const typeHomeSelect = adForm.querySelector('#type');
const priceHomeInput = adForm.querySelector('#price');
const inputAdForm = adForm.querySelectorAll('input');
const button = document.querySelector('.ad-form__submit');

const MIN_LENGTH = 30;
const MAX_LENGTH = 100;

const inputErrorValidation = () => {
  inputAdForm.forEach( (input) => {
    if(input.validity.valid === false) {
      input.classList.add('input-invalid');
    } else {
      input.classList.remove('input-invalid');
    }
  })
}

button.addEventListener('click', inputErrorValidation)

formTitle.addEventListener('input', () => {
  if(formTitle.classList.contains('input-invalid')) {
    formTitle.classList.remove('input-invalid')
  }
  const valueLength = formTitle.value.length;
  if(formTitle.validity.tooShort) {
    formTitle.setCustomValidity('Еще ' + (MIN_LENGTH - valueLength) + ' симв.');
  } else if(formTitle.validity.tooLong) {
    formTitle.setCustomValidity('Заголовок не должен быть длинее ' + MAX_LENGTH + ' символов');
  } else if (formTitle.validity.valueMissing) {
    formTitle.setCustomValidity('Обязательное поле');
  } else {
    formTitle.setCustomValidity('');
  }

  formTitle.reportValidity();
});

priceHomeInput.addEventListener('input', () => {
  if(priceHomeInput.classList.contains('input-invalid')) {
    priceHomeInput.classList.remove('input-invalid');
  }
});

typeHomeSelect.addEventListener('change', () => {
  if(typeHomeSelect.value == 'bungalow') {
    priceHomeInput.placeholder = 0;
    priceHomeInput.setAttribute('min', 0);
  } else if (typeHomeSelect.value == 'flat') {
    priceHomeInput.placeholder = 1000;
    priceHomeInput.setAttribute('min', 1000);
  } else if (typeHomeSelect.value == 'house') {
    priceHomeInput.placeholder = 5000;
    priceHomeInput.setAttribute('min', 5000);
  } else if (typeHomeSelect.value == 'palace') {
    priceHomeInput.placeholder = 10000;
    priceHomeInput.setAttribute('min', 10000);
  }
});

const timeIn = adForm.querySelector('#timein');
const timeOut = adForm.querySelector('#timeout');

timeIn.addEventListener('change', () => {
  if(timeIn.value == '12:00') {
    timeOut.value = '12:00';
  } else if(timeIn.value == '13:00') {
    timeOut.value = '13:00';
  } else if(timeIn.value == '14:00') {
    timeOut.value = '14:00';
  }
});

timeOut.addEventListener('change', () => {
  if(timeOut.value == '12:00') {
    timeIn.value = '12:00';
  } else if(timeOut.value == '13:00') {
    timeIn.value = '13:00';
  } else if(timeOut.value == '14:00') {
    timeIn.value = '14:00';
  }
});

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');

const optionHidden = (elem) => {
  elem.style.display = 'none';
}

const optionShow = (elem) => {
  elem.style.display = 'block';
}

const capacityOptionReset = () => {
  return capacityOption.forEach( (elem) => {
    if(+elem.value === 0 || +elem.value === 2 || +elem.value === 3) {
      optionHidden(elem);
    } else {
      optionShow(elem);
    }
  });
}

capacityOptionReset();

roomNumber.addEventListener('change', (evt) => {

  if(parseInt(evt.target.value) === 1) {
    capacityOption.forEach( (elem) => {
      if(parseInt(elem.value) === 0 || parseInt(elem.value) === 2 || parseInt(elem.value) === 3) {
        optionHidden(elem);
      } else {
        capacity.value = 1;
        optionShow(elem);
      }
    });
  }
  if (+evt.target.value === 2) {
    capacityOption.forEach( (elem) => {
      if(+elem.value === 0 || +elem.value === 3) {
        optionHidden(elem);
      } else {
        capacity.value = 2;
        optionShow(elem);
      }
    });
  }
  if (evt.target.value == 3) {
    capacity.value = 3;
    capacityOption.forEach( (elem) => {
      if(+elem.value === 0) {
        optionHidden(elem);
      } else {
        optionShow(elem);
      }
    });
  }
  if (parseInt(evt.target.value) === 100) {
    capacityOption.forEach( (elem) => {
      if(+elem.value === 1 || +elem.value === 2 || +elem.value === 3) {
        optionHidden(elem);
      } else {
        capacity.value = 0;
        optionShow(elem);
      }
    });
  }
});

export { capacityOptionReset };
