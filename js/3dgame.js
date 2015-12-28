var init_game= function() {
    webgl=this;

    var cv=document.getElementById('cv')
    var SCREEN_WIDTH = cv.offsetWidth;
    var SCREEN_HEIGHT = cv.offsetHeight;
    var FLOOR = 0;
    var container=cv;
    var player, geometry;
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
      
      // ================= Joueur , model en fichier OU OVNI...
      if (true) {
          player =  addbat(0,0,     6,4,1, 0xBB0000,1);
      } else {
          player = addMesh(new THREE.CylinderGeometry( 5, 1 ,20 ,30),
             1.4,
             -400,30,-400,
             Math.PI/2.0,0,0,
             new THREE.MeshPhongMaterial( { 
                color: 0xFFAA00, specular: 0x101010, 
                shininess: 30 , opacity: 1.0
             })
          );
      }
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
      
      subplayer.rotation.z=-mouseX/400;
      subplayer.rotation.x=-mouseY/400;
      
      // ================ Camera : subjective
      
      var camx= posx + (20*Math.cos(-rad_dir));
      var camy= posy + 3 + 2*vy;
      var camz= posz + (20*Math.sin(rad_dir));
      camera.position.set(camx,camy,camz);
      camera.lookAt(player.position);
      webglRenderer.render( scene, camera );
    }

}
