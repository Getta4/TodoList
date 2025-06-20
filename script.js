const taskContent = document.getElementById("taskContent");
const taskSubmit = document.getElementById("taskSubmit");
const taskList = document.getElementById("taskList");

taskSubmit.addEventListener("click", function(e) {
    e.preventDefault();

    if (taskContent.value != "") {
        let taskText = taskContent.value;
        addTask(taskText);
        taskContent.value = "";
    } else {
        alert("Please input task");
    }
});

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
function addTask(taskText) {
    const tasks = loadTasksFromCookie();
    const taskObj = { text: taskText, checked: false }; // チェック状態も保存
    tasks.push(taskObj);
    saveTasksToCookie(tasks);
    renderTask(taskObj, tasks.length - 1); // インデックスも渡す
}

// タスクをリストに表示するだけ（Cookie保存しない）
function renderTask(taskObj, index) {
    const taskItem = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = taskObj.checked;

    const textNode = document.createTextNode(taskObj.text);

    taskItem.appendChild(checkbox);
    taskItem.appendChild(textNode);

    // チェックボックスのイベント
    checkbox.addEventListener("change", function() {
        if (checkbox.checked) {
            taskItem.style.textDecoration = "line-through";
        } else {
            taskItem.style.textDecoration = "none";
        }
        // チェック状態をCookieに保存
        const tasks = loadTasksFromCookie();
        tasks[index].checked = checkbox.checked;
        saveTasksToCookie(tasks);
    });

    // 初期表示で斜線
    if (checkbox.checked) {
        taskItem.style.textDecoration = "line-through";
    }

    taskList.appendChild(taskItem);
}

// ページ読み込み時にCookieから復元
window.addEventListener("DOMContentLoaded", () => {
    const tasks = loadTasksFromCookie();
    tasks.forEach((taskObj, idx) => renderTask(taskObj, idx));
});