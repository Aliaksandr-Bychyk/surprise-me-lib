# surprise-me-lib
How to connect this library

```
<script src="http://127.0.0.1:3355/demo.js" charset="utf-8"></script>
```

The `config` object should look like this:
```
let configuration = {
    attributes: ['red', 'blue', 'black'],
    placeholder: '.product-color',
    placeholder_text: 'Surprise me with the color',
    // placeholder_class: '',
    // placeholder_wrapper_class: 'cable-choose',
    image: window.location.origin + '/images/black.png',
    select_attribute: function(attr) {
      let headphonesColor = document.querySelectorAll('input[name="color"]');
      headphonesColor.forEach(el => {
        el.classList.remove('active')
        el.checked = false;
      });
      headphonesColor.forEach(el => {
        if (el.id === attr) {
          el.classList.add('active');
          el.checked = true;
        }
      })
    }
  }
```

`attributes` - array of attributes;

`placeholder` - DOM object where the open module button should be placed;

`placeholder_text` - text of the open module button;

`placeholder_class` - [not necessary] css class for the open module button;

`placeholder_wrapper_class` - [not necessaty] css class for the wrapper of the open module button;

`image` - url of the image for module;

`select_attribute` - function that takes `attr` and should execute after the modal submitted;

To run the library:
```
let widget = Widget(configuration)
widget.start()
```