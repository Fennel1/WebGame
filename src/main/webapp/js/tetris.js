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
        axios.post('http://143.198.146.14/WebGame/main')
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

var arr = new Array();
var timer = null;
var a = new A1(10, 0)
for (var i = 0; i < 20; i++) {
    arr[i] = new Array();
    for (var j = 0; j < 22; j++)    arr[i][j] = {};
}

const initTable = () => {
    document.querySelector('#board').innerHTML = ""
    arr.forEach((item, index) => {
        var tr = document.createElement('tr')
        tr.dataset.y = index
        item.forEach((_, index2) => {
            var td = document.createElement('td')
            td.dataset.x = index2
            tr.appendChild(td)
        })
        document.querySelector('#board').appendChild(tr)
    })
}
// initTable()

/*
    ***
      *
*/
function A1(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y][this.x + 1].num = a
        arr[this.y + 1][this.x + 1].num = a
    }
}
function A2(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y - 1][this.x + 1].num = a
        arr[this.y][this.x + 1].num = a
        arr[this.y + 1][this.x + 1].num = a
        arr[this.y + 1][this.x].num = a
    }
}
function A3(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y + 1][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y + 1][this.x + 1].num = a
        arr[this.y + 1][this.x - 1].num = a
    }
}
function A4(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y - 1][this.x - 1].num = a
        arr[this.y - 1][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y + 1][this.x - 1].num = a
    }
}
/*
    **
    **
*/
function B(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y][this.x].num = a
        arr[this.y][this.x + 1].num = a
        arr[this.y + 1][this.x].num = a
        arr[this.y + 1][this.x + 1].num = a
    }
}
/*
    ****
*/
function C1(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y][this.x - 2].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y][this.x].num = a
        arr[this.y][this.x + 1].num = a
    }
}
function C2(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y - 2][this.x].num = a
        arr[this.y - 1][this.x].num = a
        arr[this.y][this.x].num = a
        arr[this.y + 1][this.x].num = a
    }
}
/*
    **
     **
*/
function D1(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y][this.x - 1].num = a
        arr[this.y][this.x].num = a
        arr[this.y + 1][this.x].num = a
        arr[this.y + 1][this.x + 1].num = a
    }
}
function D2(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y - 1][this.x].num = a
        arr[this.y][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y + 1][this.x - 1].num = a
    }
}
/*
    ***
     *
*/
function E1(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y][this.x + 1].num = a
        arr[this.y + 1][this.x].num = a
    }
}
function E2(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y - 1][this.x].num = a
        arr[this.y][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y + 1][this.x].num = a
    }
}
function E3(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y - 1][this.x].num = a
        arr[this.y][this.x].num = a
        arr[this.y][this.x - 1].num = a
        arr[this.y][this.x + 1].num = a
    }
}
function E4(x, y) {
    this.x = x
    this.y = y
    this.set = function (a) {
        arr[this.y][this.x].num = a
        arr[this.y + 1][this.x].num = a
        arr[this.y - 1][this.x].num = a
        arr[this.y][this.x + 1].num = a
    }
}


const Color = () => {
    arr.forEach((item, index) => {
        const trArr = document.querySelectorAll('tr')
        item.forEach((item2, index2) => {
            if (item2.num === 1) trArr[index].querySelectorAll('td')[index2].classList.add('bgc1')
            else if (item2.num === 2) {
                trArr[index].querySelectorAll('td')[index2].classList.remove('bgc1')
                trArr[index].querySelectorAll('td')[index2].classList.add('bgc2')
            }
            else trArr[index].querySelectorAll('td')[index2].className = ''
        })
    })
}

document.addEventListener('keydown', function (e) {
    if (e.key === 's') down()
    else if (e.key === 'd') right()
    else if (e.key === 'a') left()
    else if (e.key === 'w') change()
})

const right = () => {
    try {
        if (a.x < 21) {
            a.set(0)
            a.x++
            a.set(1)
            Color()
        }
    } catch {
        if (a.constructor == A4) a.x = 21
        else if (a.constructor == C2) a.x = 21
        else if (a.constructor == D2) a.x = 21
        else if (a.constructor == E2) a.x = 21
        else a.x = 20
        a.set(1)
        Color()
    }
}

const left = () => {
    try {
        if (a.x > 0) {
            a.set(0)
            a.x--
            a.set(1)
            Color()
        }
    } catch {
        if (a.constructor == C1) a.x = 2
        else if (a.constructor == C2) a.x = 0
        else if (a.constructor == B) a.x = 0
        else if (a.constructor == E4) a.x = 0
        else a.x = 1
        a.set(1)
        Color()
    }
}

function generate() {
    var random = Math.floor(Math.random() * 100)
    if (random < 20) {
        a = new A1(10, 0)
        a.set(1)
    }
    else if (random < 40) {
        a = new B(10, 0)
        a.set(1)
    }
    else if (random < 60) {
        a = new C1(10, 0)
        a.set(1)
    }
    else if (random < 80) {
        a = new D1(10, 0)
        a.set(1)
    }
    else {
        a = new E1(10, 0)
        a.set(1)
    }
    Color()
}

const change = () => {
    a.set(0)
    if (a.y <= 1) a.y = 2
    else if (a.y >= 20) a.y = 19

    if (a.constructor == A1) a = new A2(a.x, a.y)
    else if (a.constructor == A2) a = new A3(a.x, a.y)
    else if (a.constructor == A3) a = new A4(a.x, a.y)
    else if (a.constructor == A4) a = new A1(a.x, a.y)
    else if (a.constructor == C1) a = new C2(a.x, a.y)
    else if (a.constructor == C2) a = new C1(a.x, a.y)
    else if (a.constructor == D1) a = new D2(a.x, a.y)
    else if (a.constructor == D2) a = new D1(a.x, a.y)
    else if (a.constructor == E1) a = new E2(a.x, a.y)
    else if (a.constructor == E2) a = new E3(a.x, a.y)
    else if (a.constructor == E3) a = new E4(a.x, a.y)
    else if (a.constructor == E4) a = new E1(a.x, a.y)

    a.set(1)
    Color()
}

function gameover() {
    if (arr[0].some(item => item.num == 2)) {
        clearInterval(timer)
        // alert(123)
        var gameover = document.getElementById('gameover')
        gameover.style.visibility = 'visible'
        document.querySelector('#board').innerHTML = ""
    }
}

const down = () => {
    a.set(0)
    a.y += 1
    a.set(1)
    Color()
    if (a.constructor == E3 || a.constructor == C1) {
        if (a.y >= 19) {
            a.set(2)
            remove()
            generate()
        }
    }
    else {
        if (a.y >= 18) {
            a.set(2)
            remove()
            generate()
        }
    }

    for (var i = a.y; i < a.y + 2; i++) {
        arr[i].forEach((item, index) => {
            if (item.num == 1 && arr[i + 1][index].num == 2) {
                a.set(2)
                remove()
                if (!arr[0].some(item => item.num == 2)) generate()
            }
        })
    }
    gameover()
}

var score = 0;
var maxscore = 0;

function remove() {
    var getArr = []
    arr.forEach((item, index) => {
        const arr0 = item.filter(function (item02) {
            return item02.num == 2
        })
        if (arr0.length === 22) {
            getArr.push(arr0)
            for (let i = 0; i < arr0.length; i++) {
                arr0[i].num = 0
            }
            for (let i = index - 1; i > 0; i--) {
                arr[i].forEach((item, index1) => {
                    if (item.num === 2) {
                        item.num = 0
                        arr[i + 1][index1].num = 2
                    }
                })
            }
            Color()
        }
    })
    if (getArr.length == 1) score += 2
    else if (getArr.length == 2) score += 6
    else if (getArr.length == 3) score += 14
    else if (getArr.length == 4) score += 30
    if (score > maxscore){
        maxscore = score
    }
    document.getElementById('score').innerHTML = score
    document.getElementById('maxscore').innerHTML = maxscore
}

var tetris = new Vue({
    el: "#game",
    data: {
        speed: 500,
        isgame: true,
        difficulty: '简单',
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
//        axios.post('http://localhost:8080/WebGame/tetrisSession')
        axios.post('http://143.198.146.14/WebGame/tetrisSession')
        .then(function (response) {
            var resp = response.data;
            console.log(resp);
            document.getElementById('maxscore').innerHTML = resp['score'];
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        upload () {
            var _this = this;
            var params = new URLSearchParams();
            params.append('score', score);
//            axios.post('http://localhost:8080/WebGame/tetrisUpload', params)
            axios.post('http://143.198.146.14/WebGame/tetrisUpload', params)
            .then(function (response) {
                var resp = response.data;
                console.log(resp);
            })
            .catch(function (error) {
                console.log(error);
            });
        },
        start: function () {
            initTable();
            a.set(1);
            Color();
            timer = setInterval(function () {
                down()
            }, this.speed);
            var over = document.getElementById('gameover')
            over.style.visibility = 'hidden'
        },
        reset: function () {
            clearInterval(timer);
            for (var i = 0; i < 20; i++) {
                arr[i] = new Array();
                for (var j = 0; j < 22; j++)    arr[i][j] = {};
            }
            initTable();
            a.set(1);
            Color();
            timer = setInterval(function () {
                down()
            }, this.speed);
            var over = document.getElementById('gameover')
            over.style.visibility = 'hidden'
            score = 0;
            document.getElementById('score').innerHTML = score;
        },
        pause: function () {
            clearInterval(timer);
        },
        resize() {
            var bar = document.querySelector('.bar_into');
            var len = parseInt(bar["style"]["width"]);
            if (len) {
                this.speed = 500 - len;
                // console.log(this.speed);
                if (this.speed > 450) this.difficulty = '简单';
                else if (this.speed > 350) this.difficulty = '普通';
                else this.difficulty = '困难';
            }
        },
        back() {
            window.location.href = "main.html";
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