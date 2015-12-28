Quadwebgl
=========

A webgl/gamepad game for quadcopter simulation.
developped, tested on Chrome,
Should work with Firefox,Edge.

Objective : get real sensation, without webgl lagging....

Gameplay
--------

Simulate a real quadcopter (mode 2) radio commande, with a gamepad-compatible
joystick.

* Left  joystick : up/down , horisontal rotation
* Right joystick : forward/backward, left/right
* button 0 : goto 0,0,0
* button 1 : stop in-place ( speeds=0 )

TODO
====

Phase 1
--------

* quad dynamique orientation: composite
* sky
* light
* texture for batiments
* collision detection by raytracing

Phase 2
-------

* physics engine integration : physics.js / ammo.js ...
* more realistic simulation: looping... 
* mode beginer, extert, acrobatic...
* multi-gamer : WebRTC/Websocket

License
=======

LGPL

