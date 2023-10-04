readTodo();

async function readTodo(){
    const token = localStorage.getItem("x-access-token");
    if(!token){
        alert("로그인이 필요합니다.");
        location.href = "signin.html";
        return;
    };

    const config = {
        method: "get",
        url: url+ "/todos",
        headers:{
            "x-access-token": token
        },
    };

    try{
        const res = await axios(config);
        if(!res.data.code==200){
            alert("할일 목록을 불러오는데 실패했습니다.");
            return false;
        }

        const todoDataSet = res.data;

        for (let section in todoDataSet){
            const sectionUl = document.querySelector(`#${section} ul`);
            
            const arrayForEachSection = todoDataSet[section];

            let result = "";
            for (let todo of arrayForEachSection){
                let element = `
                <li class="list-item" id=${todo.todoIdx}>
                <div class="done-text-contanier">
                <input type="checkbox" class="todo-done" ${todo.status === 'C'? "checked" :""}>
                <p class="todo-text">
                ${todo.contents}
                </p>
                </div>
                <div class="update-delete-contanier">
                <i class="todo-update fa-solid fa-pencil"></i>
                <i class="todo-delete fa-solid fa-trash-can"></i>
                </div>
                </li> 
                `;

                result += element;
            }
            sectionUl.innerHTML = result;
        }

    }catch(err){
        console.log(err);
    }
}

/* <li class="list-item">
<div class="done-text-contanier">
<input type="checkbox" class="do-done">
<p class="do-text">산책가기</p>
</div>
<div class="update-delete-contanier">
<i class="fa-solid fa-pencil"></i>
<i class="do-delete fa-solid fa-trash-can"></i>
</div>
</li> */

const matrixContanier = document.querySelector(".matrix-contanier");
//maxtrixContanier.addEventListener 엔터키 눌렀을때 이벤트
matrixContanier.addEventListener("keydown", cudController);
matrixContanier.addEventListener("click", cudController);

function cudController(event){
    const token = localStorage.getItem("x-access-token");
    if(!token){
        alert("로그인이 필요합니다.");
        location.href = "signin.html";
        return;
    }
    const target = event.target;
    const tagTagName = target.tagName;
    const eventType = event.type;
    const key = event.key;
    console.log(target, tagTagName, eventType, key);
    if(tagTagName == "INPUT" && key == "Enter"){
        createTodo(event,token);
    }

    //todo-done 클래스 이름을 가진 체크박스 클릭시 이벤트 실행
    if(target.className == "todo-done" && event.type == "click"){
        updateTodoDone(event,token);
    }
    const firstClassName = target.className.split(" ")[0];
    if(firstClassName == "todo-update" && event.type == "click"){
        updateTodoContents(event,token);
    }
    if(firstClassName == "todo-delete" && event.type == "click"){
        deleteTodoContents(event,token);
    }
    
}

async function createTodo(event, token){
    const contents = event.target.value;
    const type = event.target.closest(".matrix-item").id;


    if(!contents){
        alert("내용을 입력해주세요.");
        return false;
    }

    const config = {
        method: "post",
        url: url+"/todo",
        headers:{
            "x-access-token":token
        },
        data:{
            contents: contents,
            type: type,
        },
        }
    try{
        const res = await axios(config);
        if(!res.data.code===200){
            alert("할일을 추가하는데 실패했습니다.");
            return false;
        }

        //DOM 업데이트
        readTodo();
        event.target.value = "";
        return true;
    }catch(err){
        console.log(err);
        return false;
    }
}

async function updateTodoDone(event, token){
    const status = event.target.checked ? "C" : "A";
    const todoIdx = event.target.closest(".list-item").id;
    const config = {
        method: "patch",
        url: url+"/todo",
        headers:{
            "x-access-token":token
        },
        data:{
            todoIdx: todoIdx,
            status: status,
        },
        }
    try{
        const res = await axios(config);
        if(!res.data.code===200){
            alert("할일을 수정하는데 실패했습니다.");
            return false;
        }
        readTodo();
        return true;
        }
    catch(err){
        console.log(err);
        return false;
    }
}
    
async function updateTodoContents(event, token){
    const content = prompt("내용을 입력해주세요.");
    const todoIdx = event.target.closest(".list-item").id;
    const config = {
        method: "patch",
        url: url+"/todo",
        headers:{
            "x-access-token":token
        },
        data:{
            todoIdx: todoIdx,
            contents: content,
        },
        }
    try{
        const res = await axios(config);
        if(!res.data.code===200){
            alert("할일을 수정하는데 실패했습니다.");
            return false;
        }
        readTodo();
        return true;
        }
    catch(err){
        console.log(err);
        return false;
    }
}

async function deleteTodoContents(event, token){

    const confirmDelete = confirm("정말 삭제하시겠습니까?");
    if(!confirmDelete){
        return false;
    }
    const todoIdx = event.target.closest(".list-item").id;
    const config = {
        method: "delete",
        url: url+"/todo/" + todoIdx,
        headers:{
            "x-access-token":token
        },
        
        }
    try{
        const res = await axios(config);
        if(!res.data.code===200){
            alert("할일을 삭제하는데 실패했습니다.");
            return false;
        }
        alert("할일을 삭제했습니다.");
        readTodo();
        return true;
        }
    catch(err){
        console.log(err);
        return false;
    }
}