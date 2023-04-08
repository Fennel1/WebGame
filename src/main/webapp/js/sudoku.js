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

var sudoku = new Vue({
    el: "#game",
    data: {
        hour: 0,
        minute: 0,
        ms: 0,
        second: 0,
        time: "",
        cnt_time: '00:00:00',
        top_time: '00:00:00',
        big_cols: [0,1,2],
        big_rows: [0,1,2],
        cols: [0,1,2],
        rows: [0,1,2],
        fix: [],
        sudoku : [],
        errorNum: 0,
        blockError: 0,
        difficulty: 1,
        key_cols: [0, 1, 2],
        key_rows: [0, 1, 2],
        pos_x: 0,
        pos_y: 0,
        count: 0,
        isRed: [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]],
        checkPoint: [],
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
            var _this = this;
            var params = new URLSearchParams();
            let arr = this.cnt_time.split(':');
            let h = parseInt(arr[0]);
            let m = parseInt(arr[1]);
            let s = parseInt(arr[2]);
            var v = h*3600 + m*60 + s;
            params.append('score', v);
            params.append('difficulty', this.difficulty);
            axios.post('http://localhost:8080/WebGame/sudokuUpload', params)
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
//                console.log(len);
                if (len > 175)          this.difficulty = 6;
                else if (len > 140)     this.difficulty = 5;
                else if (len > 105)     this.difficulty = 4;
                else if (len > 70)      this.difficulty = 3;
                else if (len > 35)      this.difficulty = 2;
                else                    this.difficulty = 1;
            }
        },
        back() {
            window.location.href = "main.html";
        },
        timeStart() {
            this.time = setInterval(this.timer, 50);
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
        clickKeyboradNumber(num){
            if (this.sudoku[this.pos_x][this.pos_y] == ''){
                this.count++
            }
            this.sudoku[this.pos_x][this.pos_y] = num
            this.setRed()
            this.$forceUpdate()
            var keyboard = document.querySelector('#keyboard')
            keyboard.style.visibility = 'hidden'
            if (this.count == 81){
                this.checkWin()
            }
        },
        clickDelete(){
            if (this.sudoku[this.pos_x][this.pos_y] != ''){
                this.count--
            }
            this.sudoku[this.pos_x][this.pos_y] = ''
            this.setRed()
            this.$forceUpdate()
            var keyboard = document.querySelector('#keyboard')
            keyboard.style.visibility = 'hidden'
        },
        clickLeft(x, y){
//            console.log(x, y)
            if (this.fix[x][y]) {
                var keyboard = document.querySelector('#keyboard')
                keyboard.style.visibility = 'hidden'
                return
            }
            this.pos_x = x
            this.pos_y = y
            var keyboard = document.querySelector('#keyboard')
//            console.log(keyboard)
            keyboard.style.margin = (x+1)*90 + 'px ' + ((y-1)*90+20) + 'px'
            keyboard.style.visibility = 'visible'
        },
        init() {
            this.count = 81
            this.errorNum = 0
            this.blockError = 0
            var keyboard = document.querySelector('#keyboard')
            keyboard.style.visibility = 'hidden'
            var win = document.querySelector('#win')
            win.style.visibility = 'hidden'
            this.sudoku = [];
            for (let i = 0; i<9; i++) {
                this.sudoku[i] = []
                this.fix[i] = []
                this.checkPoint[i] = []
            }
            for (let x=0; x<9; x++) {
                for (let y=0; y<9; y++){
                    this.fix[x][y] = 1;
                }
            }
            for (let x=0; x<9; x++) {
                let repeat = this.randomNum();
                for (let y=0; y<9; y++){
                    if (this.blockError > 10) {
                        this.blockError = 0
                        this.errorNum = 0
                        this.sudoku[x] = []
                        this.sudoku[x - 1] = []
                        x -= 2
                        break
                    }
                    if (this.errorNum > 10) {
                        //重置
                        y = -1
                        this.errorNum = 0;
                        repeat = this.randomNum()
                        this.sudoku[x] = []
                        continue
                    }
                    let num = this.random(repeat, 0, repeat.length - 1)
                    let status = this.isTrue(num, x, y)
                    if (status) {
                        this.errorNum = 0
                        this.blockError = 0
                        let index = repeat.indexOf(num);
                        repeat.splice(index, 1)
                        this.sudoku[x].push(num)
                    } else {
                        y--
                    }
                }
            }
            this.digHole()
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    this.checkPoint[i][j] = this.sudoku[i][j];
                }
            }
//            console.log(this.sudoku)
//            console.log(this.fix)
        },
        reset: function () {
            clearInterval(this.time);
            this.minute = 0;
            this.ms = 0;
            this.second = 0;
            this.cnt_time = '00:00:00';
            this.timeStart();
            this.init();
            this.isRed =
                [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]];
        },
        random(arr, min, max) {
              if (arr.length === 1) return arr[0]
              let num = Math.floor(Math.random() * (max - min + 1)) + min;
              return arr[num];
        },
        randomNum() {
          return [1, 2, 3, 4, 5, 6, 7, 8, 9];
        },
        isTrue(num, x, y) {
            if (this.sudoku[x].includes(num)) {
                return false;
            }
            let y_data = []
            for (let i = 0; i < this.sudoku.length; i++) {
                for (let j = 0; j < this.sudoku[i].length; j++) {
                    if (j === y) {
                    y_data.push(this.sudoku[i][j])
                    break;
                    }
                }
            }
            if (y_data.includes(num)) {
                this.errorNum++
                return false;
            }
            let block_data = this.returnBlock(x, y);
            if (block_data.includes(num)) {
                this.blockError++
                return false;
            }
            return true;
        },
        returnBlock(x, y) {
            if (x === 0) return []
            let block = [];
            if (x < 3) {
                x = 3;
            } else if (x < 6) {
                x = 6;
            } else if (x < 9) {
                x = 9;
            }
            if (y < 3) {
                y = 3;
            } else if (y < 6) {
                y = 6;
            } else if (y < 9) {
                y = 9;
            }
            for (let i = x - 3; i < x; i++) {
                for (let j = y - 3; j < y; j++) {
                    if (this.sudoku[i][j]) block.push(this.sudoku[i][j])
                }
            }
            return block
        },
        digHole() {
            this.difficulty = this.difficulty > 6 ? 6 : this.difficulty;
            //浮动区间
            const interval = this.random([-5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5], 0, 10)
            const level = this.difficulty * 10 + interval;
            let arr = [];
            for (let i = 0; i < 81; i++) {
                arr.push(i);
            }
            //产生随机去除的数位置
            let digArr = [];
            for (let i = 0; i < level; i++) {
                let num = this.random(arr, 0, arr.length - 1);
                arr.splice(arr.indexOf(num), 1);
                digArr.push(num);
            }
            //挖去相应位置的数
            for (let i = 0; i < digArr.length; i++) {
                let x = parseInt(digArr[i] / 9);
                let y = digArr[i] - x * 9;
                this.sudoku[x][y] = '';
                this.fix[x][y] = 0;
                this.count--
            }
        },
        checkWin(){
            for (let i=0; i<9; i++){
                var tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                for (let j=0; j<9; j++){
                    if (tmp[this.sudoku[i][j]-1] > 0){
                        return
                    }
                    tmp[this.sudoku[i][j]-1]++
                }
            }
            for (let i=0; i<9; i++){
                var tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                for (let j=0; j<9; j++){
                    if (tmp[this.sudoku[j][i]-1] > 0){
                        return
                    }
                    tmp[this.sudoku[j][i]-1]++
                }
            }
            for (let i=0; i<3; i++){
                for (let j=0; j<3; j++){
                    var tmp = [0, 0, 0, 0, 0, 0, 0, 0, 0]
                    for (let k=0; k<9; k++){
                        if (tmp[this.sudoku[parseInt(k/3)][k%3]-1]){
                            return
                        }
                        tmp[this.sudoku[parseInt(k/3)][k%3]-1]++
                    }
                }
            }

            var win = document.querySelector('#win')
            win.style.visibility = 'visible'
            clearInterval(this.time);
            if (this.top_time == '00:00:00') this.top_time = this.cnt_time;
            else if (this.cnt_time < this.top_time) this.top_time = this.cnt_time;
        },
        setRed(){
            this.isRed =
                [[0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0]];

            for (let i=0; i<9; i++){
                if (this.pos_y == i)    continue;
                if (this.sudoku[this.pos_x][i] == this.sudoku[this.pos_x][this.pos_y]){
                    this.isRed[this.pos_x][i] = 1;
                    this.isRed[this.pos_x][this.pos_y] = 1;
                }
            }
            for (let i=0; i<9; i++){
                if (this.pos_x == i)    continue;
                if (this.sudoku[i][this.pos_y] == this.sudoku[this.pos_x][this.pos_y]){
                    this.isRed[i][this.pos_y] = 1;
                    this.isRed[this.pos_x][this.pos_y] = 1;
                }
            }
            var tmp_x = parseInt(this.pos_x/3);
            var tmp_y = parseInt(this.pos_y/3);
            for (let i=0; i<3; i++){
                for (let j=0; j<3; j++){
                    if (tmp_x*3+i==this.pos_x && tmp_y*3+j==this.pos_y) continue;
                    if (this.sudoku[tmp_x*3+i][tmp_y*3+j] == this.sudoku[this.pos_x][this.pos_y]){
                        this.isRed[tmp_x*3+i][tmp_y*3+j] = 1;
                        this.isRed[this.pos_x][this.pos_y] = 1;
                    }
                }
            }
        },
        save() {
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    this.checkPoint[i][j] = this.sudoku[i][j];
                }
            }
        },
        load() {
            for (let i=0; i<9; i++){
                for (let j=0; j<9; j++){
                    this.sudoku[i][j] = this.checkPoint[i][j];
                }
            }
            this.$forceUpdate();
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
