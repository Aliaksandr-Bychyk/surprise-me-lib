function Widget(config) {
  return {
    start() {
      appendStyles();
      document.querySelector(config.placeholder).append(createButton(config));
    }
  }

  function appendStyles() {
    let stylesheet = document.createElement('link');
    stylesheet.setAttribute('href', `http://localhost:3355/modal.css`)
    stylesheet.setAttribute('rel', 'stylesheet');
    document.head.append(stylesheet);
  }
  
  function createButton({placeholder_text, placeholder_class = 'placeholder-button', placeholder_wrapper_class = 'placeholder-wrapper'}) {
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
    let btn = document.createElement('button');

    img.src = image;
    img.className = 'modal-image';
    
    btn.textContent = 'Surprise me';
    btn.className = 'modal-button'
    btn.addEventListener('click', () => loadingPageModalContent(attributes, window))

    docFrag.append(img);
    docFrag.append(btn);
    return docFrag; 
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
  function secondPageModalContent(element, window) {
    window.innerHTML = '';
    let heading = document.createElement('h1');
    let btn = document.createElement('button');

    heading.textContent = `Your color is "${element}"!`;
    heading.className = 'modal-heading';
    
    btn.textContent = 'Select me';
    btn.className = 'modal-button';
    btn.addEventListener('click', () => {
      document.querySelector('.modal').remove();
      config.select_attribute(element);
    })

    window.append(heading);
    window.append(btn);
  }
}