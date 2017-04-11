var webgl = document.querySelector('.webgl');

var camera, scene, renderer;

var controls;

var widthText = document.getElementById('width-text');
var widthInput = document.getElementById('width');

var width = 20;
var height = 96;

var plane;

var color = '#3B464F';

var colors = document.getElementsByClassName('color');
for (var i = 0; i < colors.length; i++) {
  colors[i].addEventListener('click', addColor);
}


function init() {
  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.x = 150;
  camera.position.y = 25;
  camera.position.z = 400;
  camera.fov = 15;
  scene.add( camera )

  controls = new THREE.OrbitControls(camera, webgl);
  controls.enableZoom = false;
  controls.maxPolarAngle = Math.PI/2; 
  controls.rotateSpeed = 0.4;
  controls.zoomSpeed = 1.2;
  controls.panSpeed = 0.8;


  // lights

  var light, materials;

  scene.add( new THREE.AmbientLight( 0x666666 ) );

  light = new THREE.DirectionalLight( 0xe8e8e8, 1.75 );
  light.position.set( 50, 200, 100 );
  light.position.multiplyScalar( 1.3 );

  light.castShadow = true;

  light.shadow.mapSize.width = 1024;
  light.shadow.mapSize.height = 1024;

  var d = 300;

  light.shadow.camera.left = - d;
  light.shadow.camera.right = d;
  light.shadow.camera.top = d;
  light.shadow.camera.bottom = - d;

  light.shadow.camera.far = 1000;

  scene.add( light );


  // Ground
  var groundMaterial = new THREE.MeshPhongMaterial( { color: 0x888888, specular: 0x111111 } );

  var mesh = new THREE.Mesh( new THREE.PlaneBufferGeometry( 20000, 20000 ), groundMaterial );
  mesh.position.y = - 250;
  mesh.rotation.x = - Math.PI / 2;
  mesh.receiveShadow = true;
  scene.add( mesh );


  // Poles
  var poleGeo = new THREE.BoxGeometry( 1, height, 1 );
  var poleMat = new THREE.MeshPhongMaterial( { color: 0x555555, specular: 0x111111, shininess: 100 } );

  // Max distance between the support columns
  var between = 40;
  // width 240
  // width / between = 6 + 1
  // 240 / 7 = 34.3
  // 

  var poles = [-120, -80, -40, 0, 40, 80, 120];

  for (var i = 0; i < poles.length; i++) {
    // Pole
    var mesh = new THREE.Mesh( poleGeo, poleMat );
    mesh.position.x = poles[i];
    mesh.position.y = 0;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );

    // Ground Connector
    var gg = new THREE.BoxGeometry( 2, 1, 2 );
    var mesh = new THREE.Mesh( gg, poleMat );
    mesh.position.x = poles[i];
    mesh.position.y = -height/2;
    mesh.receiveShadow = true;
    mesh.castShadow = true;
    scene.add( mesh );
  }


  // Bar
  var mesh = new THREE.Mesh( new THREE.BoxGeometry( width*12, 1, 1 ), poleMat );
  mesh.position.x = 0;
  mesh.position.y = height/2;
  mesh.receiveShadow = true;
  mesh.castShadow = true;
  scene.add( mesh );


  // Wall
  var wallMaterial = new THREE.MeshBasicMaterial({
    color: 0x3B464F,
    side: THREE.DoubleSide,
    transparent: true
  });
  var wall = new THREE.PlaneGeometry( width*12, height-3, 1 );
  plane = new THREE.Mesh( wall, wallMaterial );
  plane.name = 'plane';
  plane.position.y = 2;
  plane.position.z = 1;
  plane.receiveShadow = true;

  scene.add( plane );

  // Bars and Background
  var webglHeight = webgl.getBoundingClientRect().height;


  // Figure
  // var loader = new THREE.ColladaLoader();
  // loader.load('figure.dae', function (result) {
  //   var mesh = result.scene;
  //   mesh.scale.set(1,1,1);
  //   mesh.rotation.x = -1.5708;
  //   mesh.rotation.z = 2.3;
  //   mesh.position.set(30, -50, 50);

  //   scene.add(mesh);
  // });


  var fov = camera.fov * ( Math.PI / 180 );
  var distance = Math.abs( width / Math.sin( fov / 2 ) );
  
  var newDistance = distanceVector(
    {
      x: 0,
      y: 0,
      z: 0
    }, camera.position
  );
  var delta = distance - newDistance;
  camera.translateZ(delta + (500 - 200));


  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth - 300, webglHeight );
  renderer.setClearColor( 0x000000, 0 );
  webgl.appendChild( renderer.domElement );

  camera.zoom -= 0.5;
  camera.updateProjectionMatrix();
}


function  renderView() {

  requestAnimationFrame(  renderView );

  controls.update();

  renderer.render( scene, camera );
}



function removeWall(){
  var selectedObject = scene.getObjectByName(plane.name);
  scene.remove( selectedObject );
}


function addWall(wid) {
  width = wid;
  var visualAdj;

  if (width < 20) {
    visualAdj = 200;

  } else if (width > 70) {
    visualAdj = 0;
    
  } else if (width > 60) {
    visualAdj = 25;

  } else if (width > 50) {  
    visualAdj = 50;

  } else if (width > 40) {
    visualAdj = 100;
    
  } else {
    visualAdj = 200;
    
  }
  // camera.updateProjectionMatrix();

  var fov = camera.fov * ( Math.PI / 180 );
  var distance = Math.abs( width / Math.sin( fov / 2 ) );
  
  var newDistance = distanceVector(
    {
      x: 0,
      y: 0,
      z: 0
    }, camera.position
  );
  var delta = distance - newDistance;
  
  camera.translateZ(delta + (500 - visualAdj));

  removeWall();
  
  // rebuild the object with new size
  var clr = new THREE.Color(color);

  // 5'  = 60"
  // 10' = 120"
  // 20' = 240"
  // 40' = 480"
  // var width = 


  // should abstract, but adds the svg back in
  var wallMaterial = new THREE.MeshBasicMaterial({
    color: clr,
    side: THREE.DoubleSide,
    transparent: true
  });
  var wall = new THREE.PlaneGeometry( wid*12, height-3, 1 );
  plane = new THREE.Mesh( wall, wallMaterial );
  plane.name = 'plane';
  plane.position.y = 2;
  plane.position.z = 1;
  plane.receiveShadow = true;

  scene.add( plane );
}


function addColor(e) {
  for (var i = 0; i < colors.length; i++) {
    colors[i].classList.remove('active');
  }
  e.target.classList.add('active');

  // set global color from color button
  color = e.target.getAttribute('style').split(' ')[1];

  // convert hex color to Three.js Color
  var clr = new THREE.Color(color);

  removeWall();

  // Wall
  var wallMaterial = new THREE.MeshBasicMaterial({
    color: clr,
    side: THREE.DoubleSide,
    transparent: true
  });
  var wall = new THREE.PlaneGeometry( width*12, height-3, 1 );
  plane = new THREE.Mesh( wall, wallMaterial );
  plane.name = 'plane';
  plane.position.y = 2;
  plane.position.z = 1;
  plane.receiveShadow = true;

  scene.add( plane );
}


// Init first rendering with radius of 3mm

init(); renderView();


//-------------------------------------
// Helpers
//-------------------------------------


function distanceVector( v1, v2 )
{
    var dx = v1.x - v2.x;
    var dy = v1.y - v2.y;
    var dz = v1.z - v2.z;

    return Math.sqrt( dx * dx + dy * dy + dz * dz );
}


function setMaterial(node, material) {
  node.material = material;
  if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      setMaterial(node.children[i], material);
    }
  }
}




//-------------------------------------
// Events
//-------------------------------------

widthText.addEventListener('change', function(e){
  var width = e.target.value;
  widthInput.value = width;
  removeWall();
  addWall(width);

});

widthInput.addEventListener('change', function(e){
  var width = e.target.value;
  widthText.value = width;
  removeWall();
  addWall(width);
});


// Zooming
var plus = document.querySelector('.js-plus');
var minus = document.querySelector('.js-minus');
plus.addEventListener('click', function(e){
  camera.zoom += 0.15;
  camera.updateProjectionMatrix();
});
minus.addEventListener('click', function(e){
  camera.zoom -= 0.15;
  camera.updateProjectionMatrix();
});



// App Mode
var enabled = false;
var btn = document.querySelector('.js-app');

btn.addEventListener('click', function(e){
  enabled = !enabled;

  var content = document.querySelector('.js-content');
  content.classList.toggle('active');
  var body = document.getElementsByTagName("BODY")[0];
  body.classList.toggle('active');

  if (enabled) {
    controls.enableZoom = true; 
  } else {
    controls.enableZoom = false;  
  }
  
  renderView();
});



