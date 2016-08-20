(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Clock = require('./tool/Clock.js');

var _Clock2 = _interopRequireDefault(_Clock);

var _World = require('./engine/World.js');

var _World2 = _interopRequireDefault(_World);

var _Player = require('./engine/Player.js');

var _Player2 = _interopRequireDefault(_Player);

var _Room = require('./engine/Room.js');

var _Room2 = _interopRequireDefault(_Room);

var _Renderer = require('./view/Renderer.js');

var _Renderer2 = _interopRequireDefault(_Renderer);

var _Title = require('./view/Title.js');

var _Title2 = _interopRequireDefault(_Title);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Thrust = function () {
    /**
     * Constructor
     */
    function Thrust() {
        _classCallCheck(this, Thrust);

        // Bind
        this.onFrame = this.onFrame.bind(this);
        this.onEnd = this.onEnd.bind(this);

        var height = window.innerHeight;

        // Porperties
        this.state = 'title';
        this.frame = null;
        this.clock = new _Clock2.default();
        this.players = [new _Player2.default(65, { start: 0, end: height / 2 }), new _Player2.default(76, { start: height / 2, end: height })];
        this.world = new _World2.default(this, this.players, this.onEnd);
        this.renderer = new _Renderer2.default(this.world);
        this.title = new _Title2.default(this);
        this.setPlayersPosition();

        this.onFrame();
    }

    _createClass(Thrust, [{
        key: 'reset',
        value: function reset() {
            this.players[0].reset();
            this.players[1].reset();
            this.world.reset();
            this.renderer.reset();
            this.setPlayersPosition();
        }
    }, {
        key: 'start',
        value: function start() {
            this.players[0].ready = true;
            this.players[1].ready = true;
            this.state = 'playing';
            this.clock.start();
            this.onFrame();
        }
    }, {
        key: 'pause',
        value: function pause() {
            this.state = 'paused';
            this.clock.stop();
        }
    }, {
        key: 'gameover',
        value: function gameover() {
            this.state = 'gameover';
            this.clock.stop();
        }
    }, {
        key: 'setPlayersPosition',
        value: function setPlayersPosition() {
            var x = this.renderer.cameras[1].centerX;
            var wall = this.world.rooms.rooms[0].size * _Room2.default.wallSize;
            var margin = Math.ceil(x / this.renderer.scale + wall);
            this.world.players[0].position = margin;
            this.world.players[1].position = margin;
        }

        /**
         * On frame
         */

    }, {
        key: 'onFrame',
        value: function onFrame() {
            this.frame = requestAnimationFrame(this.onFrame);

            try {
                if (this.state == 'playing') {
                    this.world.update(this.clock.getDelta());
                }

                this.renderer.draw();
            } catch (e) {
                this.onEnd();
                throw e;
            }
        }
    }, {
        key: 'onEnd',
        value: function onEnd() {
            this.pause();
            this.frame = cancelAnimationFrame(this.frame);
            this.state = 'gameover';
            this.title.setState(this.state);
            this.title.setVictoryMessages(this.players, this.world.rooms.distance);
        }
    }]);

    return Thrust;
}();

exports.default = Thrust;

},{"./engine/Player.js":3,"./engine/Room.js":5,"./engine/World.js":8,"./tool/Clock.js":12,"./view/Renderer.js":22,"./view/Title.js":23}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Room = require('./Room.js');

var _Room2 = _interopRequireDefault(_Room);

var _Wall = require('./Wall.js');

var _Wall2 = _interopRequireDefault(_Wall);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Corridor = function () {
    function Corridor() {
        var length = arguments.length <= 0 || arguments[0] === undefined ? 80 : arguments[0];

        _classCallCheck(this, Corridor);

        this.rooms = [];
        this.distance = 0;

        this.addRoom(_Room2.default.size * 1.3);
        for (var i = 0; i < length; i++) {
            this.addRoom();
        }
        this.addRoom(_Room2.default.size * 1.3);
    }

    _createClass(Corridor, [{
        key: 'addRoom',
        value: function addRoom() {
            var forceSize = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            var length = this.rooms.length;
            var start = length ? this.rooms[length - 1].end : 0;
            var size = Math.round(forceSize ? forceSize : _Room2.default.getRandomSize());

            this.rooms.push(new _Room2.default(length, start, size));
            this.distance += size;
        }
    }, {
        key: 'getWalls',
        value: function getWalls() {
            var length = this.rooms.length;
            var walls = new Array(length - 1);

            for (var i = walls.length - 1; i >= 0; i--) {
                var room = this.rooms[i];
                walls[i] = new _Wall2.default(room.end);
            }

            return walls;
        }
    }, {
        key: 'getInverseWalls',
        value: function getInverseWalls() {
            var length = this.rooms.length;
            var walls = new Array(length - 1);

            for (var i = walls.length - 1; i >= 0; i--) {
                var room = this.rooms[length - 1 - i];
                walls[i] = new _Wall2.default(this.distance - room.start);
            }

            return walls;
        }
    }]);

    return Corridor;
}();

exports.default = Corridor;

},{"./Room.js":5,"./Wall.js":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _PlayerController = require('./PlayerController');

var _PlayerController2 = _interopRequireDefault(_PlayerController);

var _Room = require('./Room.js');

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
    function Player(key, zone) {
        _classCallCheck(this, Player);

        this.thrust = this.thrust.bind(this);
        this.endThrust = this.endThrust.bind(this);

        this.position = 0;
        this.speed = Player.speed;
        this.thrusting = false;
        this.ready = false;
        this.thrustTimeout = null;
        this.wallEventListener = null;
        this.controller = new _PlayerController2.default(key, zone);

        this.controller.addActionListener(this.thrust);
    }

    _createClass(Player, [{
        key: 'reset',
        value: function reset() {
            clearTimeout(this.thrustTimeout);
            this.position = 0;
            this.speed = Player.speed;
            this.thrusting = false;
            this.ready = false;
        }
    }, {
        key: 'thrust',
        value: function thrust() {
            if (this.ready) {
                clearTimeout(this.thrustTimeout);
                var time = Player.thrustDuration / this.getSpeedRatio();
                this.thrusting = true;
                this.ready = false;
                this.thrustTimeout = setTimeout(this.endThrust, time);
            }
        }
    }, {
        key: 'endThrust',
        value: function endThrust() {
            this.thrusting = false;
            this.ready = true;
        }
    }, {
        key: 'increaseSpeed',
        value: function increaseSpeed() {
            this.speed = Math.min(this.speed + Player.speedStep, Player.maxSpeed);
            this.ready = true;
        }
    }, {
        key: 'resetSpeed',
        value: function resetSpeed() {
            this.speed = Math.max(this.speed / 2, Player.speed);

            if (this.wallEventListener) {
                this.wallEventListener();
            }
        }
    }, {
        key: 'update',
        value: function update(delta) {
            this.position = Math.round(this.position + this.speed * delta);

            return this.position;
        }
    }, {
        key: 'setWallEventListener',
        value: function setWallEventListener(callback) {
            this.wallEventListener = callback;
        }
    }, {
        key: 'getSpeedRatio',
        value: function getSpeedRatio() {
            return this.speed / Player.speed;
        }
    }]);

    return Player;
}();

Player.speed = 300;
Player.speedStep = Player.speed / 5;
Player.maxSpeed = Player.speed * 4;
Player.thrustDuration = 350;
exports.default = Player;

},{"./PlayerController":4,"./Room.js":5}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Player = require('./Player.js');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var PlayerController = function () {
    function PlayerController(key, zone) {
        _classCallCheck(this, PlayerController);

        this.key = key;
        this.zone = zone;
        this.listeners = [];

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onTouch = this.onTouch.bind(this);
        this.onAction = this.onAction.bind(this);

        window.addEventListener('keydown', this.onKeyDown, false);
        window.addEventListener('touchstart', this.onTouch, false);
    }

    /**
     * On key down
     *
     * @param {Event} event
     */


    _createClass(PlayerController, [{
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            if (event.keyCode == this.key) {
                this.onAction();
            }
        }

        /**
         * On touch
         *
         * @param {Event} event
         */

    }, {
        key: 'onTouch',
        value: function onTouch(event) {
            event.preventDefault();

            for (var i = event.changedTouches.length - 1; i >= 0; i--) {
                var touch = event.changedTouches[i].clientY;

                if (touch >= this.zone.start && touch <= this.zone.end) {
                    return this.onAction();
                }
            }
        }

        /**
         * On action
         */

    }, {
        key: 'onAction',
        value: function onAction() {
            var length = this.listeners.length;

            for (var i = 0; i < length; i++) {
                this.listeners[i]();
            }
        }

        /**
         * Add action listener
         *
         * @param {Function} callback
         */

    }, {
        key: 'addActionListener',
        value: function addActionListener(callback) {
            if (this.listeners.indexOf(callback) < 0) {
                this.listeners.push(callback);
            }
        }

        /**
         * Remove action listener
         *
         * @param {Function} callback
         */

    }, {
        key: 'removeActionListener',
        value: function removeActionListener(callback) {
            var index = this.listeners.indexOf(callback);

            if (index >= 0) {
                this.listeners.splice(index, 1);
            }
        }
    }]);

    return PlayerController;
}();

exports.default = PlayerController;

},{"./Player.js":3}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {
    function Room(id, start, size) {
        _classCallCheck(this, Room);

        var colors = Room.colors[id % Room.colors.length];

        this.id = id;
        this.start = start;
        this.size = size;
        this.end = start + size;
        this.wall = this.end - this.size * Room.wallSize;
        this.color = colors[0];
        this.wallColor = colors[1];
        this.view = null;
        this.mirror = null;
    }

    _createClass(Room, [{
        key: 'match',
        value: function match(start, end) {
            return this.start < end && this.end > start;
        }
    }], [{
        key: 'getRandomSize',
        value: function getRandomSize() {
            return Room.size * (1 + (Math.random() - 0.5) / 2);
        }
    }]);

    return Room;
}();

Room.colors = [['#D64F9E', '#9C4377'], ['#5BD3F0', '#50A2B6'], ['#5B52B8', '#45407E']];
Room.size = 400;
Room.wallSize = 0.05;
exports.default = Room;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Track = function () {
    function Track(walls) {
        _classCallCheck(this, Track);

        this.walls = walls;
        this.index = 0;
    }

    /**
     * Get wall
     *
     * @param {Number} position
     *
     * @return {Wall|null}
     */


    _createClass(Track, [{
        key: "getWall",
        value: function getWall(position) {
            if (!this.walls.length) {
                return null;
            }

            var wall = this.walls[0];

            if (wall.match(position)) {
                return this.walls.splice(0, 1);
            }

            return null;
        }
    }]);

    return Track;
}();

exports.default = Track;

},{}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Wall = function () {
    function Wall(position) {
        _classCallCheck(this, Wall);

        this.position = position;
    }

    _createClass(Wall, [{
        key: "match",
        value: function match(position) {
            return this.position <= position;
        }
    }]);

    return Wall;
}();

exports.default = Wall;

},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Corridor = require('./Corridor.js');

var _Corridor2 = _interopRequireDefault(_Corridor);

var _Track = require('./Track.js');

var _Track2 = _interopRequireDefault(_Track);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * World simulation
 */
var World = function () {
    /**
     * Constructor
     *
     * @param {Number} distance
     * @param {Array} players
     * @param {Function} onEnd
     */
    function World(thrust, players, onEnd) {
        _classCallCheck(this, World);

        this.thrust = thrust;
        this.players = players;
        this.onEnd = onEnd;

        this.reset();
    }

    _createClass(World, [{
        key: 'reset',
        value: function reset() {
            delete this.rooms;
            delete this.players[0].track;
            delete this.players[1].track;

            this.rooms = new _Corridor2.default();
            this.players[0].track = new _Track2.default(this.rooms.getInverseWalls());
            this.players[1].track = new _Track2.default(this.rooms.getWalls());
        }
    }, {
        key: 'getDistance',
        value: function getDistance() {
            return this.rooms.distance;
        }

        /**
         * Update
         *
         * @param {Number} delta
         */

    }, {
        key: 'update',
        value: function update(delta) {
            this.updatePlayer(this.players[0], delta);
            this.updatePlayer(this.players[1], delta);

            if (this.meet()) {
                this.players[1].position = this.getDistance() - this.players[0].position;
                this.onEnd();
            }
        }
    }, {
        key: 'updatePlayer',
        value: function updatePlayer(player, delta) {
            var position = player.update(delta);
            var wall = player.track.getWall(position);

            if (wall) {
                if (player.thrusting) {
                    player.increaseSpeed();
                } else {
                    player.resetSpeed();
                }
            }

            return position;
        }
    }, {
        key: 'meet',
        value: function meet() {
            var limit = arguments.length <= 0 || arguments[0] === undefined ? 0 : arguments[0];

            return this.getDifference() <= limit;
        }
    }, {
        key: 'getDifference',
        value: function getDifference() {
            return this.getDistance() - (this.players[0].position + this.players[1].position);
        }
    }]);

    return World;
}();

exports.default = World;

},{"./Corridor.js":2,"./Track.js":6}],9:[function(require,module,exports){
'use strict';

var _Thrust = require('./Thrust.js');

var _Thrust2 = _interopRequireDefault(_Thrust);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _Thrust2.default();

},{"./Thrust.js":1}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AudioPlayer = function () {
    function AudioPlayer() {
        _classCallCheck(this, AudioPlayer);

        window.AudioContext = window.AudioContext || window.webkitAudioContext;

        this.enableMusic = true;

        this.ostBuffer = null;
        this.audioSource = null;

        this.audioContext = new AudioContext();
        this.audioPlaying = false;

        this.load = this.load.bind(this);
        this.play = this.play.bind(this);

        if (this.enableMusic) {
            this.load(this.play);
        }
    }

    _createClass(AudioPlayer, [{
        key: 'load',
        value: function load(done) {
            var request = new XMLHttpRequest();
            request.open('GET', 'ost/title.ogg');
            request.responseType = 'arraybuffer';

            request.onload = function () {
                this.audioContext.decodeAudioData(request.response, function (buffer) {
                    this.ostBuffer = buffer;
                    done();
                }.bind(this));
            }.bind(this);

            request.send();
        }
    }, {
        key: 'play',
        value: function play() {
            this.audioSource = this.audioContext.createBufferSource();
            this.audioSource.buffer = this.ostBuffer;
            this.audioSource.connect(this.audioContext.destination);
            this.audioSource.start(0);

            this.audioPlaying = true;
        }
    }, {
        key: 'toggle',
        value: function toggle() {
            if (this.audioPlaying) {
                this.audioSource.disconnect();
            } else {
                this.audioSource.connect(this.audioContext.destination);
            }

            this.audioPlaying = !this.audioPlaying;
        }
    }]);

    return AudioPlayer;
}();

exports.default = AudioPlayer;

},{}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Canvas
 *
 * @param {Number} width
 * @param {Number} height
 * @param {Element} element
 */
var Canvas = function () {
    function Canvas(width, height) {
        var element = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

        _classCallCheck(this, Canvas);

        this.element = element ? element : document.createElement('canvas');
        this.context = this.element.getContext('2d');
        this.element.width = width;
        this.element.height = height;
        this.context.imageSmoothingEnabled = false;
    }

    _createClass(Canvas, [{
        key: 'setFill',
        value: function setFill(color) {
            this.context.fillStyle = color;
        }
    }, {
        key: 'setAlpha',
        value: function setAlpha(alpha) {
            this.context.globalAlpha = alpha;
        }
    }, {
        key: 'clear',
        value: function clear() {
            this.context.clearRect(0, 0, this.element.width, this.element.height);
        }
    }, {
        key: 'color',
        value: function color(_color) {
            this.context.fillStyle = _color;
            this.context.fillRect(0, 0, this.element.width, this.element.height);
        }
    }, {
        key: 'drawImage',
        value: function drawImage(image, x, y, width, height) {
            this.context.drawImage(image, x, y, width, height);
        }
    }, {
        key: 'drawImageTo',
        value: function drawImageTo(image, x, y) {
            this.context.drawImage(image, x, y);
        }
    }, {
        key: 'drawCircle',
        value: function drawCircle(x, y, radius) {
            this.context.beginPath();
            this.context.arc(x, y, radius, 0, Math.PI * 2, false);
            this.context.fill();
        }
    }, {
        key: 'drawRect',
        value: function drawRect(x, y, width, height) {
            this.context.fillRect(x, y, width, height);
        }
    }, {
        key: 'reverse',
        value: function reverse() {
            this.context.save();
            this.context.translate(this.element.width, 0);
            this.context.scale(-1, 1);
        }
    }, {
        key: 'toImage',
        value: function toImage() {
            var image = new Image();
            image.src = this.toString();

            return image;
        }

        /**
         * To string
         *
         * @return {String}
         */

    }, {
        key: 'toString',
        value: function toString() {
            return this.element.toDataURL();
        }
    }, {
        key: 'toImage',
        value: function toImage() {
            var image = new Image();

            image.src = this.toString();

            return image;
        }

        /**
         * Debug canvas content
         *
         * @param {Boolean} image
         */

    }, {
        key: 'debug',
        value: function debug() {
            var image = arguments.length <= 0 || arguments[0] === undefined ? false : arguments[0];

            if (image) {
                document.body.appendChild(this.toImage());
            } else {
                console.info(this.toString());
            }
        }
    }]);

    return Canvas;
}();

exports.default = Canvas;

},{}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Three.js clock
 *
 * https://github.com/mrdoob/three.js/blob/6400f2c9b6ee58e01c005a66f00c7cd1113752aa/src/core/Clock.js
 *
 * @author alteredq / http://alteredqualia.com/
 */
var Clock = function () {
    function Clock(autoStart) {
        _classCallCheck(this, Clock);

        this.autoStart = autoStart || true;
        this.startTime = 0;
        this.oldTime = 0;
        this.elapsedTime = 0;
        this.running = false;
    }

    _createClass(Clock, [{
        key: "start",
        value: function start() {
            this.startTime = Date.now();
            this.oldTime = this.startTime;
            this.running = true;
        }
    }, {
        key: "stop",
        value: function stop() {
            this.getElapsedTime();
            this.running = false;
        }
    }, {
        key: "getElapsedTime",
        value: function getElapsedTime() {
            this.elapsedTime += this.getDelta();

            return this.elapsedTime;
        }
    }, {
        key: "getDelta",
        value: function getDelta() {
            var diff = 0;

            if (this.autoStart && !this.running) {
                this.start();
            }

            if (this.running) {
                var newTime = Date.now();
                diff = 0.001 * (newTime - this.oldTime);
                this.oldTime = newTime;
                this.elapsedTime += diff;
            }

            return diff;
        }
    }]);

    return Clock;
}();

exports.default = Clock;

},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Countdown = function () {
    function Countdown(interval, callback) {
        _classCallCheck(this, Countdown);

        this.start = this.start.bind(this);
        this.update = this.update.bind(this);
        this.end = this.end.bind(this);

        this.timer;
        this.sequence;
        this.interval = interval;
        this.callback = callback;
        this.containers = [document.getElementById('player1-countdown'), document.getElementById('player2-countdown')];
    }

    _createClass(Countdown, [{
        key: 'start',
        value: function start() {
            this.sequence = Countdown.sequence.slice(0);
            this.timer = setInterval(this.update, this.interval);
            setTimeout(this.end, this.interval * this.sequence.length);
            this.update();
        }
    }, {
        key: 'update',
        value: function update() {
            if (this.sequence.length >= 0) {
                var current = this.sequence.shift();
                this.containers[0].innerText = current;
                this.containers[1].innerText = current;
            }
        }
    }, {
        key: 'end',
        value: function end() {
            clearInterval(this.timer);
            this.callback();
        }
    }]);

    return Countdown;
}();

Countdown.sequence = ['ready?', 'set', 'go!'];
exports.default = Countdown;

},{}],14:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Clock = require('../../tool/Clock.js');

var _Clock2 = _interopRequireDefault(_Clock);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Animation = function () {
    function Animation(frames, timeline) {
        _classCallCheck(this, Animation);

        this.clock = new _Clock2.default();
        this.frames = frames;

        this.checkIntegrity(frames);
    }

    _createClass(Animation, [{
        key: 'checkIntegrity',
        value: function checkIntegrity(frames) {
            var lastTo = 0;

            for (i = 0; i <= frames.length; i++) {
                if (frames[i].from !== lastTo) {
                    throw new Error('frames integrity broken');
                }

                lastTo = frames[i].to;
            }
        }
    }, {
        key: 'getCurrentFrame',
        value: function getCurrentFrame(time) {
            for (i = 0; i <= this.frames.length; i++) {
                if (frames[i].matches(time)) {
                    return frames[i];
                }
            }

            throw new Error('could not find a frame for time ' + time);
        }
    }]);

    return Animation;
}();

},{"../../tool/Clock.js":12}],15:[function(require,module,exports){
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Frame = function () {
    function Frame(from, to, sprite) {
        _classCallCheck(this, Frame);

        this.from = from;
        this.to = to;
        this.sprite = sprite;
    }

    _createClass(Frame, [{
        key: "matches",
        value: function matches(time) {
            return this.from <= time && this.to >= time;
        }
    }]);

    return Frame;
}();

},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('../tool/Canvas.js');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Animation = require('./Animation/Animation.js');

var _Animation2 = _interopRequireDefault(_Animation);

var _Frame = require('./Animation/Frame.js');

var _Frame2 = _interopRequireDefault(_Frame);

var _Player = require('../engine/Player.js');

var _Player2 = _interopRequireDefault(_Player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Avatar = function () {
    function Avatar(player, direction) {
        _classCallCheck(this, Avatar);

        this.player = player;
        this.idle = Avatar.createLozange('#FFFD1B', '#BCBB14', 1, direction, 0.5, 0.75, 0.25);
        this.idleShadow = Avatar.createLozange('#000000', '#000000', 0.1, direction, 0.5, 0.75, 0.25);
        this.thrust = Avatar.createLozange('#F5DF0E', '#AB9B0A', 1, direction, 0.25, 1, 0.25);
        this.thrustShadow = Avatar.createLozange('#000000', '#000000', 0.1, direction, 0.25, 1, 0.25);
        this.shake = 0;
        this.shakeTimout = null;

        this.startShake = this.startShake.bind(this);
        this.endShake = this.endShake.bind(this);

        this.player.setWallEventListener(this.startShake);
    }

    _createClass(Avatar, [{
        key: 'startShake',
        value: function startShake() {
            this.shake = Date.now();
            this.shakeTimout = setTimeout(this.endShake, Avatar.shakeTime);
        }
    }, {
        key: 'endShake',
        value: function endShake() {
            this.shake = false;
            clearTimeout(this.shakeTimout);
        }
    }, {
        key: 'getShake',
        value: function getShake() {
            if (!this.shake) {
                return 0;
            }

            var time = (Date.now() - this.shake) / Avatar.shakeTime * 4 * Math.PI;

            return Math.cos(time) * Avatar.radius / 25;
        }
    }, {
        key: 'draw',
        value: function draw() {
            return this.player.thrusting ? this.thrust.element : this.idle.element;
        }
    }, {
        key: 'drawShadow',
        value: function drawShadow() {
            return this.player.thrusting ? this.thrustShadow.element : this.idleShadow.element;
        }
    }, {
        key: 'getSize',
        value: function getSize() {
            var ratio = 1 + (this.player.getSpeedRatio() - 1) * 0.5;

            return Avatar.radius / devicePixelRatio * ratio;
        }
    }, {
        key: 'getDropShadow',
        value: function getDropShadow() {
            return Avatar.radius * 0.1;
        }
    }], [{
        key: 'createFrames',
        value: function createFrames(color, colorDark, direction) {
            var size = Avatar.radius * 2;
            var canvas = new _Canvas2.default(size, size);
            var context = canvas.context();

            var frames = [];
        }
    }, {
        key: 'createLozange',
        value: function createLozange(color, colorDark, alpha, direction, height, body, head) {
            var canvasWidth = 2;
            var canvasHeight = 2;

            var size = Avatar.radius * 2;
            var canvas = new _Canvas2.default(size * canvasWidth, size * canvasHeight);
            var context = canvas.context;

            var center = { x: canvasWidth / 2, y: canvasHeight / 2 };

            var top = { x: center.x, y: center.y - height / 2 };
            var right = { x: center.x + head, y: center.y };
            var bottom = { x: center.x, y: top.y + height };
            var left = { x: center.x - body, y: center.y };

            if (direction) {
                canvas.reverse();
            }

            context.scale(size, size);
            canvas.setAlpha(alpha);

            canvas.setFill(color);
            context.beginPath();
            context.moveTo(left.x, left.y);
            context.lineTo(top.x, top.y);
            context.lineTo(right.x, right.y);
            context.fill();

            canvas.setFill(colorDark);
            context.beginPath();
            context.moveTo(left.x, left.y);
            context.lineTo(bottom.x, bottom.y);
            context.lineTo(right.x, right.y);
            context.fill();

            if (direction) {
                canvas.reverse();
            }

            return canvas;
        }
    }]);

    return Avatar;
}();

Avatar.radius = 360;
Avatar.shakeTime = 300;
exports.default = Avatar;

},{"../engine/Player.js":3,"../tool/Canvas.js":11,"./Animation/Animation.js":14,"./Animation/Frame.js":15}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera2 = require('./Camera.js');

var _Camera3 = _interopRequireDefault(_Camera2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var BottomCamera = function (_Camera) {
    _inherits(BottomCamera, _Camera);

    function BottomCamera(canvas, map, player, scale, y) {
        _classCallCheck(this, BottomCamera);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BottomCamera).call(this, canvas, map, player, scale, y));

        _this.centerX = canvas.element.width / 4;
        _this.centerY = canvas.element.height * 3 / 4;

        var margin = _this.centerX / _this.scale;

        _this.marginLeft = -Math.floor(margin);
        _this.marginRight = Math.floor(margin * 3);
        return _this;
    }

    _createClass(BottomCamera, [{
        key: 'translate',
        value: function translate(x) {
            return this.centerX + (x - this.player.position) * this.scale;
        }
    }, {
        key: 'getViewPort',
        value: function getViewPort() {
            var margin = this.centerX / this.scale;

            return {
                start: this.player.position + this.marginLeft,
                end: this.player.position + this.marginRight
            };
        }
    }]);

    return BottomCamera;
}(_Camera3.default);

exports.default = BottomCamera;

},{"./Camera.js":18}],18:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Avatar = require('./Avatar.js');

var _Avatar2 = _interopRequireDefault(_Avatar);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Camera = function () {
    function Camera(canvas, map, player, scale, y) {
        _classCallCheck(this, Camera);

        this.y = Math.ceil(y);
        this.scale = scale;
        this.map = map;
        this.canvas = canvas;
        this.player = player;
        this.avatar = new _Avatar2.default(player, y === 0);
        this.halfHeight = Math.round(this.canvas.element.height / 2);
    }

    _createClass(Camera, [{
        key: 'draw',
        value: function draw() {
            var alterEgo = arguments.length <= 0 || arguments[0] === undefined ? null : arguments[0];
            var difference = arguments.length <= 1 || arguments[1] === undefined ? 0 : arguments[1];

            var size = Math.round(this.avatar.getSize());
            var x = Math.round(this.centerX - size / 2);
            var y = Math.round(this.centerY - size / 2);
            var sun = this.getSunDirection();
            var shadow = Math.round(sun * this.avatar.getDropShadow());
            var shake = Math.round(this.avatar.getShake());

            var _getViewPort = this.getViewPort();

            var start = _getViewPort.start;
            var end = _getViewPort.end;

            var aesize = void 0,
                aex = void 0,
                aey = void 0,
                aeshadow = void 0;

            if (alterEgo) {
                aesize = Math.round(alterEgo.getSize());
                aex = Math.round(this.getAlterEgoPosition(x, difference));
                aey = Math.round(this.centerY - aesize / 2);
                aeshadow = Math.round(sun * alterEgo.getDropShadow());
            }

            for (var i = this.map.corridor.rooms.length - 1; i >= 0; i--) {
                var room = this.map.corridor.rooms[i];
                if (room.match(start, end)) {
                    this.drawRoom(room);
                }
            }

            this.canvas.drawImage(this.avatar.drawShadow(), x + shake, y + shadow, size, size);

            if (alterEgo) {
                this.canvas.drawImage(alterEgo.drawShadow(), aex + shake, aey + aeshadow, aesize, aesize);
            }

            this.canvas.drawImage(this.avatar.draw(), x + shake, y, size, size);

            if (alterEgo) {
                this.canvas.drawImage(alterEgo.draw(), aex + shake, aey, aesize, aesize);
            }
        }
    }, {
        key: 'getAlterEgoPosition',
        value: function getAlterEgoPosition(x, difference) {
            return x + difference;
        }
    }, {
        key: 'drawRoom',
        value: function drawRoom(room) {
            if (!room.scaledSize) {
                room.scaledSize = Math.ceil(room.size * this.scale);
            }

            this.canvas.drawImage(this.getView(room), Math.round(this.translate(room.start)), this.y, room.scaledSize, this.halfHeight);
        }
    }, {
        key: 'getView',
        value: function getView(room) {
            return room.view;
        }
    }, {
        key: 'getSunDirection',
        value: function getSunDirection() {
            return 1;
        }
    }]);

    return Camera;
}();

exports.default = Camera;

},{"./Avatar.js":16}],19:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('../tool/Canvas.js');

var _Canvas2 = _interopRequireDefault(_Canvas);

var _Room = require('../engine/Room.js');

var _Room2 = _interopRequireDefault(_Room);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Map = function () {
    function Map(corridor, distance, scale, height) {
        _classCallCheck(this, Map);

        this.corridor = corridor;
        this.scale = scale;
        this.width = Math.round(distance * scale);

        for (var i = this.corridor.rooms.length - 1; i >= 0; i--) {
            this.drawRoom(this.corridor.rooms[i]);
        }
    }

    _createClass(Map, [{
        key: 'drawRoom',
        value: function drawRoom(room) {
            var color = room.color;
            var wallColor = room.wallColor;
            var size = room.size;

            var id = '' + color; //:${size}

            if (typeof Map.cache[id] === 'undefined') {
                Map.cache[id] = this.getColor(size, color, wallColor);
            }

            var _Map$cache$id = Map.cache[id];
            var view = _Map$cache$id.view;
            var mirror = _Map$cache$id.mirror;


            room.view = view;
            room.mirror = mirror;
        }

        /**
         * Draw a room into the map
         *
         * @param {Room} room
         */

    }, {
        key: 'getColor',
        value: function getColor(size, color, wallColor) {
            var width = Math.ceil(size * this.scale);
            var view = new _Canvas2.default(width, 1);
            var mirror = new _Canvas2.default(width, 1);

            // Draw the room;
            view.setFill(color);
            view.drawRect(0, 0, view.element.width, view.element.height);

            // Draw the wall
            var wallSize = Math.ceil(size * _Room2.default.wallSize * this.scale);
            view.setFill(wallColor);
            view.drawRect(0, 0, wallSize, view.element.height);

            // Draw the reverse view for top lane
            mirror.reverse();
            mirror.drawImageTo(view.element, 0, 0);
            mirror.reverse();

            return {
                view: view.element,
                mirror: mirror.element
            };
        }
    }]);

    return Map;
}();

Map.cache = {};
exports.default = Map;

},{"../engine/Room.js":5,"../tool/Canvas.js":11}],20:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Canvas = require('../tool/Canvas.js');

var _Canvas2 = _interopRequireDefault(_Canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Minimap view
 */
var Minimap = function () {

  /**
   * Constructor
   *
   * @param {Number} distance
   * @param {Number} height
   * @param {Number} scale
   * @param {Number} stage
   */
  function Minimap(distance, width, height, stage) {
    _classCallCheck(this, Minimap);

    this.distance = distance;
    this.height = height;
    this.halfHeight = Math.round(this.height / 2) - Minimap.radius;
    this.scale = width / distance;
    this.canvas = new _Canvas2.default(width, Minimap.radius * 2);
  }

  /**
   * Draw players on the minimap
   *
   * @param {Canvas} canvas
   * @param {Array} avatars
   */


  _createClass(Minimap, [{
    key: 'draw',
    value: function draw(canvas, avatars) {
      this.drawPlayer(canvas, avatars[0], 'right');
      this.drawPlayer(canvas, avatars[1], 'left');
    }

    /**
     * Draw a player on the minimap
     *
     * @param {Canvas} canvas
     * @param {Avatar} avatar
     * @param {String} direction
     */

  }, {
    key: 'drawPlayer',
    value: function drawPlayer(canvas, avatar, direction) {
      var position = avatar.player.position;
      var ltr = direction == 'left';
      var width = Minimap.radius * 2;
      var x = (ltr ? position : this.distance - position) * this.scale - width / 2;
      var color = ltr ? 0xFF00000 : 0x00FF00;

      canvas.drawImage(avatar.draw(), Math.round(x), this.halfHeight, width, width);
    }
  }]);

  return Minimap;
}();

Minimap.radius = 50;
exports.default = Minimap;

},{"../tool/Canvas.js":11}],21:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ReadyCheck = function () {
    function ReadyCheck(onReady, players) {
        _classCallCheck(this, ReadyCheck);

        this.onReady = onReady;
        this.players = players;
        this.states = [];
        this.elements = [document.getElementById('player1-ready'), document.getElementById('player2-ready')];

        this.onPlayerOneReady = this.onPlayerOneReady.bind(this);
        this.onPlayerTwoReady = this.onPlayerTwoReady.bind(this);
        this.reset();
    }

    _createClass(ReadyCheck, [{
        key: 'reset',
        value: function reset() {
            this.states = [false, false];
            this.elements[0].style.display = 'block';
            this.elements[1].style.display = 'block';
            this.players[0].controller.addActionListener(this.onPlayerOneReady);
            this.players[1].controller.addActionListener(this.onPlayerTwoReady);
        }
    }, {
        key: 'onPlayerOneReady',
        value: function onPlayerOneReady() {
            this.setReady(0);
        }
    }, {
        key: 'onPlayerTwoReady',
        value: function onPlayerTwoReady() {
            this.setReady(1);
        }
    }, {
        key: 'setReady',
        value: function setReady(index) {
            this.states[index] = true;
            this.elements[index].style.display = 'none';

            if (this.states[0] && this.states[1]) {
                this.players[0].controller.removeActionListener(this.onPlayerOneReady);
                this.players[1].controller.removeActionListener(this.onPlayerTwoReady);
                this.onReady();
            }
        }
    }]);

    return ReadyCheck;
}();

exports.default = ReadyCheck;

},{}],22:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Minimap = require('./Minimap.js');

var _Minimap2 = _interopRequireDefault(_Minimap);

var _TopCamera = require('./TopCamera.js');

var _TopCamera2 = _interopRequireDefault(_TopCamera);

var _BottomCamera = require('./BottomCamera.js');

var _BottomCamera2 = _interopRequireDefault(_BottomCamera);

var _Map = require('./Map.js');

var _Map2 = _interopRequireDefault(_Map);

var _Player = require('../engine/Player.js');

var _Player2 = _interopRequireDefault(_Player);

var _Canvas = require('../tool/Canvas.js');

var _Canvas2 = _interopRequireDefault(_Canvas);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Renderer = function () {

    /**
     * Constructor
     *
     * @param {World} world
     */
    function Renderer(world) {
        _classCallCheck(this, Renderer);

        var width = window.innerWidth /* * devicePixelRatio*/;
        var height = window.innerHeight /* * devicePixelRatio*/;

        this.world = world;
        this.canvas = new _Canvas2.default(width, height, document.getElementById('canvas'));
        this.canvas.element.style.width = window.innerWidth + 'px';
        this.canvas.element.style.height = window.innerHeigh + 'px';
        this.reset();
    }

    _createClass(Renderer, [{
        key: 'reset',
        value: function reset() {
            var width = this.canvas.element.width;
            var height = this.canvas.element.height;
            var halfHeight = Math.ceil(height / 2);
            var distance = this.world.getDistance();

            delete this.map;
            delete this.minimap;
            delete this.cameras;

            this.fov = Math.round(distance / Renderer.fov);
            this.scale = width / this.fov;
            this.map = new _Map2.default(this.world.rooms, distance, this.scale, halfHeight);
            this.minimap = new _Minimap2.default(distance, width, height);
            this.cameras = [new _TopCamera2.default(this.canvas, this.map, this.world.players[0], this.scale, 0), new _BottomCamera2.default(this.canvas, this.map, this.world.players[1], this.scale, halfHeight)];
        }

        /**
         * Draw the whole game
         */

    }, {
        key: 'draw',
        value: function draw() {
            this.canvas.clear();

            var meet = this.world.meet(this.canvas.element.width / this.scale);
            var difference = meet ? Math.round(this.world.getDifference() * this.scale) : 0;

            this.cameras[0].draw(meet ? this.cameras[1].avatar : null, difference);
            this.cameras[1].draw(meet ? this.cameras[0].avatar : null, difference);

            this.minimap.draw(this.canvas, [this.cameras[0].avatar, this.cameras[1].avatar]);
        }
    }]);

    return Renderer;
}();

Renderer.fov = 60;
exports.default = Renderer;

},{"../engine/Player.js":3,"../tool/Canvas.js":11,"./BottomCamera.js":17,"./Map.js":19,"./Minimap.js":20,"./TopCamera.js":24}],23:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _AudioPlayer = require('../tool/AudioPlayer.js');

var _AudioPlayer2 = _interopRequireDefault(_AudioPlayer);

var _ReadyCheck = require('../view/ReadyCheck.js');

var _ReadyCheck2 = _interopRequireDefault(_ReadyCheck);

var _Countdown = require('../tool/Countdown.js');

var _Countdown2 = _interopRequireDefault(_Countdown);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Title = function () {
    function Title(thrust) {
        _classCallCheck(this, Title);

        // Methods bindings
        this.setVictoryMessages = this.setVictoryMessages.bind(this);
        this.startGame = this.startGame.bind(this);
        this.setState = this.setState.bind(this);
        this.toggleState = this.toggleState.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.startCountdown = this.startCountdown.bind(this);
        this.offerReset = this.offerReset.bind(this);
        this.reset = this.reset.bind(this);

        this.thrust = thrust;
        this.countdown = new _Countdown2.default(400, this.startGame);
        this.readyCheck = new _ReadyCheck2.default(this.startCountdown, this.thrust.players);
        this.audioPlayer = new _AudioPlayer2.default();
        this.overlays = {
            title: document.getElementById('title'),
            countdown: document.getElementById('countdown'),
            pause: document.getElementById('pause'),
            gameover: document.getElementById('gameover')
        };

        this.victoryElements = [document.getElementById('player1-victory'), document.getElementById('player2-victory')];

        window.addEventListener('keydown', this.onKeyDown);
    }

    _createClass(Title, [{
        key: 'onKeyDown',
        value: function onKeyDown(event) {
            switch (event.keyCode) {
                case 32:
                    this.toggleState();
                    break;
                case 84:
                    this.audioPlayer.toggle();
                    break;
            }
        }
    }, {
        key: 'reset',
        value: function reset() {
            window.removeEventListener('keydown', this.reset);
            window.removeEventListener('touchstart', this.reset);
            this.readyCheck.reset();
            this.thrust.reset();
            this.setState('title');
        }
    }, {
        key: 'startCountdown',
        value: function startCountdown() {
            this.setState('countdown');
            this.countdown.start();
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            this.thrust.start();
            this.setState(this.thrust.state);
        }
    }, {
        key: 'setVictoryMessages',
        value: function setVictoryMessages(players, distance) {
            var p1percent = Math.floor(players[0].position / distance * 100);
            var p2percent = 100 - p1percent;

            this.victoryElements[0].innerText = p1percent + '%';
            this.victoryElements[1].innerText = p2percent + '%';
        }
    }, {
        key: 'setState',
        value: function setState(state) {
            this.overlays.title.style.display = 'none';
            this.overlays.countdown.style.display = 'none';
            this.overlays.pause.style.display = 'none';
            this.overlays.gameover.style.display = 'none';

            switch (state) {
                case 'title':
                    this.overlays.title.style.display = 'flex';
                    break;
                case 'countdown':
                    this.overlays.countdown.style.display = 'flex';
                    break;
                case 'paused':
                    this.overlays.pause.style.display = 'flex';
                    break;
                case 'gameover':
                    this.overlays.gameover.style.display = 'flex';
                    setTimeout(this.offerReset, 1000);
                    break;
            }
        }
    }, {
        key: 'offerReset',
        value: function offerReset() {
            window.addEventListener('keydown', this.reset);
            window.addEventListener('touchstart', this.reset);
        }
    }, {
        key: 'toggleState',
        value: function toggleState() {
            switch (this.thrust.state) {
                case 'paused':
                    this.thrust.start();
                    break;
                case 'playing':
                    this.thrust.pause();
                    break;
            }

            this.setState(this.thrust.state);
        }
    }]);

    return Title;
}();

exports.default = Title;

},{"../tool/AudioPlayer.js":10,"../tool/Countdown.js":13,"../view/ReadyCheck.js":21}],24:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Camera2 = require('./Camera.js');

var _Camera3 = _interopRequireDefault(_Camera2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TopCamera = function (_Camera) {
    _inherits(TopCamera, _Camera);

    function TopCamera(canvas, map, player, scale, y) {
        _classCallCheck(this, TopCamera);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopCamera).call(this, canvas, map, player, scale, y));

        var margin = _this.canvas.element.width / 4 / _this.scale;

        _this.centerX = canvas.element.width * 3 / 4;
        _this.centerY = canvas.element.height / 4;
        _this.marginLeft = -Math.floor(3 * margin);
        _this.marginRight = Math.floor(margin);
        return _this;
    }

    _createClass(TopCamera, [{
        key: 'translate',
        value: function translate(x) {
            var position = this.map.corridor.distance - this.player.position;

            return this.centerX + (x - position) * this.scale;
        }
    }, {
        key: 'getViewPort',
        value: function getViewPort() {
            var position = this.map.corridor.distance - this.player.position;

            return {
                start: position + this.marginLeft,
                end: position + this.marginRight
            };
        }
    }, {
        key: 'getAlterEgoPosition',
        value: function getAlterEgoPosition(x, difference) {
            return x - difference;
        }
    }, {
        key: 'getView',
        value: function getView(room) {
            return room.mirror;
        }
    }, {
        key: 'getSunDirection',
        value: function getSunDirection() {
            return -1;
        }
    }]);

    return TopCamera;
}(_Camera3.default);

exports.default = TopCamera;

},{"./Camera.js":18}]},{},[9])


//# sourceMappingURL=thrust.js.map
