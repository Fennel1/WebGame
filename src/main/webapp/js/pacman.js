var header = new Vue({
    el: ".header",
    data: {
        time: "",
        content: "",
        showProfile: false,
        showPhotoHover: false,
        showPhoto: true,
    },
    created: function () {
        setInterval(this.timer, 1000);
//        axios.post('http://localhost:8080/WebGame/main')
//        .then(function (response) {
//            var resp = response.data;
//            console.log(resp);
//            document.getElementById('uid').innerHTML = 'uid:\t'+resp['uid'];
//            document.getElementById('name').innerHTML = 'name:\t'+resp['name'];
//        })
//        .catch(function (error) {
//            console.log(error);
//        });
    },
    methods: {
        timer: function () {
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

var pacman = new Vue({
    el: "#game",
    data: {
        hour: 0,
        minute: 0,
        ms: 0,
        second: 0,
        time: "",
        cnt_time: '00:00:00',
        move_time: null,
        difficulty: 1,
        speed: 1000,
        cols: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27],
        rows: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26],
        isBlock: [  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1],
                    [1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1,1,1,1,1],
                    [0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,0,1,0,1,0,0,0,0,1,0,0,0,0,1,0,1,0,1,1,1,1,1],
                    [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
                    [1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
                    [1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1],
                    [1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1],
                    [1,1,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,1],
                    [1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1],
                    [1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1],
                    [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],],

        isFood:  [  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1],
                    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
                    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
                    [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
                    [1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
                    [1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1],
                    [1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1],
                    [1,1,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,1],
                    [1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1],
                    [1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1],
                    [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],],
        pac_x: 0,
        pac_y: 0,
        enemy_x: 0,
        enemy_y: 0,
        pac_direct: '',
        enmey_direct: '',
        foodNum: 317,
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

    created() {
        this.init();
        this.timeStart();
    },

    methods: {
        upload () {
        },
        resize() {
            var bar = document.querySelector('.bar_into');
            var len = parseInt(bar["style"]["width"]);
            if (len){
//                console.log(len);
                if (len > 175) {
                    this.difficulty = 6;
                    this.speed = 100;
                }
                else if (len > 140) {
                    this.difficulty = 5;
                    this.speed = 200;
                }
                else if (len > 105) {
                    this.difficulty = 4;
                    this.speed = 400;
                }
                else if (len > 70) {
                    this.difficulty = 3;
                    this.speed = 600;
                }
                else if (len > 35) {
                    this.difficulty = 2;
                    this.speed = 800;
                }
                else {
                    this.difficulty = 1;
                    this.speed = 1000;
                }
            }
        },
        back() {
            window.location.href = "main.html";
        },
        timeStart() {
            this.time = setInterval(this.timer, 50);
            this.move_time = setInterval(this.move_timer, this.speed);
        },
        timer() {
            this.ms = this.ms + 50;
            if (this.ms >= 1000) {
                this.ms = 0;
                this.second = this.second + 1;
            }
            if (this.second >= 60) {
                this.second = 0;
                this.minute = this.minute + 1;
            }
            if (this.minute >= 60) {
                this.minute = 0;
                this.hour = this.hour + 1 ;
            }
            this.cnt_time = this.toDub(this.hour) + ':' + this.toDub(this.minute) + ':' + this.toDub(this.second);
        },
        toDub(n) {
            if (n < 10) {
                return '0' + n;
            } else {
                return '' + n;
            }
        },
        reset: function () {
            clearInterval(this.time);
            clearInterval(this.move_time);
            this.minute = 0;
            this.ms = 0;
            this.second = 0;
            this.cnt_time = '00:00:00';
            this.timeStart();
            this.init();
        },
        init() {
            this.pac_x = 12;
            this.pac_y = 10;
            this.enemy_x = 12;
            this.enemy_y = 16;

            this.pac_direct = '';
            this.enemy_direct = '';
            var win = document.querySelector('#ghost_win')
            win.style.visibility = 'hidden'
            var win = document.querySelector('#pacman_win')
            win.style.visibility = 'hidden'

            this.isFood =
                   [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,1,0,1,0,1,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1],
                    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
                    [0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0],
                    [1,1,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,1,1],
                    [1,0,0,0,0,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,0,0,0,0,1],
                    [1,0,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,1,1,0,1],
                    [1,0,1,1,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,0,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
                    [1,0,1,1,0,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,0,1,1,0,1],
                    [1,0,0,1,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,1,0,0,1],
                    [1,1,0,1,0,1,1,0,1,0,1,1,1,1,1,1,1,0,1,0,1,1,0,1,0,1,1],
                    [1,1,0,1,0,1,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1,1,0,1,0,1,1],
                    [1,1,0,1,0,1,1,0,1,1,1,1,1,1,1,1,1,1,1,0,1,1,0,1,0,1,1],
                    [1,0,0,0,0,1,1,0,0,0,0,0,1,1,1,0,0,0,0,0,1,1,0,0,0,0,1],
                    [1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1],
                    [1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],
                    [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]];
            this.foodNum = 317;

            this.keyListener();
        },
        move_timer() {
            this.move();
        },
        keyListener() {
            document.onkeydown = event => {
                let oEvent = event || window.event;
                switch (oEvent.keyCode) {
                    case 65:
                        this.pac_direct = "left";
                        break;
                    case 87:
                        this.pac_direct = "up";
                        break;
                    case 68:
                        this.pac_direct = "right";
                        break;
                    case 83:
                        this.pac_direct = "down";
                        break;
                }
                switch (oEvent.keyCode) {
                    case 74:
                        this.enemy_direct = "left";
                        break;
                    case 73:
                        this.enemy_direct = "up";
                        break;
                    case 76:
                        this.enemy_direct = "right";
                        break;
                    case 75:
                        this.enemy_direct = "down";
                        break;
                }
            }
        },
        move() {
            switch (this.pac_direct) {
                case "left":
                    if (this.pac_x == 12 && this.pac_y == 0){
                        this.pac_y = 26;
                        if (!this.isFood[this.pac_x][this.pac_y]){
                            this.isFood[this.pac_x][this.pac_y] = 1;
                            this.foodNum--;
                        }
                    }
                    else if (!this.isBlock[this.pac_x][this.pac_y-1]) {
                        this.pac_y -= 1;
                        if (!this.isFood[this.pac_x][this.pac_y]){
                            this.isFood[this.pac_x][this.pac_y] = 1;
                            this.foodNum--;
                        }
                    }
                    break;
                case "up":
                    if (!this.isBlock[this.pac_x-1][this.pac_y]) {
                        this.pac_x -= 1;
                        if (!this.isFood[this.pac_x][this.pac_y]){
                            this.isFood[this.pac_x][this.pac_y] = 1;
                            this.foodNum--;
                        }
                    }
                    break;
                case "right":
                    if (this.pac_x == 12 && this.pac_y == 26){
                        this.pac_y = 0;
                        if (!this.isFood[this.pac_x][this.pac_y]){
                            this.isFood[this.pac_x][this.pac_y] = 1;
                            this.foodNum--;
                        }
                    }
                    else if (!this.isBlock[this.pac_x][this.pac_y+1]) {
                        this.pac_y += 1;
                        if (!this.isFood[this.pac_x][this.pac_y]){
                            this.isFood[this.pac_x][this.pac_y] = 1;
                            this.foodNum--;
                        }
                    }
                    break;
                case "down":
                    if (!this.isBlock[this.pac_x+1][this.pac_y]) {
                        this.pac_x += 1;
                        if (!this.isFood[this.pac_x][this.pac_y]){
                            this.isFood[this.pac_x][this.pac_y] = 1;
                            this.foodNum--;
                        }
                    }
                    break;
            }

            if (!this.foodNum){
                var win = document.querySelector('#pacman_win')
                win.style.visibility = 'visible'
                clearInterval(this.time);
                clearInterval(this.move_time);
                return;
            }

            switch (this.enemy_direct) {
                case "left":
                    if (this.enemy_x == 12 && this.enemy_y == 0){
                        this.enemy_y = 26;
                    }
                    else if (!this.isBlock[this.enemy_x][this.enemy_y-1]) {
                        this.enemy_y -= 1;
                    }
                    break;
                case "up":
                    if (!this.isBlock[this.enemy_x-1][this.enemy_y]) {
                        this.enemy_x -= 1;
                    }
                    break;
                case "right":
                    if (this.enemy_x == 12 && this.enemy_y == 26){
                        this.enemy_y = 0;
                    }
                    else if (!this.isBlock[this.enemy_x][this.enemy_y+1]) {
                        this.enemy_y += 1;
                    }
                    break;
                case "down":
                    if (!this.isBlock[this.enemy_x+1][this.enemy_y]) {
                        this.enemy_x += 1;
                    }
                    break;
            }

            if (this.pac_x == this.enemy_x && this.pac_y == this.enemy_y){
                var win = document.querySelector('#ghost_win')
                win.style.visibility = 'visible'
                clearInterval(this.time);
                clearInterval(this.move_time);
            }
        }
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
