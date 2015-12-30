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
    var PLAYER_SIZE=3;
    var K_LEFT=37;
    var K_RIGHT=39;
    var K_UP=38;
    var K_DOWN=40;
    var K_UP=38;
    var K_DOWN=40;
    var currentlyPressedKeys={};
    var adir=0,vdir=0,dir=0,rad_dir=0;
    var raycaster,direction,collision,collision_save ;
    var floor;
    var nbrender=0;

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
      directionalLight.castShadow = true;
      directionalLight.position.set( -800, 700, -800 ).normalize();
      scene.add( directionalLight );

      //var hemisphereLight= new THREE.HemisphereLight( 0xA0A0A0 ,0x303030, 0.1 ) 
      //scene.add( hemisphereLight );

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
      floor=addMesh(new THREE.CubeGeometry( 1000, 1, 1000), 
          1,
          0, 0,-20,
          0 ,0,0,
          new THREE.MeshPhongMaterial( { color: 0x202020, specular: 0x555555, shininess: 30 , opacity: 0.3} )); 
          
      // ======================== buildings, en vracs
      
      for (var i=0;i<70;i++)   
        addbat(ar(-400,400),ar(-400,+400),     30,30,ar(30,80), ar(-32000,32000),0.9);
      addbat(0,0,     1,1,4, 0xFFAAAA,1.0);
        

        
      makeText(-200,470,0,5,"0 88XX 8 8 B D WM",0xA0A0A0,0.9,70,40) ;
      
      // ================= Quadcopter

      var mat=new THREE.MeshPhongMaterial( { color: 0xA0A0A0, specular: 0x555555, shininess: 30 , opacity: 0.6} );
      mat.transparent= true;
      player = new THREE.Mesh( new THREE.BoxGeometry( 0, 0, 0 ),  mat );
      var sub1 = new THREE.Mesh( new THREE.CubeGeometry( PLAYER_SIZE*2, 2, PLAYER_SIZE*2 ),  mat);
      player.add(sub1);
      var r=PLAYER_SIZE/2;
      var a=[[-1,1,r,0x00FF00],[-1,-1,r,0x00FF00],[1,1,r+1,0xFF0055],[1,-1,r+1,0xFF0055]];
      for (var i=0;i<a.length;i++) {
         var sub2 = new THREE.Mesh( new THREE.CylinderGeometry( a[i][2], a[i][2] , 1 , 10),
                      new THREE.MeshPhongMaterial( { 
                      color: a[i][3], 
                      specular: 0x555555, shininess: 30 , opacity: 0.7,transparent: true} ) );
         sub2.position.set(a[i][0]*r*2,0,a[i][1]*r*2);
         sub1.add(sub2);
      }
      subplayer=sub1;
		  player.castShadow = true;
			player.receiveShadow = true;
      scene.add(player);

      // ============= create raycster for collision detection

      direction= new THREE.Vector3(0,0,0);
      raycaster = new THREE.Raycaster(new THREE.Vector3(0,0,0),direction,1,50); // position/direction/near/far
      collision=null;
    }

    function animate() {
      render();
      requestAnimationFrame( animate );
    }
    function render() {
      
      var ax=(mouseX*Math.cos(rad_dir))+(-mouseY*Math.cos(rad_dir+Math.PI/2.0));
      var az=(mouseX*Math.sin(rad_dir))+(-mouseY*Math.sin(rad_dir+Math.PI/2.0));
      
      vx=(vx+ax/4000.0)*0.995;
      vy=(vy+(-mouseZ)/6000.0)*0.95;
      vz=(vz+az/4000.0)*0.995;
      
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
      
      subplayer.rotation.z=-mouseX/900;
      subplayer.rotation.x=-mouseY/900;

      // ================== Collision detections

      direction.set(vx,vy,vz);
      var v=direction.length();
      if (v>0.01 && (nbrender%4)==0) {
        direction.normalize();
        raycaster.near=PLAYER_SIZE/2;
        raycaster.far=max(PLAYER_SIZE*2,v);
        raycaster.set( player.position, direction );	
        player.visible=false;
        var intersects = raycaster.intersectObjects( scene.children , false );
        player.visible=true;

        if (intersects.length>0 && intersects[0].object!=floor) {
          if (collision) collision.material.color.set( collision_save );  
	        collision=intersects[ 0 ].object
          collision_save=collision.material.color.getHex();
          collision.material.color.set( 0xff0000 );
          vx=-vx;vy=-vy;vz=-vz;
          // TODO : collision behavior : scratch or slide or bounce with:
          //   intersects[0].face, .point .distance
        } else {
          if (collision) {
            collision.material.color.set( collision_save );  
            collision=null;
          }
        }
      }    
 	    nbrender++;
      // ================ Camera

      if (modeCamera) {
        var camx= posx + (40*Math.cos(-rad_dir));
        var camy= posy + 9 + 2*vy;
        var camz= posz + (40*Math.sin( rad_dir));
      } else {
        var camx= posx/2;
        var camy= max(10,altitude);
        var camz= posz/2;
      }
      camera.position.set(camx,camy,camz);
      camera.lookAt(player.position);
      webglRenderer.render( scene, camera );
    }
}
