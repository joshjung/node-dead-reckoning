
**UNDER CONSTRUCTION**

Dead Reckoning Explained
========================

Dead Reckoning algorithms (there are many implementations) are designed to synchronize multiple clients in a realtime network simulation together (e.g. CounterStrike, Quake, BattleField, Age of Empires, etc.). A simple dead reckoning algorithm simply let's the client simulate what it *thinks* the server is doing while it waits for the server to send it an update (normally for only 50-200 ms. at a time). A complex dead reckoning algorithm performs mathematical transitions from the client's current state to the server's state when it receives it (this does not do this).

For more information see (and what inspired this project):

[Dead Reckoning Latency Hiding for Networked Games](http://www.gamasutra.com/view/feature/131638/dead_reckoning_latency_hiding_for_.php)

This browserified collection of objects will allow your Javascript game client to implement its own dead reckoning implementation and appear relatively smooth even when your server has latency in the 200-300 ms. range.

No promises on *how* smooth though.

## Included

This mini library contains the following:

* Weighted average sampling of client-to-server latency.
* Set client FPS to whatever you want (recommended 30-60).
* Can simulate the server indefinitely on the client while waiting for a server game world state update.

## What `dead-reckoning` does NOT do:

* Provide physics thresholding on the client. If you don't know what this is it probably will not matter.
* Provide server or client world simulation. This must be done by you.

## What this assumes:

This assumes that the code to simulate physics and game progression exists on both your client AND server and that this code is identical and simply needs two objects to properly update:

1. User input (keyboard, mouse, etc.)
2. Elapsed time (0.0-1.0 seconds)

All this can seem daunting. See the example `GameClient.js` for information on how you can set this up in your game.

Testing
=======

Testing is provided by [mocha](http://visionmedia.github.io/mocha/).

Example
=======

Example can be found in the code testing suite. I highly recommend looking there first.

License
=======

The MIT License (MIT)

Copyright (c) 2014 Joshua Jung

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.