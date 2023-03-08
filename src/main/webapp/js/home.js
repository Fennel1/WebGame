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
    },
    methods: {
        onEnterTd(col, row) {
            var d = new Date(this.nowDay - 1000 * 60 * 60 * 24 * (this.isShow[col][row]));
            this.msg = d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate();
        },
        onLeaveTd(col, row) {
            this.msg = "";
        }
    }
})