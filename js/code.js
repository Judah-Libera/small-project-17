//Update urlBase with IP of droplet until URL is defined
var urlBase = '../API' // Link to php file responsible for handling the call
var extension = 'php'

function addContact()
{
    // Define API endpoint
    let url = urlBase + '/CreateContact.' + extension;
    // Initialize request
    const xhr = new XMLHttpRequest();
    // Open request
    xhr.open("POST", url);
    // Create JSON payload
    let dict = {
    "FName":document.getElementById("addFName").value,
    "LName":document.getElementById("addLName").value,
    "UserEmail":localStorage.getItem("email"),
    "PhoneNumber":document.getElementById("addPhoneNumber").value,
    "ContactEmail":document.getElementById("addEmail").value
    };
    
    // Send request
    xhr.send(JSON.stringify(dict));
}

function deleteUser()
{
  //needs to send ID and ContactID
}