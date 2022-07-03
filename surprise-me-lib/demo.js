function Widget(config) {
  return {
    start() {
      appendStyles();
      document.querySelector(config.placeholder).append(createButton(config));
    }
  }

  function createButton({placeholder_text, placeholder_class = 'placeholder-button', placeholder_wrapper_class = 'placeholder-wrapper'}) {
    let wrapper = document.createElement('div');
    let button = document.createElement('button');

    wrapper.className = placeholder_wrapper_class
    button.className = placeholder_class;
    button.textContent = placeholder_text;

    button.addEventListener('click', () => alert('opened'));

    wrapper.append(button);
    return wrapper;
  }

  function appendStyles() {
    let stylesheet = document.createElement('link');
    stylesheet.setAttribute('href', `http://localhost:3355/modal.css`)
    stylesheet.setAttribute('rel', 'stylesheet');
    document.head.append(stylesheet);
  }
}