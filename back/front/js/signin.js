/// 토큰검사

const token = localStorage.getItem("x-access-token");
if(token){
    alert("이미 로그인되어 있습니다.");
    location.href = "index.html";
}

const btnSignin = document.getElementById("signin");
const inputEmail = document.getElementById("email");
const inputPassword = document.getElementById("password");  

inputPassword.addEventListener("keyup", function(event){
    if(event.key === "Enter"){
        signin();
    }
});
btnSignin.addEventListener("click", signin);

async function signin(event){
    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;

    if(!currentEmail || !currentPassword){
        alert("이메일과 비밀번호를 입력해주세요.");
        return;
    }

    const config = {
        method:"post",
        url: url+"/signin",
        data: {
            email:currentEmail,
            password:currentPassword,
        }
    }
    try{
        const res = await axios(config);
        if(!res.data.code===200){
            alert("로그인에 실패했습니다.");
            return false;
        }
        console.log(res.data.token);
        localStorage.setItem("x-access-token", res.data.token);
        alert("로그인에 성공했습니다.");
        location.href = "index.html";
        return true;
    }catch(err){
        console.log(err);
    }


}