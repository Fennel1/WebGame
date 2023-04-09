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
        axios.post('http://localhost:8080/WebGame/main')
        .then(function (response) {
            var resp = response.data;
//            console.log(resp);
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
        },
        homepage: function () {
            window.location.href = "main.html";
        },
    }
})

var box = new Vue({
    el: "#box",
    data: {
        cols: [],
        rows: [],
        isShow: [], //7x53
        msg: "",
        nowDay: null,
        recordList: [],
        dayList: [],
        dayCount: 0,
        playCount: 0,
        snakeCount: 0,
        tetrisCount: 0,
        sweepCount: 0,
        sudokuCount: 0,
        pacmanCount: 0,
        calenderCount: [],
        uid: 0,
        name: "",
        snakeDifficultly: 0,
        tetrisDifficultly: 0,
        sweepDifficultly: 0,
        sudokuDifficultly: 0,
        snakeScore: 0,
        tetrisScore: 0,
        sweepScore: 0,
        sudokuScore: 0,
    },
    created: function () {
        for (let i=0; i<53; i++)    this.rows[i] = i;
        for (let i=0; i<7; i++){
            this.cols[i] = i;
            this.isShow[i] = [];
        }
        this.nowDay = new Date();
        for (let i=this.nowDay.getDay()+1; i<7; i++){
            this.isShow[i][52] = -1;
        }
        for (let i=0; i<this.nowDay.getDay(); i++){
            this.isShow[i][0] = -1;
        }
        let num = 364;
        for (let i=0; i<53; i++){
            for (let j=0; j<7; j++){
                if (this.isShow[j][i] != -1){
                    this.isShow[j][i] = num--;
                }
            }
        }
        var _this = this;
        axios.post('http://localhost:8080/WebGame/record')
        .then(function (response) {
            var resp = response.data;
            for (let i=0; i<resp.length; i++){
                resp[i]['date'] = _this.timeConverter(resp[i]['date']);
            }
//            console.log(resp);
            _this.recordList = resp;
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.post('http://localhost:8080/WebGame/information')
        .then(function (response) {
            var resp = response.data;
//            console.log(resp);
            _this.uid = resp['uid'];
            _this.name = resp['name'];
            _this.snakeDifficultly = resp['snake']['difficulty'];
            _this.tetrisDifficultly = resp['tetris']['difficulty'];
            _this.sweepDifficultly = resp['sweep']['difficulty'];
            _this.sudokuDifficultly = resp['sudoku']['difficulty'];
            _this.snakeScore = resp['snake']['score'];
            _this.tetrisScore = resp['tetris']['score'];
            _this.sweepScore = resp['sweep']['score'];
            _this.sudokuScore = resp['sudoku']['score'];
        })
        .catch(function (error) {
            console.log(error);
        });
        axios.post('http://localhost:8080/WebGame/calender')
        .then(function (response) {
            var resp = response.data;
            console.log(resp);
            _this.snakeCount = resp['snakeCount'];
            _this.tetrisCount = resp['tetrisCount'];
            _this.sweepCount = resp['sweepCount'];
            _this.sudokuCount = resp['sudokuCount'];
            _this.pacmanCount = resp['pacmanCount'];
            _this.playCount = resp['allCount'];
            _this.calenderCount = resp['calenderCount'].length;
            let cnt = 0;
            for (let i=0; i<resp['calenderCount'].length; i++){
                if (resp['calenderCount'][i] != 0){
                    cnt++;
                }
            }
            _this.dayCount = cnt;
            var num = 0;
            for (let i=52; i>=0; i--){
                for (let j=6; j>=0; j--){
                    if (_this.isShow[j][i] != -1){
                        var div = document.getElementById("div"+j+','+i);
//                        console.log(num, j, i);
                        if (resp['calenderCount'][num] == 1){
                            div.style.opacity = 0.4;
                        }
                        else if (resp['calenderCount'][num] == 2){
                            div.style.opacity = 0.5;
                        }
                        else if (resp['calenderCount'][num] >= 3){
                            div.style.opacity = 0.6;
                        }
                        else if (resp['calenderCount'][num] >= 5){
                            div.style.opacity = 0.7;
                        }
                        else if (resp['calenderCount'][num] >= 10){
                            div.style.opacity = 0.8;
                        }
                        num++;
                    }
                }
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        onEnterTd(col, row) {
            var d = new Date(this.nowDay - 1000 * 60 * 60 * 24 * (this.isShow[col][row]));
            this.msg = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        },
        onLeaveTd(col, row) {
            this.msg = "";
        },
        timeConverter(UNIX_timestamp){
          var a = new Date(UNIX_timestamp);
          var year = a.getFullYear();
          var month = a.getMonth()+1;
          var date = a.getDate();
          var hour = a.getHours();
          var min = a.getMinutes();
          var sec = a.getSeconds();
          var time = year + '/' + month + '/' + date + '-' + hour + ':' + min + ':' + sec ;
          return time;
        },
        nameID(row, col) {
            return "div" + row + ',' + col;
        }
    }
})