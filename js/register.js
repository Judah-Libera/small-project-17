const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
let flag = true;

form.addEventListener('submit', e => {
    e.preventDefault();
    flag = true;
    validateInputs();
    if(flag) sendRegister();
});

function sendRegister()
{
    let url = '../API' + '/CreateUser' + '.php';  // DEFINE URL
    let dict = {
                "fName": fname.value,
                "lName": lname.value,
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
            window.alert("Successfully created user");  
            window.location.href ="index.html";  // TODO point to correct file
            })
        .catch(error => {
            window.alert(error)
        });
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
    const fnameValue = fname.value.trim();
    const lnameValue = lname.value.trim();
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();
    const password2Value = password2.value.trim();

    if(fnameValue === '') {
        setError(fname, 'First name is required');
    } else {
        setSuccess(fname);
    }

    if(lnameValue === '') {
        setError(lname, 'Last name is required');
    } else {
        setSuccess(lname);
    }

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

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
    } else if (password2Value !== passwordValue) {
        setError(password2, "Passwords doesn't match");
    } else {
        setSuccess(password2);
    }

};
