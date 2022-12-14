function Glitter() {
    var _this = this;
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");
    var glitterImagePath = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/53148/";
    var glitter = [];
    var glitterImages = [];
    var width, height;
    var glitterPointer = 0;
    var _squidPos;
    (function () {
        resize();
        for (var i = 0; i < 4; i++) {
        var img = new Image();
        img.src = glitterImagePath + "g" + i + ".png";
        glitterImages.push(img);
        }
        for (var i = 0; i < 300; i++) {
        glitter.push(new GlitterPiece(glitterImages[i % 4]));
        }
        window.addEventListener("resize", resize);
    })();
    function GlitterPiece(img) {
        var _this = this;
        this.x = -100;
        this.y = -100;
        this.vx = 0;
        this.vy = 0;
        this.friction = 0.999;
        this.size = 2 + Math.random() * 4;
        this.opacity = 1;
        this.img = img;
        twinkle();
        function twinkle() {
        TweenMax.to(_this, Math.random() * 2, {
            opacity: 0,
            onComplete: function () {
            TweenMax.to(_this, Math.random() * 2, {
                opacity: 1,
                onComplete: function () {
                twinkle();
                }
            });
            }
        });
        }
        this.draw = function (ctx) {
        _this.x += _this.vx;
        _this.y += _this.vy;
        _this.vx *= _this.friction;
        _this.vy *= _this.friction;
        ctx.save();
        ctx.globalAlpha = _this.opacity;
        ctx.drawImage(_this.img, _this.x, _this.y, _this.size, _this.size);
        ctx.restore();
        };
    }
    function emitGlitter(x, y) {
        glitter[glitterPointer].x = x;
        glitter[glitterPointer].y = y;
        glitter[glitterPointer].vx = Math.random() * 2;
        glitter[glitterPointer].vy = Math.random();
        glitterPointer++;
        if (glitterPointer >= 300) glitterPointer = 0;
    }
    function resize() {
        canvas.width = width = window.innerWidth;
        canvas.height = height = window.innerHeight;
    }
    this.render = function () {
        ctx.clearRect(0, 0, width, height);
        var l = glitter.length;
        for (var i = 0; i < l; i++) {
        glitter[i].draw(ctx);
        }
    };
    this.burst = function (x, y) {
        for (var i = 0; i < 90; i++) {
        setTimeout(function () {
            emitGlitter(x, y);
        }, i * 10);
        }
    };
    }
    function Squid() {
    var _this = this;
    var squidPoints = [
        { x: 60, y: 240 },
        { x: 90, y: -20 },
        { x: 190, y: -20 },
        { x: 260, y: 240 }
    ];
    var squidPath = document.getElementById("squid-body");
    var tenticles = document.getElementsByClassName("squid-tenticle");
    var eyes = document.getElementsByClassName("eye");
    var tenticleWidth = 32;
    this.body = document.getElementById("squid");
    (function () {
        init();
    })();
    function init() {
        TweenLite.set(tenticles[0], { x: 63, y: 218, rotation: 10 });
        TweenLite.set(tenticles[1], {
        x: 63 + 1 * tenticleWidth,
        y: 218,
        rotation: 10
        });
        TweenLite.set(tenticles[2], {
        x: 63 + 2 * tenticleWidth,
        y: 218,
        rotation: 10
        });
        TweenLite.set(tenticles[3], {
        x: 217 - 2 * tenticleWidth,
        y: 228,
        rotation: -23
        });
        TweenLite.set(tenticles[4], {
        x: 217 - 1 * tenticleWidth,
        y: 228,
        rotation: -23
        });
        TweenLite.set(tenticles[5], { x: 217, y: 228, rotation: -23 });
    }
    function animateUp() {
        TweenLite.to(squidPoints[0], 0.9, {
        x: 20,
        y: 180,
        ease: Cubic.easeInOut,
        onComplete: function () {
            animateDown();
        }
        });
        TweenLite.to(squidPoints[3], 0.9, {
        x: 300,
        y: 180,
        ease: Cubic.easeInOut
        });
        TweenLite.to(tenticles[0], 0.9, {
        x: 27,
        y: 160,
        rotation: 22,
        ease: Cubic.easeInOut
        });
        TweenLite.to(tenticles[1], 0.9, {
        x: 34 + 1 * tenticleWidth,
        y: 160,
        rotation: 22,
        ease: Cubic.easeInOut
        });
        TweenLite.to(tenticles[2], 0.9, {
        x: 48 + 2 * tenticleWidth,
        y: 160,
        rotation: 22,
        ease: Cubic.easeInOut
        });
        TweenLite.to(tenticles[3], 0.9, {
        x: 220 - tenticleWidth * 2,
        y: 180,
        rotation: -38,
        ease: Cubic.easeInOut
        });
        TweenLite.to(tenticles[4], 0.9, {
        x: 238 - tenticleWidth,
        y: 175,
        rotation: -38,
        ease: Cubic.easeInOut
        });
        TweenLite.to(tenticles[5], 0.9, {
        x: 251,
        y: 170,
        rotation: -38,
        ease: Cubic.easeInOut
        });
        TweenLite.to(eyes, 0.9, { y: "-=20", ease: Cubic.easeInOut });
        TweenLite.to(_this.body, 0.9, {
        x: "+=10",
        y: "+=10",
        ease: Cubic.easeInOut
        });
    }
    function animateDown() {
        TweenLite.to(squidPoints[0], 0.7, {
        x: 60,
        y: 240,
        ease: Back.easeOut,
        onComplete: function () {
            setTimeout(animateUp, 1700);
        }
        });
        TweenLite.to(squidPoints[3], 0.7, { x: 260, y: 240, ease: Back.easeOut });
        TweenLite.to(tenticles[0], 0.7, {
        x: 63,
        y: 218,
        rotation: 10,
        ease: Back.easeOut
        });
        TweenLite.to(tenticles[1], 0.7, {
        x: 63 + 1 * tenticleWidth,
        y: 218,
        rotation: 10,
        ease: Back.easeOut
        });
        TweenLite.to(tenticles[2], 0.7, {
        x: 63 + 2 * tenticleWidth,
        y: 218,
        rotation: 10,
        ease: Back.easeOut
        });
        TweenLite.to(tenticles[3], 0.7, {
        x: 217 - 2 * tenticleWidth,
        y: 228,
        rotation: -23,
        ease: Back.easeOut
        });
        TweenLite.to(tenticles[4], 0.7, {
        x: 217 - tenticleWidth,
        y: 228,
        rotation: -23,
        ease: Back.easeOut
        });
        TweenLite.to(tenticles[5], 0.7, {
        x: 217,
        y: 228,
        rotation: -23,
        ease: Back.easeOut
        });
        TweenLite.to(eyes, 0.7, { y: "+=20", ease: Back.easeOut });
        TweenLite.to(_this.body, 1.2, {
        x: "-=60",
        y: "-=60",
        ease: Cubic.easeOutQuart,
        onComplete: function () {
            _squidPos[0] -= 50;
            _squidPos[1] -= 50;
        }
        });
        _this.glitter.burst(_squidPos[0] + 80, _squidPos[1] + 80);
    }
    this.render = function () {
        squidPath.setAttribute(
        "d",
        "M" +
            squidPoints[0].x +
            "," +
            squidPoints[0].y +
            " C" +
            squidPoints[1].x +
            "," +
            squidPoints[1].y +
            " " +
            squidPoints[2].x +
            "," +
            squidPoints[2].y +
            " " +
            squidPoints[3].x +
            "," +
            squidPoints[3].y
        );
    };
    this.swim = function () {
        animateUp();
    };
    }
    function render() {
    squid.render();
    glitter.render();
    requestAnimationFrame(render);
    }
    function init() {
    _squidPos = [window.innerWidth - 200, window.innerHeight - 200];
    TweenLite.set(squid.body, {
        rotation: -50,
        x: _squidPos[0],
        y: _squidPos[1]
    });
    squid.swim();
    requestAnimationFrame(render);
    }
    var glitter = new Glitter();
    var squid = new Squid();
    squid.glitter = glitter;
    init();