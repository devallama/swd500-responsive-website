/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classes_keyboard_js__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__classes_rocket_js__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__classes_star_js__ = __webpack_require__(3);




(function() {
    let keyboard = new __WEBPACK_IMPORTED_MODULE_0__classes_keyboard_js__["a" /* default */]();
    let stage;
    let starsContainer;
    console.log("start rocket");

    var queue = new createjs.LoadQueue();
    queue.on("complete", init, this);
    queue.loadManifest([
        {
            id: "rocket", src: "../resources/imgs/rocket_sprites.png",
        }
    ]);

    function init(event) {
        let assets = event.currentTarget;
        createStage();
        createRocket(assets);
        addListeners();
    }

    function createStage() {
        stage = new createjs.Stage("canvas");
        starsContainer = new createjs.Container();

        stage.addChild(starsContainer);

        stage.lastMousePos = {x: 0, y: 0};

        resizeCanvas();
    }

    function createStars() {
        let stars = [['#2f687f', '#af8e1c', '#c86868', '#5ac8f5', '#be3fc9', '#b94353'],['#2f687f', '#af8e1c', '#c86868', '#5ac8f5', '#be3fc9', '#b94353']];
        outer:
        for(let i = 0; i < stars.length; i++) {
            stars[i] = shuffleArray(stars[i]);
            console.log(stars[i]);
            for(let j = 0; j < stars[i].length; j++) {
                let resp = new __WEBPACK_IMPORTED_MODULE_2__classes_star_js__["a" /* default */](stage, starsContainer, stars[i][j]);
                if(!resp.success) {
                    console.log("stopped making stars");
                    break outer;
                } 
            }
        }
    }

    function shuffleArray(array) {
        for(let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]]; 
        }
        return array;
    }

    function removeStars() {
        starsContainer.removeAllChildren();
    }

    function createRocket(assets) {
        let rocket_spritesheet = new createjs.SpriteSheet(getRocketSpritesheet(assets));
        
        let rocket = new __WEBPACK_IMPORTED_MODULE_1__classes_rocket_js__["a" /* default */](stage, rocket_spritesheet, 'stop');
    }

    function getRocketSpritesheet(assets) {
        return {
            images: [assets.getResult('rocket')],
            frames: {
                width: 100,
                height: 180
            },
            animations: {
                stop: 0,
                move: [1, 4, "move", 1],
            }
        }
    }

    function addListeners() {
        window.addEventListener("resize", resizeCanvas);

        createjs.Ticker.interval = 50;
        createjs.Ticker.addEventListener("tick", handleTick);
    }

    function handleTick(event) {
        let rocket = stage.getChildByName("rocket");
        
        if(stage.lastMousePos.x != stage.mouseX || stage.lastMousePos.y != stage.mouseY) {
            stage.lastMousePos.x = stage.mouseX;
            stage.lastMousePos.y = stage.mouseY;
            rocket.dispatchEvent("mousechange");
        }

        rocket.handleMove();
        
        stage.update(event);
    }

    function resizeCanvas() {
        console.log("called");
        document.getElementById('canvas').width = window.innerWidth;
        document.getElementById('canvas').height = document.getElementById('section_top').offsetHeight;

        stage.setBounds(0, 0, document.getElementById('canvas').width, document.getElementById('canvas').height);

        removeStars();
        createStars();
    }
})()

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class KeyboardInit {
    constructor() {
        this.keys_down = [];
        document.addEventListener("keydown", this.keyDown.bind(this));
        document.addEventListener("keyup", this.keyUp.bind(this));
    }

    keyDown(e) {
        this.__addKey(e.key, this.keys_down);
    }

    keyUp(e) {
        this.__removeKey(e.key, this.keys_down);
    }

    __addKey(key, array) {
        if(array.indexOf(key) < 0) {
            array.push(key);
        }
    }

    __removeKey(key, array) {
        if(array.indexOf(key) >= 0) {
            array.splice(array.indexOf(key), 1);
        }
    }

    isKeyDown(key) {
        if(this.keys_down.indexOf(key) >= 0) {
            return true;
        } else {
            return false;
        }
    }
}

/* harmony default export */ __webpack_exports__["a"] = (KeyboardInit);

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Rocket extends createjs.Sprite {
    constructor(stage, spriteSheet, animation) {
        super(spriteSheet, animation);

        this.name = "rocket";
        this.currentSpeed = 5;
        this.active = false;

        this.regX = this.getBounds().width / 2;
        this.regY = this.getBounds().height / 2;

        this.scaleX = this.scaleY = 1;
        this.rotation = 180;

        this.x = stage.getBounds().width / 20;
        this.y = stage.getBounds().height / 2;

        stage.addChild(this);

        this.addListeners();
    }

    addListeners() {
        this.addEventListener('mousechange', this.mouseMove.bind(this));
    }

    handleMove() {
        if(this.active) {
            let targetPos = this.targetPos;

            let direction = Math.atan2(targetPos.x - this.x, targetPos.y - this.y);
            let direction_degrees = this.radians_to_degrees(direction);
            
            this.rotation = -direction_degrees;
            
            if(!this.intercepts(targetPos.x, targetPos.y)) {
                if(this.currentAnimation != 'move') {
                    this.gotoAndPlay('move');
                }

                let x = (this.currentSpeed / Math.sin(Math.PI / 2)) * Math.sin(direction);
                let y = (this.currentSpeed / Math.sin(Math.PI / 2)) * Math.sin(Math.PI - (Math.PI / 2 + direction));

                this.x += x;
                this.y += y;
            } else {
                if(this.currentAnimation != 'stop') {
                    this.gotoAndStop('stop');
                }
            }
        }
    }

    mouseMove(event) {
        let targetPos = {};
        targetPos.x = this.stage.mouseX;
        targetPos.y = this.stage.mouseY;
        
        this.active = true;
        this.targetPos = targetPos;
    }

    intercepts(x, y) {
        let half_width = this.getActualBounds().half_width;
        let half_height = this.getActualBounds().half_height;
        if(x < this.x + half_width && x > this.x - half_width && y < this.y + half_height && y > this.y - half_height) {
            return true;
        }
        return false;
    }

    degrees_to_radians(degrees) {
        let radians = degrees * (Math.PI / 180);
        return radians;
    }

    radians_to_degrees(radians) {
        let degrees = radians * (180 / Math.PI);
        return degrees;
    }

    getActualBounds() {
        let width = this.getBounds().width * this.scaleX;
        let height = this.getBounds().height * this.scaleY;

        let half_width = width / 2;
        let half_height = height / 2;

        return {
            width: width,
            height: height,
            half_width: half_width,
            half_height: half_height
        };
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Rocket);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
class Star extends createjs.Shape {
    constructor(stage, starsCollection, colour) {
        super();
        let success = this.createStar(stage, starsCollection, colour);
        this.success = success;
    }

    createStar(stage, starsCollection, colour) {
        let position = this.generateXY(stage);
        let failed = 0;
        const maxFailed = 5;

        for(let i = 0; i < starsCollection.numChildren; i++) {
            if(this.intercepts({x: starsCollection.getChildAt(i).x, y: starsCollection.getChildAt(i).y}, position, 400)) {
                failed++;
                position = this.generateXY(stage);
                console.log("failed " + failed + " times.");
                if(failed == maxFailed) {
                    return false;
                } else {
                    i--;
                    continue;
                }
            }
        }

        let randomRadius = this.__getRandomInt(30, 90);
        
        let angle = this.__getRandomInt(0, 360);

        let radius = (randomRadius / 10) * (stage.getBounds().width / 400);

        this.graphics.beginFill(colour).drawPolyStar(position.x, position.y, radius, 5, 0, angle).endFill();

        starsCollection.addChild(this);

        return true;
    }
    
    __getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    generateXY(stage) {
        let stageX = stage.getBounds().width;
        let stageY = stage.getBounds().height;

        let minX = (stageX / 100) * 10;
        let maxX = stageX - minX

        let minY = (stageY / 100) * 10;
        let maxY = stageY - minY;

        let x = this.__getRandomInt(minX, maxX);
        let y = this.__getRandomInt(minY, maxY);

        return {
            x: x,
            y: y
        };
    }

    intercepts(objectXY, targetXY, radius) {
        if(targetXY.x < objectXY.x + radius || targetXY.x > objectXY - radius) {
            if(targetXY.y < objectXY.y + radius || targetXY.y > objectXY - radius) {
                console.log("failed intercept");
                return true;
            }
        }
        return false;
    }
}

/* harmony default export */ __webpack_exports__["a"] = (Star);

/***/ })
/******/ ]);