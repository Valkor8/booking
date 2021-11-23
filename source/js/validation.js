const adForm = document.querySelector('.ad-form');
const formTitle = adForm.querySelector('#title');
const typeHomeSelect = adForm.querySelector('#type');
const priceHomeInput = adForm.querySelector('#price');
const inputAdForm = adForm.querySelectorAll('input');
const button = document.querySelector('.ad-form__submit');

// console.log(inputAdForm)


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

// priceHomeInput.addEventListener('input', () => {
//   if(priceHomeInput.classList.contains('input-invalid')) {
//     priceHomeInput.classList.remove('input-invalid');
//   }
//   if(priceHomeInput.validity.rangeUnderflow) {
//     priceHomeInput.setCustomValidity('Цена меньше минимально допустимой');
//   } else if(priceHomeInput.validity.rangeOverflow) {
//     priceHomeInput.setCustomValidity('Цена выше максимально допустимой');
//   } else if(priceHomeInput.validity.valueMissing) {
//     priceHomeInput.setCustomValidity('Укажите желаемую цену');
//   } else {
//     priceHomeInput.setCustomValidity('');
//   }

//   priceHomeInput.reportValidity();
// });


const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

timein.addEventListener('change', () => {
  if(timein.value == '12:00') {
    timeout.value = '12:00';
  } else if(timein.value == '13:00') {
    timeout.value = '13:00';
  } else if(timein.value == '14:00') {
    timeout.value = '14:00';
  }
});

timeout.addEventListener('change', () => {
  if(timeout.value == '12:00') {
    timein.value = '12:00';
  } else if(timeout.value == '13:00') {
    timein.value = '13:00';
  } else if(timeout.value == '14:00') {
    timein.value = '14:00';
  }
});

const roomNumber = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');
const capacityOption = capacity.querySelectorAll('option');

capacityOption.forEach( (elem) => {
  if(elem.value == 0 || elem.value == 2 || elem.value == 3) {
    elem.style.display = 'none';
    elem.removeAttribute('selected');
  } else {
    elem.removeAttribute('selected');
    elem.style.display = 'block';
    elem.setAttribute('selected', '');
  }
});

roomNumber.addEventListener('click', (evt) => {
  if(evt.target.value == 1) {
    capacityOption.forEach( (elem) => {
      if(elem.value == 0 || elem.value == 2 || elem.value == 3) {
        elem.style.display = 'none';
        elem.removeAttribute('selected');
      } else {
        elem.removeAttribute('selected');
        elem.style.display = 'block';
        elem.setAttribute('selected', '');
      }
    });
  } else if (evt.target.value == 2) {
    capacityOption.forEach( (elem) => {
      if(elem.value == 0 || elem.value == 3) {
        elem.style.display = 'none';
        elem.removeAttribute('selected');
      } else {
        elem.style.display = 'block';
        elem.setAttribute('selected', '');
      }
    });
  } else if (evt.target.value == 3) {
    capacityOption.forEach( (elem) => {
      if(elem.value == 0) {
        elem.style.display = 'none';
        elem.removeAttribute('selected');
      } else {
        elem.style.display = 'block';
        elem.setAttribute('selected', '');
      }
    });
  } else if (evt.target.value == 100) {
    capacityOption.forEach( (elem) => {
      if(elem.value == 1 || elem.value == 2 || elem.value == 3) {
        elem.style.display = 'none';
        elem.removeAttribute('selected');
      } else {
        elem.style.display = 'block';
        elem.setAttribute('selected', '');
      }
    });
  }
});

