var baseUrl = "http://localhost:8800/";

// 获取联系人列表
function contactList() {
    fetch(baseUrl + "contact/lists", { method: "GET", credentials: "include" })
        .then(
            async response => {
                let result = await response.json();
                if (!response.ok) {
                    throw new Error(JSON.stringify(result));
                }
                return result;
            }
        ).then(json => {
            // 回填到li中
            const ele = document.getElementsByClassName("lists")[0];
            ele.innerHTML = "";
            for (let item of json) {
                const name = item.name;
                const id = item.id;
                const li = document.createElement("li");
                li.classList.add("list-member");
                li.textContent = name;
                li.dataset.id = item.id;

                const span = document.createElement("span");
                span.classList.add("click-detail");
                span.textContent = "详情";
                span.dataset.id = item.id;
                span.addEventListener("click", contactDetailAndFill);
                li.appendChild(span);
                ele.appendChild(li);
            }
        })
}

function user() {
    const ele = document.getElementById("username");
    const username = localStorage.getItem("userName");
    ele.innerHTML = username;
}


async function contactDetailAndFill(event) {
    event.preventDefault();
    const ele = document.getElementById("add-form-p");
    ele.style.display = "none";

    const detailEle = document.getElementById("contact-detail");
    detailEle.style.display = "none";
    let groupEle = document.getElementById("add-group-form");
    groupEle.style.display = "none";

    const json = await contactById(event);
    // 回填到右边detail部分

    document.getElementById("contact-detail").style = "display:block;padding-left: 2rem; width:100%;flex-basis: 60%;";
    document.getElementById("id").innerHTML = json.id;
    document.getElementById("name").innerHTML = json.name;
    document.getElementById("phone").innerHTML = json.phone_number;
    document.getElementById("gender").innerHTML = json.gender == 0 ? "女" : "男";
    document.getElementById("address").innerHTML = json.address;
    document.getElementById("wechat").innerHTML = json.wechat;
    document.getElementById("email").innerHTML = json.email;
    document.getElementById("cgroup").innerHTML = "";
    // 分组
    fetch(baseUrl + "group/list", { credentials: "include" })
        .then(async response => {
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        }).then(gjson => {
            console.log(json);
            console.log(gjson);
            for (let item of gjson) {
                if (json["group_id"] === item.id) {
                    document.getElementById("cgroup").innerHTML = item.name;
                }
            }

        });
}

async function contactById(event) {
    const itemId = event.currentTarget.dataset.id;

    const json = await fetch(baseUrl + "contact/get?" + new URLSearchParams({ contact_id: itemId }), { method: "GET", credentials: "include" })
        .then(async response => {
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        }).then(json => {
            return json;
        })
    return json;
}

function handleSearch(event) {
    event.preventDefault();
    const ele = document.getElementById("search");
    const searchName = ele.value;
    console.log(searchName);
    fetch(baseUrl + "contact/search?" + new URLSearchParams({
        search: searchName
    }), { credentials: "include" }).then(async response => {
        let result = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    }).then(json => {
        // huitian
        const ele = document.getElementsByClassName("lists")[0];
        ele.innerHTML = "";
        for (let item of json) {
            const name = item.name;
            const id = item.id;
            const li = document.createElement("li");
            li.classList.add("list-member");
            li.textContent = name;
            li.dataset.id = item.id;

            const span = document.createElement("span");
            span.classList.add("click-detail");
            span.textContent = "详情";
            span.dataset.id = item.id;
            span.addEventListener("click", contactDetailAndFill);
            li.appendChild(span);
            ele.appendChild(li);
        }
    })
}
async function handleAddButton(e) {
    // 点击添加，改变表单的css
    e.preventDefault();
    const ele = document.getElementById("add-form-p");
    ele.style.display = "block";

    const detailEle = document.getElementById("contact-detail");
    detailEle.style.display = "none";
    let groupEle = document.getElementById("add-group-form");
    groupEle.style.display = "none";

    // 获取已有分组列表
    let form = document.getElementById("add-form");
    let groupList = await fetch(baseUrl + "group/list", { credentials: "include" })
        .then(async response => {
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        }).then(json => {
            return json;
        });

    // 清空原option
    form.elements.group.innerHTML = "";
    let dummy = document.createElement("option");
    form.elements.group.add(dummy);
    for (let item of groupList) {
        let op = document.createElement("option");
        op.value = item.id;
        op.text = item.name;
        form.elements.group.add(op);
        if (item.name == document.getElementById("cgroup").innerHTML) {
            op.selected = true;
        }
    }

}

function handleAddGroupButton(e) {
    e.preventDefault();
    let ele = document.getElementById("add-group-form");
    ele.style.display = "block";

    const detailEle = document.getElementById("contact-detail");
    detailEle.style.display = "none";
    let addEle = document.getElementById("add-form-p");
    addEle.style.display = "none";
}

function addGroup(event) {
    event.preventDefault();
    let groupName = event.target.groupname.value;
    fetch(baseUrl + "group/add?" + new URLSearchParams({ groupName }), { credentials: "include" })
        .then(async response => {
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        }).then(json => {
            return json;
        });
    alert("添加成功");
    location.href = "index.html";
}

async function handleEditButton(e) {
    e.preventDefault();
    const detailEle = document.getElementById("contact-detail");
    detailEle.style.display = "none";
    const ele = document.getElementById("add-form-p");
    ele.style.display = "block";

    // 分组数据获取
    const groupList = await fetch(baseUrl + "group/list", { credentials: "include" }).then(async response => {
        let result = await response.json();

        if (!response.ok) {
            throw new Error(JSON.stringify(result));
        }
        return result;
    }).then(json => {
        return json;
    });

    // 待修改的老数据
    let form = document.getElementById("add-form");
    form.elements.id.value = document.getElementById("id").innerHTML;
    form.elements.name.value = document.getElementById("name").innerHTML;
    form.elements.phone.value = document.getElementById("phone").innerHTML;
    form.elements.address.value = document.getElementById("address").innerHTML;
    form.elements.wechat.value = document.getElementById("wechat").innerHTML;
    form.elements.email.value = document.getElementById("email").innerHTML;
    form.elements.group.innerHTML = "";
    let dummy = document.createElement("option");
    form.elements.group.add(dummy);
    for (let item of groupList) {
        let op = document.createElement("option");
        op.value = item.id;
        op.text = item.name;
        form.elements.group.add(op);
        if (item.name == document.getElementById("cgroup").innerHTML) {
            op.selected = true;
        }
    }
    const genderDigit = document.getElementById("gender").innerHTML == "女" ? 0 : 1;
    form.elements.gender.forEach(element => {
        document.getElementById("gender").innerHTML
        if (element.value == genderDigit) {
            element.checked = true;
        }
    });
    form.elements.back.dataset.id = document.getElementById("id").innerHTML;

    const hone = ele.getElementsByTagName("h1");
    hone[0].innerHTML = "修改联系人";
}

function handleDeleteButton(event) {
    event.preventDefault();

    let id = document.getElementById("id").innerHTML;
    fetch(baseUrl + "contact/delete?" + new URLSearchParams({ contact_id: id }), { credentials: "include" })
        .then(async response => {
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        })
        .then(json => {
            alert("删除成功");
            location.href = "index.html";
        });
}

// 修改联系人界面提交保存修改
function handleSubmitButton(event) {
    event.preventDefault();

    let form = document.getElementById("add-form");
    const contactData = {
        id: form.elements.id.value,
        name: form.elements.name.value,
        phone_number: form.elements.phone.value,
        gender: form.elements.gender.value,
        address: form.elements.address.value,
        wechat: form.elements.wechat.value,
        email: form.elements.email.value,
        group_id: form.elements.group.value,
    }
    console.log("提交的data");
    console.log(contactData);
    uri = "contact/add";
    if (form.elements.id.value) {
        uri = "contact/update";
    }
    fetch(baseUrl + uri, { headers: { 'Content-Type': 'application/json' }, method: "POST", credentials: "include", body: JSON.stringify(contactData) })
        .then(async response => {
            let result = await response.json();

            if (!response.ok) {
                throw new Error(JSON.stringify(result));
            }
            return result;
        }).then(json => {
            alert("添加/修改联系人成功");
            location.href = "index.html";
        });
}

// 导入功能
function importFile(input) {
    // 打开file explorer
    const files = input.files;
    console.log(files);
    if (files.length > 0) {
        const file = files[0];
        try {
            const formData = new FormData();
            formData.append("file", file);
            fetch(baseUrl + "contact/importFile", { method: "POST", body: formData, credentials: "include" }).then(
                async response => {
                    console.log(response.status);
                    console.log(response.headers);
                    let result = await response.json();

                    if (!response.ok) {
                        throw new Error(JSON.stringify(result));
                    }
                    return result;
                }
            ).then(json => {
                input.value = "";
            })
        } catch (error) {
            console.error("上传错误", error);
            input.value = "";
        }
    } else {
        console.log("请选择文件.");
    }
}
// 导出功能
function exportFile(event) {
    // 发送一个网络请求，后端生成csv文件，download
    console.log("!");
    let requestEntity = {};
    requestEntity.method = "GET";
    requestEntity.credentials = "include";
    fetch(baseUrl + "contact/exportFile", requestEntity).then(response => response.blob().then(blob => {
        console.log("download csv..");
        const downloadLink = document.createElement("a");
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.setAttribute("download", "contacts.csv");
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }))
}


async function exit(event) {
    // 退出登录. 清除localstorage
    await fetch(baseUrl + "contact/logout", { credentials: "include" }).then(res => {
        console.log(res);
    });
    window.location.href = "login.html";
    console.log("exit!");
}
