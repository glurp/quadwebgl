// depands on scene and camera objects

function min(a,b) { return a<=b ? a : b ;}
function max(a,b) { return a>=b ? a : b ;}
var PI=3.14159;
function ar(min,max) {return(1.0+min+Math.random()*(max-min)) ;}
function r(a) { return Math.round(a*10)/10.0 }
function hypot(a,b,c) { return Math.sqrt(a*a+b*b+c*c) }

function addMesh( geometry, scale, x, y, z, rx, ry, rz, material ) {

    mesh = new THREE.Mesh( geometry, material );
    mesh.position.set( 0, 0, 0 );
    mesh.scale.set( scale, scale, scale );
    mesh.overdraw = true;
    scene.add( mesh );
    mesh.position.set( x, y, z );
    mesh.rotation.set( rx, ry, rz );
    return(mesh);
}
function addbat(x,z,  w,l,h,color,opacity) {
  var mat=new THREE.MeshPhongMaterial( { 
    color: color, specular: 0x555555, 
    shininess: 30 , opacity: opacity
  });
  mat.transparent= (opacity<1.0) ? true : false ;
  var b=addMesh(new THREE.CubeGeometry( w, h, l),
      1,
      x+w/2, h/2,z+h/2,
      0 ,ar(-1.1,1.1),0,
      mat); 
  b.castShadow = true;  
  return(b);
}
function makeText(x0,y0,z0,r,text,color,opacity,s,h) {
    var textGeo = new THREE.TextGeometry( text, {
      size: s,
      height: h,
      font: "optimer",
      style: "normal",
      bevelThickness: 10,
      bevelSize: 0.5,
      bevelEnabled: true,
      bend: true,
      material: 0,
      extrudeMaterial: 1
    });
    var textMesh1 = new THREE.Mesh( textGeo ,  new THREE.MeshBasicMaterial( { 
        color: color, specular: 0xE0E0E0, shininess: 100 ,
        opacity: opacity, 
        reflectivity: 10,
        transparent: ((opacity==1.0) ? false : true) 
    }));
    textMesh1.position.x = x0;
    textMesh1.position.y = z0;
    textMesh1.position.z = y0;
    textMesh1.rotation.x = 0;
    textMesh1.rotation.y = (Math.PI*r)/180.0;
    scene.add(  textMesh1 );
}

var source,audio,urlSound="";
function soundInit() {
   audio = document.createElement('audio');
   source = document.createElement('source');
}
function soundPlay(url) {
  if (url!=urlSound) {
      source.src = url;
      audio.appendChild(source);
      urlSound=url;
  }
  audio.play();  
}

