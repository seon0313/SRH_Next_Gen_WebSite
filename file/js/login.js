function login() {
    if (document.loginForm2.userId.value =="") {
        alert("아이디를 입력하세요");
    } else if (document.loginForm2.password.value =="") {
        alert("비밀번호를 입력하세요");
    } else {
        var xhr = new XMLHttpRequest();
        xhr.open("POST", "https://srobot.sen.hs.kr/dggb/cmm/actionLogin.do");
        xhr.withCredentials = true;
        xhr.onload = function(event){
            if (event.target.response.includes("로그인후 ")){
                alert("로그인 후 이용해 주세요.");
                location.href = "/login";
            }
            console.log("Success, server responded with: " + event.target.response); // raw response
            //location.href = "/"
            loadTest();
        };
        xhr.onreadystatechange = function() {
            if(xhr.readyState == 4 && xhr.status == 200) {
                console.log(xhr.responseText);
          }
        }
        var formData = new FormData(document.loginForm2);
        xhr.send(formData);
    }

}