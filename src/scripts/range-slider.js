
var wallWidth = document.getElementById('wall-width');
var wallHeight = document.getElementById('wall-height');
var imageContrast = document.getElementById('image-contrast');
var gridSize = document.getElementById('grid-size');
var perforationSize = document.getElementById('perforation-size');
var perforationIntensity = document.getElementById('perforation-intensity');

noUiSlider.create(wallWidth, {
  start: [ 40 ],
    connect: [true, false],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
    }
});

noUiSlider.create(wallHeight, {
  start: [ 40 ],
    connect: [true, false],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
    }
});


noUiSlider.create(imageContrast, {
  start: [ 40 ],
    connect: [true, false],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
    }
});

noUiSlider.create(gridSize, {
  start: [ 50 ],
    connect: [true, false],
    range: {
      'min': [  0 ],
      'max': [ 100 ]
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