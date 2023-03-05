var box = new Vue({
    el:'.box',
    data:{
        isleft:true,
        isright:false,
        moveMessage:"已有帐户？点击登录",
        HelloMessage:"欢迎注册",
    },
    methods:{
        move:function(){
            this.isleft = !this.isleft;
            this.isright = !this.isright;
            if (this.isright==true){
                this.moveMessage = "还没有账户？点击注册";
                this.HelloMessage = "欢迎登录";
            }
            else{
                this.moveMessage = "已有帐户？点击登录";
                this.HelloMessage = "欢迎注册";
            }
        },
        visitorlogin: function(){
            var params = new URLSearchParams();
            params.append('name', "visitor");
            window.location.href = "main.html";
//            axios.post('http://localhost:8080/WebGame/visitor', params)
//            .then(function (response) {
//                var resp = response.data;
//                console.log(resp)
//                window.location.href = "main.html";
//            })
//            .catch(function (error) {
//                console.log(error);
//            });
        },
        login: function() {
            var name = document.getElementById("login_name").value;
            var password = document.getElementById("login_password").value;
//            console.log(name, password);
            var params = new URLSearchParams();
            params.append('name', name);
            params.append('password', password);
//            axios.post('http://localhost:8080/WebGame/login', params)
//            .then(function (response) {
//                var resp = response.data;
//                console.log(resp)
//                if (resp === true){
//                    window.location.href = "main.html";
//                }
//                else if (resp === false){
//                    document.getElementById('loginfail').innerHTML = "登录失败";
//                }
//            })
//            .catch(function (error) {
//                console.log(error);
//            });
        },
        register: function() {
            var name = document.getElementById("reg_name").value;
            var password = document.getElementById("reg_password").value;
            var repassword = document.getElementById("reg_repassword").value;
            if (password != repassword){
                console.log(name, password, repassword);
                document.getElementById('registerfail').innerHTML = "输入密码不一致";
                return;
            }
            var params = new URLSearchParams();
            params.append('name', name);
            params.append('password', password);
            params.append('repassword', repassword);
//            axios.post('http://localhost:8080/WebGame/register', params)
//            .then(function (response) {
//                var resp = response.data;
//                console.log(resp);
//                if (resp === true){
//                    window.location.href = "main.html";
//                }
//                else if (resp === false){
//                    document.getElementById('registerfail').innerHTML = "用户名已被使用";
//                }
//            })
//            .catch(function (error) {
//                console.log(error);
//            });
        }
    },
})