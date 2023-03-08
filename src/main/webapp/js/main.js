var sidebar = new Vue({
    el: "#sidebar",
    data: {
        showSidebar: true,
        cols: [0, 1, 2, 3],
        rows: [0, 1, 2, 3],
        numbers: [],
        pos_x: 15,
        pos_y: 15,
    },
    created: function () {
        for (let i=0; i<4; i++){
            this.numbers[i] = [];
        }
        for (let x=0; x<4; x++){
            for (let y=0; y<4; y++){
                this.numbers[x][y] = x*4+y+1;
            }
        }
        this.numbers[3][3] = '';
        this.pos_x = 3;
        this.pos_y = 3;
    },
    methods: {
        move: function () {
            this.showSidebar = !this.showSidebar;
        },
        scrollToProfile: function () {
            document.getElementById('introduction').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        },
        scrollToGame: function () {
            document.getElementById('gameList').scrollIntoView({ behavior: "smooth", block: "center", inline: "nearest" });
        },
        scrollToRank: function () {
            document.getElementById('rank').scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
        },
        clickLeft(x, y) {
            if (this.numbers[x][y] == '') {
                return
            }
            if (Math.abs(x-this.pos_x)+Math.abs(y-this.pos_y) === 1){
                this.$set(this.numbers[this.pos_x], this.pos_y, this.numbers[x][y])
                this.$set(this.numbers[x], y, '')
                this.pos_x = x;
                this.pos_y = y;
                this.$forceUpdate()
            }
        },
        disorder() {
            for (let t=0; t<1000; t++){
                this.clickLeft(Math.floor(Math.random()*4), Math.floor(Math.random()*4));
            }
            this.$forceUpdate()
        },
        recover() {
            for (let x=0; x<4; x++){
                for (let y=0; y<4; y++){
                    this.numbers[x][y] = x*4+y+1;
                }
            }
            this.numbers[3][3] = '';
            this.pos_x = 3;
            this.pos_y = 3;
            this.$forceUpdate()
        }
    }
})

var header = new Vue({
    el: ".header",
    data: {
        time: "",
        content: "",
        showProfile: false,
        showPhotoHover: false,
        showPhoto: true,
    },
    created: function () {//这里是定时器
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
        },
        homepage: function () {
            window.location.href = "home.html";
        },
    }
})

var game = new Vue({
    el: ".gameList",
    methods: {
        gosnake: function () {
            window.location.href="snake.html";
        },
        gotetris: function () {
            window.location.href="tetris.html";
        },
        gosweep: function () {
            window.location.href="sweep.html";
        },
        gosudoku: function () {
            window.location.href="sudoku.html";
        },
        gopacman: function () {
            window.location.href="pacman.html";
        }
    },
})

var rank = new Vue({
    el: ".rank",
    data: {
        rank_snake: [

        ],
        rank_tetris: [

        ],
        rank_sweep: [

        ],
    },
    created: function () {
        var _this = this;
//        axios.post('http://localhost:8080/WebGame/rank')
//        .then(function (response) {
//            var resp = response.data;
//            console.log(resp);
//            _this.rank_snake = resp[0];
//            _this.rank_tetris = resp[1];
//            _this.rank_sweep = resp[2];
//        })
//        .catch(function (error) {
//            console.log(error);
//        });
    },
})