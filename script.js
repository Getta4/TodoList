const taskContent = document.getElementById("taskContent")
const taskSubmit = document.getElementById("taskSubmit");
const taskList = document.getElementById("taskList");

taskSubmit.addEventListener("click",function(e){
    //console.log("[Debug] OK");

    e.preventDefault(); // フォーム送信をしないようにする(リロード回避)

    if(taskContent.value != ""){
        //console.log("[Debug] Content avalable");
        let task = taskContent.value;
        addTask(task);
        taskContent.value = "";
    } else {
        alert("Please input task")
    }
})

// タスクをCookieに保存
function saveTasksToCookie(tasks) {
    document.cookie = "tasks=" + encodeURIComponent(JSON.stringify(tasks)) + "; path=/";
}

// Cookieからタスクを取得
function loadTasksFromCookie() {
    const match = document.cookie.match(/(?:^|; )tasks=([^;]*)/);
    if (match) {
        try {
            return JSON.parse(decodeURIComponent(match[1]));
        } catch {
            return [];
        }
    }
    return [];
}

// タスク追加時にCookieへ保存
function addTask(task){
    const taskItem = document.createElement("li");
    taskItem.textContent = task;
    taskList.appendChild(taskItem);

    // 既存タスクを取得して追加
    const tasks = loadTasksFromCookie();
    tasks.push(task);
    saveTasksToCookie(tasks);
}

// ページ読み込み時にCookieから復元
window.addEventListener("DOMContentLoaded", () => {
    const tasks = loadTasksFromCookie();
    tasks.forEach(addTask);
});