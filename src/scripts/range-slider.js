

var imageContrast = document.getElementById('image-contrast');

var perforationSize = document.getElementById('perforation-size');
var perforationIntensity = document.getElementById('perforation-intensity');

noUiSlider.create(imageContrast, {
  start: [ 4000 ],
    range: {
      'min': [  2000 ],
      'max': [ 10000 ]
    }
});

noUiSlider.create(perforationSize, {
  start: [20,80],
  connect: true,
  range: {
    min: 1,
    max: 200
  }
});

noUiSlider.create(perforationIntensity, {
  start: [30,140],
  connect: true,
  range: {
    min: 1,
    max: 200
  }
});