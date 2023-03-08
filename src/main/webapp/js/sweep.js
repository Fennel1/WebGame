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

var sweep = new Vue({
    el: "#game",
    data: {
        nums: [],
        cols: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19],
        rows: [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20],
        mineArr: [],
        mineNum: 50,
        openNum: 0,
        rightMarkNum: 0,
        markNum: 0,
        latticeArr: [],
        GameOver: false,
        Win: false,
        hour: 0,
        minute: 0,
        ms: 0,
        second: 0,
        time: "",
        cnt_time: '00:00:00',
        top_time: '00:00:00',
        allTrue: true,
        block: "⁣⁣⁣⁣　",
        difficulty: '简单',
        isInit: false,
        idx: 0,
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
        this.isInit = false;
        this.timeStart();
        var _this = this;
//        axios.post('http://localhost:8080/WebGame/sweepSession')
//        .then(function (response) {
//            var resp = response.data;
//            console.log(resp);
//            let s = resp['score'] % 60;
//            let m = parseInt(resp['score'] / 60) % 60;
//            let h = parseInt(resp['score'] / 3600);
//            _this.top_time = h.toString()+':'+m.toString()+':'+s.toString();
//        })
//        .catch(function (error) {
//            console.log(error);
//        });
    },
    methods: {
        upload () {
            var _this = this;
            var params = new URLSearchParams();
//            console.log(this.top_time);
            let arr = this.top_time.split(':');
            let h = parseInt(arr[0]);
            let m = parseInt(arr[1]);
            let s = parseInt(arr[2]);
            var v = h*3600 + m*60 + s;
//            console.log(h,m,s,v)
            params.append('score', v);
//            axios.post('http://localhost:8080/WebGame/sweepUpload', params)
//            .then(function (response) {
//                var resp = response.data;
//                console.log(resp);
//            })
//            .catch(function (error) {
//                console.log(error);
//            });
        },
        resize() {
            var bar = document.querySelector('.bar_into');
            var len = parseInt(bar["style"]["width"]);
            if (len){
//                console.log(len);
                if (len > 140){
                    this.difficulty = '困难';
                    this.mineNum = 120
                }
                else if (len > 70){
                    this.difficulty = '普通';
                    this.mineNum = 80;
                }
                else{
                    this.difficulty = '简单';
                    this.mineNum = 50;
                }
            }
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
        init() {
            var gameover = document.getElementById('gameover');
            gameover.style.visibility = 'hidden';
            var w = document.getElementById('win');
            w.style.visibility = 'hidden';
            this.rightMarkNum = 0;
            this.openNum = 0;
            this.markNum = 0;
            this.GameOver = false;
            this.win = false
            this.latticeArr = [];
            this.mineArr = [];
            this.getMinePosition();
            for (var i=0; i<420; i++){
                this.latticeArr.push({
                    index: i, // 格子索引
                    mineNum: 0, // 周围雷数
                    isMine: false, // 是否是雷
                    isOpen: false, // 是否已经被点开
                    isMark: false, // 是否被标记
                });
            }
            for (var i=0; i<420; i++){
                if (this.mineArr.indexOf(i) !== -1) this.latticeArr[i].isMine = true;
            }
            for (var i=0; i<420; i++){
                this.latticeArr[i].mineNum = this.getMineNum(i);
            }
            this.isInit = true;
        },
        reset: function () {
            clearInterval(this.time);
            this.hour = 0;
            this.minute = 0;
            this.ms = 0;
            this.second = 0;
            this.cnt_time = '00:00:00';
            this.timeStart();
            this.init();
            this.isInit = false;
        },
        back() {
            window.location.href = "main.html";
        },
        getMinePosition() {
            for (var n = 0; n < this.mineNum; n++) {
                const random = Math.floor(Math.random() * 420)
                if (Math.abs(this.idx-random)<=1 || (Math.abs(this.idx-random)<=22 && Math.abs(this.idx-random)>=0)){
                    continue;
                    n--;
                }
                if (this.mineArr.indexOf(random) === -1) {
                    this.mineArr.push(random);
                } else {
                    n--;
                }
            }
        },
        getAround(index){
            arr = [];
            var r = Math.floor(index / 21);
            var c = Math.floor(index % 21);
            for (var i = (r === 0 ? 0 : -1); i < (r === 19 ? 1 : 2); i++) {
                for (var j = (c === 0 ? 0 : -1); j < (c === 20 ? 1 : 2); j++) {
                    var latticeIndex = (r + i) * 21 + (c + j);
                    arr.push(latticeIndex);
                }
            }
            // console.log(index, r, c, arr.length);
            return arr;
        },
        getMineNum(index){
            var arr = this.getAround(index);
            var num = 0;
            arr.forEach((item) => {
                if (this.latticeArr[item].isMine) num++;
            });
            return num;
        },
        clickLeft(index){
            this.idx = index;
            if (this.isInit == false){
                this.init();
            }
            if (!this.latticeArr[index].isMark){
                if (this.latticeArr[index].mineNum) {
                    if (!this.latticeArr[index].isOpen && !this.latticeArr[index].isMark) {
                        this.latticeArr[index].isOpen = true;
                        this.openNum++;
                    }
                }
                else{
                    var arr = this.getAround(index);
                    this.showDFS(arr);
                }
                if (this.latticeArr[index].isMine){
                    // console.log(this.GameOver);
                    clearInterval(this.time);
                    this.GameOver = true;
                    var gameover = document.getElementById('gameover')
                    gameover.style.visibility = 'visible'
                }
            }
            this.isGameOver();
        },
        showDFS(arr) {
            arr = [...new Set(arr)];
            for (let i = 0; i < arr.length; i++) {
                const item = arr[i];
                arr.splice(i, 1);
                i--;
                if (this.latticeArr[item].isOpen) continue;
                this.latticeArr[item].isOpen = true;
                this.openNum++;
                if (!this.latticeArr[item].mineNum) {
                    const arr1 = this.getAround(this.latticeArr[item].index);
                    this.showDFS(arr.concat(arr1));
                } 
            }
        },
        clickRight(index) {
            if (!this.latticeArr[index].isMark && !this.latticeArr[index].isOpen) {
                if (this.markNum < this.mineNum) {
                    this.latticeArr[index].isMark = true;
                    this.markNum++;
                    if (this.mineArr.indexOf(index) !== -1) this.rightMarkNum++;
                    this.isGameOver();
                }
            } else if (this.latticeArr[index].isMark) {
                this.latticeArr[index].isMark = false;
                if (this.mineArr.indexOf(index) !== -1) this.rightMarkNum--;
                this.markNum--;
                // this.mineArr.push(this.latticeArr[index].index);
            }
        },
        isGameOver(index) {
            if (this.rightMarkNum === this.mineNum || this.openNum + this.mineNum === 420){
                clearInterval(this.time);
                this.win = true;
                var w = document.getElementById('win');
                w.style.visibility = 'visible';
                if (this.top_time == '00:00:00') this.top_time = this.cnt_time;
                else if (this.cnt_time < this.top_time) this.top_time = this.cnt_time;
            }
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