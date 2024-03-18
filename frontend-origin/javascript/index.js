function handleAddButton(e) {
    // 点击添加，改变表单的cs
    e.preventDefault();
    const ele = document.getElementById("add-form-p");
    ele.style.display = "block";

    const detailEle = document.getElementById("contact-detail");
    detailEle.style.display = "none";
    let groupEle = document.getElementById("add-group-form");
    groupEle.style.display = "none";
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

function handleEditButton(e) {
    e.preventDefault();
    const detailEle = document.getElementById("contact-detail");
    detailEle.style.display = "none";
    const ele = document.getElementById("add-form-p");
    ele.style.display = "block";

    var contactData = {};
    contactData.name = "啊";
    contactData.phone = "13111110000";
    contactData.gender = "男";
    console.log(contactData);
    localStorage.setItem("contact", JSON.stringify(contactData));

    // 数据回填
    // 从localStorage里面拿数据。（数据是每次点击左边，除了去请求http后端拿详细数据，set到localStorage里面）
    const currentContact = localStorage.getItem("contact");
    const currentContactObjet = JSON.parse(currentContact);

    const name = currentContactObjet.name;
    const phone = currentContactObjet.phone;

    const hone = ele.getElementsByTagName("h1");
    hone[0].innerHTML = "修改联系人";




}

// 导入功能
function importFile(event) {
    // 打开file explorer

}
// 导出功能
function exportFile(event) {
    // 发送一个网络请求，后端生成csv文件，download
    console.log("!");

}

function exit(event) {
    // 退出登录
    console.log("exit!");
}