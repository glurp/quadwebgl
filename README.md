Quadwebgl
=========

A webgl/gamepad game for quadcopter simulation.
developped, tested on Chrome,
Should work with Firefox,Edge (pure Threee.js application).

Objective : get real sensation, without webgl lagging....

Direct acces :
https://rawgit.com/glurp/quadwebgl/master/index.html

Gameplay
--------

Simulate a real quadcopter (mode 2) radio commande, with a gamepad-compatible
joystick.

* Left  joystick : up/down , horizontal rotation
* Right joystick : forward/backward, left/right
* button 0 : goto 0,0,0
* button 1 : stop in-place ( speeds=0 )
* button 2 : toggle camera view relative/fixe
* button 10/11 : for fixed camera, set altitude +/-

TODO
====

Phase 1
--------

* sky
* texture for batiments
* behavior realist on collision

Phase 2
-------

* physics engine integration : physics.js / ammo.js ...
* more realistic simulation: looping... 
* mode : beginer, expert, acrobatic...
* multi-gamer : WebRTC/Websocket

License
=======

LGPL

