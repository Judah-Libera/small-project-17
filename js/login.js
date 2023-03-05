const form = document.getElementById('form');
const email = document.getElementById('email');
const password = document.getElementById('password');

let flag = true;

form.addEventListener('submit', e => {
    e.preventDefault();
    flag = true;
    validateInputs();
    if(flag) sendLogin();
});

function sendLogin()
{

    let url = '../API' + '/login' + '.php';  // DEFINE URL
    let dict = {
                  "email": email.value,
                  "password": password.value
    };

    fetch(url,{
        method: 'POST',
        body: JSON.stringify(dict)
        })
        .then(res => {
            if(res.ok) res.json()
            else if(res.status == 400){ //TODO CHANGE THIS SHIT TO ACCOMADATE ALL ERRORS
                setError(email.parentElement, "FIX THIS MESSAGE");
                setError(password.parentElement, "FIX THIS MESSAGE");
            }
        })
        .then(data => {
            console.log(data);
            window.alert("Logging you in");  
            createCookie(data);
            window.location.href ="contacts.html";  // TODO point to correct file
            })
        .catch(error => {
            window.alert(error)
        });
}

function createCookie(data)
{
    localStorage.setItem("ID", `${data.ID}`);
    localStorage.setItem("email", `${data.Login}`);
    localStorage.setItem("FName", `${data.FirstName}`);
    localStorage.setItem("LName", `${data.LastName}`);
}

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = message;
    inputControl.classList.add('error');
    inputControl.classList.remove('success')
    flag = false;
}

const setSuccess = element => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector('.error');

    errorDisplay.innerText = '';
    inputControl.classList.add('success');
    inputControl.classList.remove('error');
};

const isValidEmail = email => {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const validateInputs = () => {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    if(emailValue === '') {
        setError(email, 'Email is required');
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
    } else {
        setSuccess(email);
    }
    if(passwordValue === '') {
        setError(password, 'Password is required');
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
    } else {
        setSuccess(password);
    }
};
