const FILE_TYPES = ['.png', '.jpg', '.jpeg', '.gif'];

const fileChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const fileImageHouse = document.querySelector('#images');
const housePreview = document.querySelector('.ad-form__photo');
const buttonReset = document.querySelector('.ad-form__photo-reset');
const MAX_IMAGE = 5;

const getPreview = (inputFile, preview) => {
  inputFile.addEventListener('change', () => {
    const file = inputFile.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it)
    })

    if(matches) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        preview.src = reader.result
      });

      reader.readAsDataURL(file);
    }
  })
};

getPreview(fileChooser, avatarPreview);


fileImageHouse.addEventListener('change', () => {
  const files = fileImageHouse.files;
  if(files.length > MAX_IMAGE) {
    alert(`Выберите не больше ${MAX_IMAGE} изображений`);
    return
  }

  buttonReset.addEventListener('click', (evt) => {
    evt.preventDefault();
    housePreview.textContent = '';
  });

  Object.values(files).forEach( (file) => {
    const fileName = file.name.toLowerCase();
    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it)
    });

    if(matches) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        if(housePreview.children.length >= MAX_IMAGE) {
          return
        }
        const img = document.createElement('img');
        img.setAttribute('src', '');
        img.setAttribute('width', '60');
        img.setAttribute('height', '60');

        img.src = reader.result
        housePreview.appendChild(img);
      });

      reader.readAsDataURL(file);
    }
  });
})

export {housePreview};
