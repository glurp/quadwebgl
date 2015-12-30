Quadwebgl
=========

A Webgl/Gamepad game for quadcopter simulation.
developped, tested on Chrome,Firefox.

Mobile version: todo :)

Objective : get real sensation, without webgl lagging....

Direct acces :
https://rawgit.com/glurp/quadwebgl/master/index.html

Gameplay
--------

Simulate a real quadcopter (mode 2) radio commande, with a gamepad-compatible joystick.

* Left  joystick : up/down , horizontal rotation
* Right joystick : forward/backward, left/right
* button 0 : goto 0,0,0
* button 1 : stop mouvments ( speeds=0 )
* button 2 : toggle camera view player-relative/fixe-position
* button 7/8 : for fixed camera, set altitude +/-

TODO
====

Phase 1 (current)
--------

* nonlineare joysticks
* texture for batiments
* sky

Phase 2
-------

* shadow
* mobile version
* behavior more realist on collision

Phase 3
-------

* physics engine integration : physics.js / ammo.js ...
* mode : beginer, expert, acrobatic...
* multi-gamer : WebRTC/Websocket

License
=======

LGPL

