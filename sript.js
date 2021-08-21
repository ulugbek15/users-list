const elList = document.querySelector('#list');
const elTemplate = document.querySelector('#template').content;

let token = JSON.parse(window.localStorage.getItem('__auth_token__'));

function renderUsers(renderArr, element){
    element.innerHTML = null;
    window.localStorage.setItem('users', JSON.stringify(renderArr))
    renderArr.forEach(elem =>{
        let cloneTemplate =elTemplate.cloneNode(true);
        
        cloneTemplate.querySelector('.list__img').src = elem.avatar;
        cloneTemplate.querySelector('.list__title').textContent = elem.first_name;
        cloneTemplate.querySelector('.deleteBtn').dataset.uuid = elem.id;
        
        
        
        element.appendChild(cloneTemplate);
    })
}

try{
    fetch('https://reqres.in/api/users?page=1')
    .then(res => res.json())
    .then(data => {
        renderUsers(data.data, elList)
    })
}catch(e){
    console.error(e.message)
}

elList.addEventListener('click', (e) =>{
    if(e.target.matches('.deleteBtn')){
        let {uuid} = e.target.dataset;

        const users = JSON.parse(window.localStorage.getItem('users'));

        const foundUserIndex = users.findIndex((row) => row.id == uuid);

        fetch('https://reqres.in/api/users/' + foundUserIndex, {
            method: "DELETE"
        }).then(res => {
            if(res.status == 204){
                users.splice(foundUserIndex, 1);
                renderUsers(users, elList);
            }
        })
    }
})

if(!token?.token){
    window.location.replace('login.html')
}

