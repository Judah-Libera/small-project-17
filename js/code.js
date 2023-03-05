// Update urlBase with IP of droplet until URL is defined
const urlBase = '../API' //updated by judah, should link to php file responsible for handling the call
const extension = 'php'

function sendLogin()

let url = 'http://161.35.140.80' // TODO Fill this out based on yaml
function Register()
{
    let fnameVal = document.getElementById("fname").value;
    let lnameVal = document.getElementById("lname").value;
    let emailVal = document.getElementById("email").value;
    let passVal = document.getElementById("password").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            fname : fnameVal,
            lName : lnameVal,
            email : emailVal,
            password : passValu
        })
    }).then(res => {
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log('ERROR'))
}

    // Get user and password from html elements
    let login = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    document.getElementById("ErrorMessage").innerHTML = "";
function Login()
{
    let userVal = document.getElementById("username").value;
    let passVal = document.getElementById("password").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username : userVal,
            password : passVal
        })
    }).then(res => {
        createCookie(userVal, passVal, 3);
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log('ERROR'))
}

function Read()
{
    let uid = document.getElementById("uid").value;
    fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            uid : 'AlexTest',
        })
    }).then(res => {
        return res.json()
    }).then(data => console.log(data)).catch(error => console.log('ERROR'))
}

function createCookie(uid, pass, exdays)
{
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = uid + "=" + pass + ";" + exdays + ";path=/";
}

function decodeCookie()
{
    let data = document.cookie.split(",");
    for(split in data)
    {
        {
            {


                firstName = jsonObject.firstname;
                lastName = jsonObject.lastName;

                // Use this to change webpages if login is successful
                window.location.href = "contacts.html";
            }
        };
    }
}

// get reference to the contact list HTML element
const contactList = document.getElementById('contact-list');

// function to create a contact HTML element with edit and delete buttons eventually
function getContacts(username) 
{
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
      body: JSON.stringify({UserEmail: username})
    };
  
    fetch(url, options)
      .then(response => response.json())
      .then(data => {
        const table = document.getElementById('contactsTable');
        data.forEach(contact => {
          const row = table.insertRow(-1);
          const nameCell = row.insertCell(0);
          const emailCell = row.insertCell(1);
          const phoneCell = row.insertCell(2);
          nameCell.innerHTML = contact.name;
          emailCell.innerHTML = contact.email;
          phoneCell.innerHTML = contact.phone;
        });
      })
      .catch(error => console.error(error));
}

function addContact()
{
//doens't work and i can't figure out why. php script is for usre being called. i can't get any logging or text box changes to work even in createUser which is for sure working also. so i can't even figure out how to see if this function is being called. but either it isn't or it isn't calling the php.

    // Define API endpoint
    let url = urlBase + '/AddContact.' + extension;
    // Initialize request
    const xhr = new XMLHttpRequest();
    // Open request
    xhr.open("POST", url);
    // Create JSON payload
    let dict = {
    "name":document.getElementById("Name").value,
    "email":document.getElementById("Email").value,
    "phoneNumber":document.getElementById("PhoneNumber").value,
    "userEmail":document.getElementById("User").value
    };
    
    // Send request
    xhr.send(JSON.stringify(dict));
}

// function to fetch and display the contact information
function displayContacts() {
	fetch(url)
	.then(response => response.json())
	.then(contacts => {
		// create a contact element for each contact and append it to the contact list
		contacts.forEach(contact => {
			const contactElement = createContactElement(contact);
			contactList.appendChild(contactElement);
		});
	})
	.catch(error => {
		// displays error
		alert(error.message);
	});
}

// function to edit a contact
function editContact(event) {
	// get the ID of the contact to edit from the button's data-id attribute
	const id = event.target.getAttribute('data-id');
	
	// TODO: implement editing functionality
}

// function to delete a contact
function deleteContact(event) {
	// get the ID of the contact to delete from the button's data-id attribute
	const id = event.target.getAttribute('data-id');
	
	// send a DELETE request to the API to delete the contact
	fetch(`${url}/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': `Bearer ${localStorage.getItem('token')}`
		}
	})
	.then(response => {
		if (response.ok) {
			// remove the contact element from the contact list
			event.target.parentNode.remove();
		} else {
			// display an error message
			throw new Error('Failed to delete contact');
		}
	})
	.catch(error => {
		alert(error.message);
	});
}

function deleteContact()
{

}

function createUser()
{
//navigation to php page. urlbase and extension will always be the same. middle section format is /'filename'.
 let url = urlBase + '/CreateUser.' + extension;
 //setup connection to php
 
 //open connection

// create dictionary to turn into json object
 let dict = {
                 // key:data. get element id needs to match html id
                "fName":document.getElementById("fName").value,
                "lName":document.getElementById("lName").value,
                "email":document.getElementById("email").value,
                "password":document.getElementById("password").value
             };
   //create json object and send it to php file
    
//provide user feedback. not needed if different feedback gets created by frontend design
window.alert("user created");
}

function testLogin(){
  
  
  let url = urlBase + '/login.' + extension;
  let dict = {
                "username":document.getElementById("username").value,
                "password":document.getElementById("password").value
  };
  
  if( dict.username == "" || dict.password == "")
    {
      window.alert("Please enter both a username and a password");
      return;
    
    }
  
  
  fetch(url,{
    method: 'POST',
    body: JSON.stringify(dict)
  
  }).then(res => {
      return res.json()
      })
      .then(data => {
      if (data.Password != dict.password)
        window.alert("Username and Password do not match");
      else{
        window.alert("Logging you in");  
        window.location.href ="contacts.html";
        }
          })
      .catch(error => window.alert("Username not found"))
}



function deleteUser()
{
  //needs to send ID and UserName
}
// fetch and display the contact information when the page loads
getContacts();
