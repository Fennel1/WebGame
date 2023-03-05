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
        },
        homepage: function () {
            window.location.href = "main.html";
        },
    }
})

