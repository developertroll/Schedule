setHeader();

async function setHeader(){
    const token = localStorage.getItem("x-access-token");

    if(!token){
        const signed = document.querySelector(".signed");
        signed.classList.add("hidden");
        return;
    }

    const config = {
        method: "get",
        url: url+ "/jwt",
        headers:{
            "x-access-token":token
        },
    }
    const res = await axios(config);
    if(!res.data.code===200){
        console.log(res);
    }
    const nickName = res.data.nickName;
    const spanNickname = document.querySelector(".nickname");
    spanNickname.innerHTML = nickName;
    const unsigned = document.querySelector(".unsigned");
    unsigned.classList.add("hidden");
}

// 로그아웃

const btnSignout = document.getElementById("signout");
btnSignout.addEventListener("click", signout);

function signout(){
    localStorage.removeItem("x-access-token");
    alert("로그아웃 되었습니다.");
    location.reload();
}