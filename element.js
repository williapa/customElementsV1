function MyEl() {
  var _this = Reflect.construct(HTMLElement, [], this.constructor);
  _this.shadowRoot = _this.attachShadow({mode: 'open'});
  return _this;
}

MyEl.prototype = Object.create(HTMLElement.prototype);

MyEl.observedAttributes = ['val'];

MyEl.prototype.constructor = MyEl;

Object.setPrototypeOf(MyEl, HTMLElement);

MyEl.prototype.connectedCallback = function() {
  var style = document.createElement('style');
  style.textContent = ".small { font: italic 15px sans-serif; fill: red; }";
  var svg = document.createElementNS("http://www.w3.org/2000/svg", 'svg');
  var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
  var text = document.createElementNS("http://www.w3.org/2000/svg", 'text');
  rect.setAttribute('x',5);
  rect.setAttribute('y',5);
  rect.setAttribute('width',50);
  rect.setAttribute('height',50);
  rect.setAttribute('fill','#95B3D7');
  text.setAttribute('x', 15);
  text.setAttribute('y', 15);
  text.setAttribute('class', 'small');
  text.textContent = 'init';
  svg.appendChild(rect);
  svg.appendChild(text);
  this.rect = rect;
  this.text = text;
  this.shadowRoot.appendChild(style);
  this.shadowRoot.appendChild(svg);
};

MyEl.prototype.trigger = function (val) {
  var value;
  if (!val) {
    value = '000000';
  } else {
    value = 'FFFFFF';
  }
  this.shadowRoot.querySelector('rect').setAttribute('fill', '#' + value);
  this.text.textContent = val;
};

MyEl.prototype.attributeChangedCallback = function(name, oldValue, newValue) {
  console.log('attribute changed: ' + name + ', old value: ' + oldValue +  ', new value: ' + newValue);
  if(this.rect && this.text) {
    this.rect.setAttribute('fill', '#' + newValue);
    this.text.textContent = newValue;
    console.log(this.text);
  } else if (this.rect) {
    console.log('the rect was there.');
  } else {
    console.log('why');
  }
};

customElements.define('my-el', MyEl);