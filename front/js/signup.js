//토큰 검사
const token = localStorage.getItem("x-access-token");
if(token){
    alert("이미 로그인되어 있습니다.");
    location.href = "index.html";
}




//입력값 유효성 검사
const inputEmail = document.getElementById("email");
const emailMessage = document.querySelector("div.email-message");
inputEmail.addEventListener("input", isVaildEmail);

const inputPassword = document.getElementById("password");
const passwordMessage = document.querySelector("div.password-message");
inputPassword.addEventListener("input", isVaildPassword);

const inputPasswordConfirm = document.getElementById("password-comfirm");
const passwordConfirmMessage = document.querySelector("div.password-confirm-message");
inputPasswordConfirm.addEventListener("input", isVaildPasswordConfirm);

const inputNickname = document.getElementById("nickname");
const nicknameMessage = document.querySelector("div.nickname-message");
inputNickname.addEventListener("input", isVaildNickname);

const signupButton = document.getElementById("signup");
signupButton.addEventListener("click", signup);

function isVaildEmail(event){
    const currentEmail = inputEmail.value;
    const emailRegex = /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/;
    if(!emailRegex.test(currentEmail)){
        emailMessage.style.visibility = "visible";
        return false;
    }
    emailMessage.style.visibility = "hidden";
    return true;
}

function isVaildPassword(event){
    const currentPassword = inputPassword.value;
    const passwordRegex = /^[a-zA-Z0-9]{8,16}$/;
    if(!passwordRegex.test(currentPassword)){
        passwordMessage.style.visibility = "visible";
        return false;
    }
    passwordMessage.style.visibility = "hidden";
    return true;
}

function isVaildPasswordConfirm(event){
    const currentPassword = inputPassword.value;
    const currentPasswordConfirm = inputPasswordConfirm.value;
    if(currentPassword !== currentPasswordConfirm){
        passwordConfirmMessage.style.visibility = "visible";
        return false;
    }
    passwordConfirmMessage.style.visibility = "hidden";
    return true;
}

function isVaildNickname(event){
    const currentNickname = inputNickname.value;
    const nicknameRegex = /^[a-zA-Z0-9가-힣]{2,10}$/;
    if(!nicknameRegex.test(currentNickname)){
        nicknameMessage.style.visibility = "visible";
        return false;
    }
    nicknameMessage.style.visibility = "hidden";
    return true;
}

//회원가입 API 호출

async function signup(event){
    const isVaildRequest = isVaildEmail() && isVaildPassword() && isVaildPasswordConfirm() && isVaildNickname();

    if(!isVaildRequest){
        alert("입력값을 확인해주세요.");
        return false;
    }

    const currentEmail = inputEmail.value;
    const currentPassword = inputPassword.value;
    const currentNickname = inputNickname.value;

    const config = {
        method:"post",
        url: url+"/user",
        data:{
            email:currentEmail,
            password:currentPassword,
            nickname:currentNickname,
        },
    }
    try{
    const res = await axios(config);
    if(res.data.code===200){
        alert("회원가입에 성공했습니다.");
        window.location.href = "signin.html";
        return true;
    }else{
        alert("회원가입에 실패했습니다.");
        location.reload();
        return false;
    }
    }catch(err){
        console.log(err);
        alert("회원가입에 실패했습니다.");
        return false;
    }

}