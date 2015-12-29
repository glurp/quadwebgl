var init_game= function() {
    webgl=this;

    var cv=document.getElementById('cv')
    var SCREEN_WIDTH = cv.offsetWidth;
    var SCREEN_HEIGHT = cv.offsetHeight;
    var FLOOR = 0;
    var container=cv;
    var player, geometry;
    var subplayer;
    var windowHalfX = SCREEN_WIDTH / 2;
    var windowHalfY = SCREEN_HEIGHT  / 2;
    
    var K_LEFT=37;
    var K_RIGHT=39;
    var K_UP=38;
    var K_DOWN=40;
    var K_UP=38;
    var K_DOWN=40;
    var currentlyPressedKeys={};
    var adir=0,vdir=0,dir=0,rad_dir=0;


    init_gamepad()
    init();
    animate();

    function init() {

      // camera
      camera = new THREE.PerspectiveCamera( 75, SCREEN_WIDTH / SCREEN_HEIGHT, 1, 100000 );
      camera.position.z = 75;

      //scene
      scene = new THREE.Scene();

      // lights
      var ambient = new THREE.AmbientLight( 0xA0A0A0 );
      scene.add( ambient );

      // more lights
      var directionalLight = new THREE.DirectionalLight( 0xffeedd );
      directionalLight.position.set( -800, 700, -800 ).normalize();
      scene.add( directionalLight );

      // renderer
      webglRenderer = new THREE.WebGLRenderer();
      webglRenderer.setSize( SCREEN_WIDTH, SCREEN_HEIGHT );
      webglRenderer.domElement.style.position = "relative";
      container.appendChild( webglRenderer.domElement );

      createScene( ) ;
      document.onkeydown = function(event) {currentlyPressedKeys[event.keyCode] = true;};
      document.onkeyup =  function(event) {currentlyPressedKeys[event.keyCode] = false;};

    }

    function createScene( ) {
      //========= Floor
      addMesh(new THREE.CubeGeometry( 1000, 1, 1000), 
          1,
          0, 0,-20,
          0 ,0,0,
          new THREE.MeshPhongMaterial( { color: 0x202020, specular: 0x555555, shininess: 30 , opacity: 0.3} )); 
          
      // ======================== buildings, en vracs
      
      for (var i=0;i<70;i++)   
        addbat(ar(-400,400),ar(-400,+400),     30,30,ar(30,80), ar(-32000,32000),0.9);
      addbat(0,0,     1,1,4, 0xFFAAAA,1.0);
        

        
      //makeText(-200,470,0,5,"0 88XX 8 8 B D WM",0xA0A0A0,0.9,70,40) ;
      
      // ================= Quadcopter

      var mat=new THREE.MeshPhongMaterial( { color: 0xA0A0A0, specular: 0x555555, shininess: 30 , opacity: 0.6} );
      mat.transparent= true;
      player = new THREE.Mesh( new THREE.BoxGeometry( 1, 1, 1 ),  mat );
      var sub1 = new THREE.Mesh( new THREE.CubeGeometry( 6, 2, 6 ),  mat);
      player.add(sub1);

      var a=[[-1,1,2,0x00FF00],[-1,-1,2,0x00FF00],[1,1,3,0xFF0055],[1,-1,3,0xFF0055]];
      for (var i=0;i<a.length;i++) {
         var sub2 = new THREE.Mesh( new THREE.CylinderGeometry( a[i][2], a[i][2] , 1),
                      new THREE.MeshPhongMaterial( { 
                      color: a[i][3], 
                      specular: 0x555555, shininess: 30 , opacity: 0.7,transparent: true} ) );
         sub2.position.set(a[i][0]*3,0,a[i][1]*3);
         sub1.add(sub2);
      }
      subplayer=sub1;
      scene.add(player);
    }

    function animate() {
      requestAnimationFrame( animate );
      render();
    }
    function render() {
      
      var ax=(mouseX*Math.cos(rad_dir))+(-mouseY*Math.cos(rad_dir+Math.PI/2.0));
      var ay=(mouseX*Math.sin(rad_dir))+(-mouseY*Math.sin(rad_dir+Math.PI/2.0));
      
      vx=(vx+ax/4000.0)*0.995;
      vy=(vy+(-mouseZ-40)/6000.0)*0.95;
      vz=(vz+ay/4000.0)*0.995;
      
      vdir=(vdir+(-mouseR)/1200.0)*0.95;        

      posx+=vx;
      posy=max(1,posy+vy);
      posz+=vz;
      dir+=vdir;
      dir=(dir+360.0)%360;
      rad_dir=-(Math.PI*dir)/180.0;
      
      
      player.position.set(posx,posy,posz);
      player.rotation.y=-rad_dir;
      
      // ================ Inclinaison selon accelerations
      
      subplayer.rotation.z=-mouseX/600;
      subplayer.rotation.x=-mouseY/600;
      
      // ================ Camera : subjective
      if (boutons[6]==1) {
        modeCamera=!modeCamera;
        message("pos","Mode camera subgestive=",modeCamera);
        altitude=500;
      }
      if (boutons[7]==1) altitude -= 1;
      if (boutons[8]==1) altitude += 1;
      if (modeCamera) {
        var camx= posx + (40*Math.cos(-rad_dir));
        var camy= posy + 9 + 2*vy;
        var camz= posz + (40*Math.sin( rad_dir));
      } else {
        var camx= 0;
        var camy= altitude;
        var camz= 0;
      }
      camera.position.set(camx,camy,camz);
      camera.lookAt(player.position);
      webglRenderer.render( scene, camera );
    }
    var modeCamera=true;
    var altitude=500;
}
