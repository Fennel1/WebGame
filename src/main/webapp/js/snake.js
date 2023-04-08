var header = new Vue({
    el: ".header",
    data: {
        time: "",
        content: "",
        showProfile: false,
        showPhotoHover: false,
        showPhoto: true,
        isgame: true,
    },
    created: function () {
        setInterval(this.timers, 1000);
        axios.post('http://localhost:8080/WebGame/main')
        .then(function (response) {
            var resp = response.data;
            console.log(resp);
            document.getElementById('uid').innerHTML = 'uid:\t'+resp['uid'];
            document.getElementById('name').innerHTML = 'name:\t'+resp['name'];
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        timers: function () {
            var date = new Date();
            year = date.getFullYear();
            month = date.getMonth() + 1;
            day = date.getDate();
            hours = date.getHours();
            minutes = date.getMinutes();
            seconds = date.getSeconds();
            this.time = year + "." + month + "." + day + "\t" + hours + ":" + minutes + ":" + seconds;
        },
        show: function () {
            this.showProfile = true;
            this.showPhotoHover = true;
        },
        hide: function () {
            this.showProfile = false;
            this.showPhotoHover = false;
        },
        logout: function () {
            window.location.href = "login.html";
        }
    }
})

var snake = new Vue({
    el: "#game",
    data: {
        snakeArray: [],
        isPause: false,
        snakeSize: 3,
        direct: "right",
        speed: 150,
        score: 0,
        topScore: 0,
        timer: null,
        board: null,
        food: null,
        isgame: true,
        difficulty: '简单',
        top_difficulty: '简单',
    },
    directives: { 
        resize: { 
            bind(el, binding) { 
                let width = '', height = '';
                function isReize() {
                    const style = document.defaultView.getComputedStyle(el);
                    if (width !== style.width || height !== style.height) {
                        binding.value();
                    }
                    width = style.width;
                    height = style.height;
                }
                el.__vueSetInterval__ = setInterval(isReize, 300);
            },
            unbind(el) {
                clearInterval(el.__vueSetInterval__);
            }
        }
    },
    created: function () {
        var _this = this;
        axios.post('http://localhost:8080/WebGame/snakeSession')
        .then(function (response) {
            var resp = response.data;
            console.log(resp);
            _this.topScore = resp['score'];
            if (resp['difficulty'] == 1)       _this.top_difficulty = '简单';
            else if (resp['difficulty'] == 2)  _this.top_difficulty = '中等';
            else if (resp['difficulty'] == 3)   _this.top_difficulty = '困难';
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        upload() {
            var _this = this;
            var params = new URLSearchParams();
            params.append('score', this.score);
            if (this.difficulty == '简单'){
                params.append('difficulty', 1);
            }
            else if (this.difficulty == '普通'){
                params.append('difficulty', 2);
            }
            else{
                params.append('difficulty', 3);
            }
            axios.post('http://localhost:8080/WebGame/snakeUpload', params)
            .then(function (response) {
                var resp = response.data;
                console.log(resp);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        resize() {
            var bar = document.querySelector('.bar_into');
            var len = parseInt(bar["style"]["width"]);
            if (len){
                this.speed = 150-len/2;
                console.log(this.speed);
                if (this.speed > 120)       this.difficulty = '简单';
                else if (this.speed > 80)   this.difficulty = '普通';
                else    this.difficulty = '困难';
            }
        },
        back() {
            window.location.href = "main.html";
        },
        init() {
            this.board = document.querySelector("#board");
            while (this.board.hasChildNodes()) {
                this.board.removeChild(this.board.firstChild);
            }
            this.score = 0;
            this.snakeArray = [];
            this.isPause = false;
            this.snakeSize = 3;
            this.direct = "right";
            this.timer = null;
            this.food = null;

            // console.log(this.board);
            this.createSnake();
            this.createFood();
            this.keyListener();
        },
        createSnake() {
            for (var i = 0; i < this.snakeSize; i++) {
                var snake = document.createElement("div");
                if (i === 0) {
                    snake["style"]["backgroundColor"] = "red";
                }
                this.snakeArray.push(snake);
                snake["style"]["left"] = (this.snakeSize - i - 1) * 20 + "px";
                this.board.appendChild(snake);
            }
        },
        createFood() {
            if (this.food) this.board.removeChild(this.food);
            this.food = document.createElement("span");
            var x = null, y = null;
            var flag = true;

            while (true) {
                flag = true;
                x = parseInt("" + (Math.random() * (840 / 20))) * 20;
                y = parseInt("" + (Math.random() * (800 / 20))) * 20;
                if (this.snakeArray) {
                    for (let i = 0; i < this.snakeArray.length; i++) {
                        // console.log(this.snakeArray.length, this.snakeArray[i].offsetLeft,this.snakeArray[i].offsetTop);
                        if (this.snakeArray[i]["offsetLeft"] === x) {
                            if (this.snakeArray[i]["offsetTop"] === y) {
                                flag = false;
                                break;
                            }
                        }
                    }
                }
                if (flag) break;
            }

            this.food["style"]["left"] = x + "px";
            this.food["style"]["top"] = y + "px";
            this.board.appendChild(this.food);
        },
        keyListener() {
            document.onkeydown = event => {
                let oEvent = event || window.event;
                switch (oEvent.keyCode) {
                    case 65:
                        if (this.direct !== "right") this.direct = "left";
                        break;
                    case 87:
                        if (this.direct !== "down") this.direct = "up";
                        break;
                    case 68:
                        if (this.direct !== "left") this.direct = "right";
                        break;
                    case 83:
                        if (this.direct !== "up") this.direct = "down";
                        break;
                    case 32:
                        // console.log(this.isPause);
                        if (!this.isPause) this.pause();
                        else this.start();
                        this.isPause = !this.isPause;
                        break;
                }
            }
        },
        start() {
            clearInterval(this.timer);
            if (this.snakeArray.length === 0) this.init();
            this.timer = setInterval(() => {
                this.move();
                this.isHit();
                this.isEat();
            }, this.speed);
        },
        move() {
            // console.log(this.snakeArray.length, this.snakeArray[0].offsetLeft,this.snakeArray[0].offsetTop);
            var l = this.snakeArray[0].offsetLeft;
            var t = this.snakeArray[0].offsetTop;
            switch (this.direct) {
                case "left":
                    if (l <= 0) {
                        this.gameover();
                        return;
                    }
                    if (this.snakeArray) {
                        for (var i = this.snakeArray.length - 1; i > 0; i--) {
                            this.snakeArray[i]["style"]["left"] = this.snakeArray[i - 1]["style"]["left"];
                            this.snakeArray[i]["style"]["top"] = this.snakeArray[i - 1]["style"]["top"];
                        }
                    }
                    this.snakeArray[0]["style"]["left"] = l - 20 + "px";
                    break;
                case "up":
                    if (t <= 0) {
                        this.gameover();
                        return;
                    }
                    if (this.snakeArray) {
                        for (var i = this.snakeArray.length - 1; i > 0; i--) {
                            this.snakeArray[i]["style"]["left"] = this.snakeArray[i - 1]["style"]["left"];
                            this.snakeArray[i]["style"]["top"] = this.snakeArray[i - 1]["style"]["top"];
                        }
                    }
                    this.snakeArray[0]["style"]["top"] = t - 20 + "px";
                    break;
                case "right":
                    if (l >= 840 - 20) {
                        this.gameover();
                        return;
                    }
                    if (this.snakeArray) {
                        for (var i = this.snakeArray.length - 1; i > 0; i--) {
                            // console.log(this.snakeArray[0].offsetLeft, this.snakeArray[i].offsetLeft);
                            // console.log(this.snakeArray[0].offsetTop, this.snakeArray[i].offsetTop);
                            this.snakeArray[i]["style"]["left"] = this.snakeArray[i - 1]["style"]["left"];
                            this.snakeArray[i]["style"]["top"] = this.snakeArray[i - 1]["style"]["top"];
                        }
                    }
                    this.snakeArray[0]["style"]["left"] = l + 20 + "px";
                    break;
                case "down":
                    if (t >= 800 - 20) {
                        this.gameover();
                        return;
                    }
                    if (this.snakeArray) {
                        for (var i = this.snakeArray.length - 1; i > 0; i--) {
                            this.snakeArray[i]["style"]["left"] = this.snakeArray[i - 1]["style"]["left"];
                            this.snakeArray[i]["style"]["top"] = this.snakeArray[i - 1]["style"]["top"];
                        }
                        this.snakeArray[0]["style"]["top"] = t + 20 + "px";
                    }
                    break;
            }
        },
        isHit() {
            if (this.snakeArray) {
                for (var i = 1, j = this.snakeArray.length; i < j; i++) {
                    // console.log(this.snakeArray[0].offsetLeft, this.snakeArray[i].offsetLeft);
                    // console.log(this.snakeArray[0].offsetTop, this.snakeArray[i].offsetTop);
                    if (this.snakeArray[0].offsetLeft === this.snakeArray[i].offsetLeft) {
                        if (this.snakeArray[0].offsetTop === this.snakeArray[i].offsetTop) {
                            this.gameover();
                            break;
                        }
                    }
                }
            }
        },
        isEat() {
            if (this.snakeArray) {
                if (this.snakeArray[0].offsetLeft === this.food.offsetLeft &&
                    this.snakeArray[0].offsetTop === this.food.offsetTop) {
                    this.score++;
                    var snake = document.createElement("div");
                    snake["style"]["left"] = this.food["style"]["left"];
                    snake["style"]["top"] = this.food["style"]["top"];
                    this.snakeArray.push(snake);
                    this.board.appendChild(snake);
                    this.createFood();
                }
            }
        },
        gameover() {
            this.topScore = this.score > this.topScore ? this.score : this.topScore;
            this.isgame = false;
            clearInterval(this.timer);
        },
        pause() {
            clearInterval(this.timer)
        },
        reset() {
            this.isgame = true;
            this.init();
        },
    },
})

var eBarWrap = document.getElementById('wrap');
var eBarCon = eBarWrap.getElementsByClassName('bar_container')[0];
var eBarInto = eBarWrap.getElementsByClassName('bar_into')[0];
var eBarDrag = eBarWrap.getElementsByClassName('bar_drag')[0];

var nMax = eBarCon.offsetWidth - eBarDrag.offsetWidth;
eBarDrag.addEventListener('mousedown', function (event) {
    var nInitX = event.clientX;
    var nInitLeft = this.offsetLeft;
    document.onmousemove = event => {
        event.preventDefault();
        let nX = event.clientX - nInitX + nInitLeft;
        if (nX >= nMax) {
            nX = nMax;
        }
        if (nX <= 0) {
            nX = 0;
        }
        this.style.left = nX + 'px';
        eBarInto.style.width = nX + this.offsetWidth / 2 + 'px';
    };
    document.onmouseup = function (event) {
        document.onmousemove = null;
        document.onmouseup = null;
    }
});

eBarCon.addEventListener('click', function (event) {
    var nLeft = this.offsetLeft;
    var eParent = this.offsetParent;
    while (eParent) {
        nLeft += eParent.offsetLeft;
        eParent = eParent.offsetParent;
    }
    var nX = event.clientX - nLeft;
    eBarDrag.style.left = nX + 'px';
    eBarInto.style.width = nX + eBarDrag.offsetWidth / 2 + 'px';
});
