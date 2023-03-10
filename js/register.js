const form = document.getElementById('form');
const fname = document.getElementById('fname');
const lname = document.getElementById('lname');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
let flag = true;
let flag_inuse = false;

form.addEventListener('submit', e => {
    e.preventDefault();
    flag = true;
    validateInputs();
    if(flag) sendRegister();
});

function sendRegister()
{
    let flag_inuse = false;
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
            else if(res.status == 400){ //TODO CHANGE THIS  TO ACCOMADATE ALL ERRORS
                setError(email.parentElement, "FIX THIS MESSAGE");
                setError(password.parentElement, "FIX THIS MESSAGE");
            }
            else if(res.status == 409){
                document.getElementById("UEE").style.visibility = "visible";
                setError(email, "Email in use.");
                flag_inuse = true;
                return;
            }
        })
        .then(data => {
            if(flag_inuse == true)
              return;
            //console.log(data); 
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

    document.getElementById("FNE").style.visibility = "hidden";
    document.getElementById("LNE").style.visibility = "hidden";
    document.getElementById("UEE").style.visibility = "hidden";
    document.getElementById("PE").style.visibility  = "hidden";
    document.getElementById("PCE").style.visibility = "hidden";
    
    if(fnameValue === '') {
        setError(fname, 'First name is required');
        document.getElementById("FNE").style.visibility = "visible";
    } else {
        document.getElementById("FNE").style.visibility = "hidden";
        setSuccess(fname);
    }

    if(lnameValue === '') {
        setError(lname, 'Last name is required');
        document.getElementById("LNE").style.visibility = "visible";
    } else {
        setSuccess(lname);
    }

    if(emailValue === '') {
        setError(email, 'Email is required');
        document.getElementById("UEE").style.visibility = "visible";
    } else if (!isValidEmail(emailValue)) {
        setError(email, 'Provide a valid email address');
        document.getElementById("UEE").style.visibility = "visible";
    } else {
        setSuccess(email);
    }

    if(passwordValue === '') {
        setError(password, 'Password is required');
        document.getElementById("PE").style.visibility = "visible";
    } else if (passwordValue.length < 8 ) {
        setError(password, 'Password must be at least 8 character.')
        document.getElementById("PE").style.visibility = "visible";
    } else {
        setSuccess(password);
    }

    if(password2Value === '') {
        setError(password2, 'Please confirm your password');
        document.getElementById("PCE").style.visibility = "visible";
    } else if (password2Value !== passwordValue) {
        setError(password, "");
        setError(password2, "Passwords doesn't match");
        document.getElementById("PE").style.visibility = "visible";
        document.getElementById("PCE").style.visibility = "visible";
    } else {
        setSuccess(password2);
    }

};
