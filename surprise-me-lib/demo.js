function Widget(config) {
  return {
    start() {
      appendStyles();
      document.querySelector(config.placeholder).append(createOpenModalButton(config));
    }
  }

  function appendStyles() {
    let stylesheet = document.createElement('link');
    stylesheet.setAttribute('href', `http://localhost:3355/modal.css`)
    stylesheet.setAttribute('rel', 'stylesheet');
    document.head.append(stylesheet);
  }
  
  function createOpenModalButton({placeholder_text, placeholder_class = 'placeholder-button', placeholder_wrapper_class = 'placeholder-wrapper'}) {
    let wrapper = document.createElement('div');
    let button = document.createElement('button');

    wrapper.className = placeholder_wrapper_class
    button.className = placeholder_class;
    button.textContent = placeholder_text;

    button.addEventListener('click', openModal);

    wrapper.append(button);
    return wrapper;
  }

  function openModal() {
    document.body.append(createModal());
  }

  function createModal() {
    let modal = document.createElement('div');
    let window = document.createElement('div');

    modal.className = 'modal';
    window.className = 'modal-window';

    modal.addEventListener('click', () => closeModal(modal));
    window.addEventListener('click', (e) => {
      e.stopPropagation()
    });

    modal.append(window);

    window.append(firstPageModalContent(config, window));

    return modal;
  }

  function closeModal(modal) {
    modal.remove();
  }

  function firstPageModalContent({attributes, image}, window) {
    let docFrag = document.createDocumentFragment();
    let img = document.createElement('img');

    img.src = image;
    img.className = 'modal-image';

    docFrag.append(img);
    docFrag.append(modalButton('Surptise me', () => loadingPageModalContent(attributes, window)));
    return docFrag; 
  }
  
  function secondPageModalContent(element, window) {
    window.innerHTML = '';
    let heading = document.createElement('h1');

    heading.textContent = `Your color is "${element}"!`;
    heading.className = 'modal-heading';

    window.append(heading);
    window.append(modalButton('Select me', () => {
      document.querySelector('.modal').remove();
      config.select_attribute(element);
    }));
  }

  function modalButton(text, func) {
    let btn = document.createElement('button');
    btn.textContent = text;
    btn.className = 'modal-button'
    btn.addEventListener('click', func)
    return btn
  } 

  function loadingPageModalContent(attributes, window) {
    window.innerHTML = '';
    
    let loadingIcon = document.createElement('div');
    loadingIcon.className = 'modal-loading-icon';
    
    window.append(loadingIcon);
    const SELECTED_ELEMENT = attributes[Math.floor(Math.random() * attributes.length)];
    const TIME = (Math.random(4 - 1) + 1).toFixed() * 1000;
    setTimeout(() => secondPageModalContent(SELECTED_ELEMENT, window), TIME);
  }
}