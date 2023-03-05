var sidebar = new Vue({
    el: "#sidebar",
    data: {
        alltrue:true,
        showSidebar: true,
        browser:"",
        IP:returnCitySN['cip'],
        CID:returnCitySN['cid'],
        AREA:returnCitySN['cname'],
        BROWSER:"",
    },
    methods: {
        move: function () {
            this.showSidebar = !this.showSidebar;
            this.getMessages();
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
        getMessages: function () {
            var agent = navigator.userAgent.toLowerCase();

            var regStr_ie = /msie ;/gi;
            var regStr_ff = /firefox\//gi
            var regStr_chrome = /chrome\/+/gi;
            var regStr_saf = /safari\/+/gi;

            //IE
            if (agent.indexOf("msie") > 0) {
                this.BROWSER = agent.match(regStr_ie);
            }

            //firefox
            if (agent.indexOf("firefox") > 0) {
                this.BROWSER = agent.match(regStr_ff);
            }

            //Chrome
            if (agent.indexOf("chrome") > 0) {
                this.BROWSER = agent.match(regStr_chrome);
            }

            //Safari
            if (agent.indexOf("safari") > 0 && agent.indexOf("chrome") < 0) {
                this.BROWSER = agent.match(regStr_saf);
            }

        },
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
        axios.post('http://143.198.146.14/WebGame/rank')
        .then(function (response) {
            var resp = response.data;
            console.log(resp);
            _this.rank_snake = resp[0];
            _this.rank_tetris = resp[1];
            _this.rank_sweep = resp[2];
        })
        .catch(function (error) {
            console.log(error);
        });
    },
})