const elForm = document.querySelector('#form');
const elEmailInput = document.querySelector('.email-input');
const elPasswordInput = document.querySelector('.password-input');


elForm.addEventListener('submit', e=>{
    e.preventDefault();
    
    const emailValue = elEmailInput.value;
    const passwordValue = elPasswordInput.value;
    
    fetch('https://reqres.in/api/register', {
    method: "POST",
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        email: emailValue, 
        password: passwordValue
    })
}).then(res => res.json()).then(data => {
    if(data){
        window.localStorage.setItem('__auth_token__', JSON.stringify(data)
        )
        window.location.replace('index.html');
    }
})
})