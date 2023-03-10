// Restructure
// Make all pop ups hidden by nature
// Create hide function and hide contact function that takes the element and adds hidden to it
// Create show function that shows element

//TODO
// Validate password
// Fix no contact
// restructure edit delete to show proper data

getData();
loadCookie();


// Active contact info
let activePID = "";
let activeUID = "";
let activeFName = "";
let activeLName = "";
let activePhone = "";
let activeEmail = "";
let activeElement = null;
let tempElement = null;

const urlBase = '../API'
const extension = 'php'

// This will be deleted when new contact button is added
function redirect()
{
  window.location.href ="newContact.html";
}

function testAdd()
{
  let url = '../API' + '/CreateContact' + '.php';
  let dict = {
    "FName":"test",
    "LName":"test",
    "UserEmail":localStorage.getItem("email"),
    "PhoneNumber":"test",
    "ContactEmail":"test"
  };

  // REWRITE THIS TO MATCH LOGIN/REGISTER VALIDATION
  fetch(url,{
    method: 'POST',
    body: JSON.stringify(dict)
    })
    .then(res => {
        if(res.ok) 
        {
            //console.log("Logged");
        }
        else if(res.status == 400){ //TODO CHANGE THIS TO ACCOMADATE ALL ERRORS
            setError(email.parentElement, "FIX THIS MESSAGE");
            setError(password.parentElement, "FIX THIS MESSAGE");
        }
    })
    .then(data => {
        })
    .catch(error => {
        console.log(error);
    });
}

function search(prefix)
{
document.getElementById("noContacts").innerHTML ="";
  if(prefix === "")
  {
    getData();
  }
  else{
    fetch('../API/SearchContact.php', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              "UserEmail" : localStorage.getItem("email"),
              "valToSearch": prefix
          })
      })
      .then(res => res.json())
      .then(data => {
        //console.log(data);
        const emptyContacts = document.getElementById("noContacts");
        if(data.length == 0)
        {
          emptyContacts.innerHTML = "No Contacts";
          document.querySelector('.contacts-preview').innerHTML = "";
          document.querySelector('.container').innerHTML = ""  ;
          //console.log("goes here"+ data.length);
          return;
        }
        else
        {
          let preview = ``;
          let contacts= `<div class="contacts-container">`;
          data.forEach(function(Contact){
            preview += generatePreview(Contact.FName, Contact.LName, Contact.UserEmail, Contact.PhoneNumber, Contact.ContactEmail, Contact.ContactID);
            contacts += generateContact(Contact.FName, Contact.LName, Contact.UserEmail, Contact.PhoneNumber, Contact.ContactEmail, Contact.ContactID);
          });
          document.querySelector('.contacts-preview').innerHTML = preview;
          document.querySelector('.container').innerHTML = contacts;
          initButtons();
        }
          
      })
        .catch(error => {console.log(error);
        });
    }
}

function loadCookie()
{
  let greeting = document.getElementById('greeting');
  greeting.innerHTML = "Welcome " + localStorage.getItem("FName").charAt(0).toUpperCase() + localStorage.getItem("FName").slice(1) + " " + localStorage.getItem("LName").charAt(0).toUpperCase() + localStorage.getItem("LName").slice(1);
}

function deleteCookie()
{
  localStorage.clear();
  window.location.href ="index.html";
}

function activeInfo(product)
{
  activePID = product.dataset.pid;
  activeUID = product.dataset.uid;
  activeFName = product.dataset.fname;
  activeLName = product.dataset.lname;
  activeEmail = product.dataset.email;
  activePhone = product.dataset.phone;
  activeElement = product;
  tempElement = product.innerHTML;
}

function clearActiveInfo()
{
  activePID = "";
  activeUID = "";
  activeFName = "";
  activeLName = "";
  activePhone = "";
  activeEmail = "";
  activeElement = null;
  tempElement = null;
  initButtons();
}

function initButtons(){
  let preveiwContainer = document.querySelector('.contacts-preview');
  let previewBox = preveiwContainer.querySelectorAll('.preview');
  
  document.querySelectorAll('.contacts-container .contact').forEach(product =>
    {
      product.onclick = () =>
      {
        preveiwContainer.style.display = 'flex';
        let name = product.getAttribute('data-pid');
        previewBox.forEach(preview =>
          {
          let target = preview.getAttribute('data-pid');
          if(name == target)
          {
            preview.classList.add('active');
            activeInfo(preview);
          }
        });
      };
    });
    
    previewBox.forEach(close =>
      {
      close.querySelector('.fa-times').onclick = () =>
      {
        close.classList.remove('active');
        preveiwContainer.style.display = 'none';
        clearActiveInfo();
      };
    });
}

function getData()
{
  document.getElementById("noContacts").innerHTML ="";
  var string = localStorage.getItem("email");
  fetch('../API/ReadContact.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "UserEmail" : string,
        })
    })
    .then((res) => res.json())
    .then((data) => {
      if(data.length ==0)
        {
        document.getElementById("noContacts").innerHTML ="No Contacts";
        }
      let preview = ``;
      let contacts= `<div class="contacts-container">`;
      data.forEach(function(Contact){
        preview += generatePreview(Contact.FName, Contact.LName, Contact.UserEmail, Contact.PhoneNumber, Contact.ContactEmail, Contact.ContactID);
        contacts += generateContact(Contact.FName, Contact.LName, Contact.UserEmail, Contact.PhoneNumber, Contact.ContactEmail, Contact.ContactID);
      });
      document.querySelector('.contacts-preview').innerHTML = preview;
      document.querySelector('.container').innerHTML = contacts;
        
      initButtons();
    })
    .catch(error => console.log(error));
}

function testEdit()
{
  var output = `
      <h3>First Name</h3>
      <input type="text" id="FName" style = "position:relative; left:30px" value=${activeFName} placeholder = "First Name">
      <i class="fa fa-times-circle" style="font-size:35px; color:red; position:relative; top:6px; left:30px; background-color:white; border-radius:100%; border-style: solid; border-color: white; visibility:hidden;" id = "EFNE"></i>
      <h3>Last Name</h3>
      <input type="text" id="LName" style = "position:relative; left:30px" value=${activeLName} placeholder = "Last Name">
      <i class="fa fa-times-circle" style="font-size:35px; color:red; position:relative; top:6px; left:30px; background-color:white; border-radius:100%; border-style: solid; border-color: white; visibility:hidden;" id = "ELNE"></i>
      <h3>Phone Number</h3>
      <input type="text" id="phone" style = "position:relative; left:30px" value=${activePhone} placeholder = "Phone Number">
      <i class="fa fa-times-circle" style="font-size:35px; color:red; position:relative; top:6px; left:30px; background-color:white; border-radius:100%; border-style: solid; border-color: white; visibility:hidden;" id = "EPNE"></i>
      <h3>Contact Email</h3>
      <input type="text" id="email" style = "position:relative; left:30px" value=${activeEmail} placeholder = "Contact Email">
      <i class="fa fa-times-circle" style="font-size:35px; color:red; position:relative; top:6px; left:30px; background-color:white; border-radius:100%; border-style: solid; border-color: white; visibility:hidden;" id = "ECEE"></i>
      <p id = "errorEdit" class="errorEdit" style="font-size: 2em; color:red;"  ></p>
      <div class="buttons">
         <a href="#" class="edit" onclick="pushEdit()">Edit Contact</a>
         <a href="#" class="cancel" onClick="cancelEdit()">Cancel</a>
      </div>
   </div>
   `;
  activeElement.innerHTML = output;
}

function pushEdit()
{
  //console.log("Push");
  
  errorEdit.innerText = "";
  document.getElementById("EFNE").style.visibility = "hidden";
  document.getElementById("ELNE").style.visibility = "hidden";
  document.getElementById("EPNE").style.visibility = "hidden";
  document.getElementById("ECEE").style.visibility = "hidden";
  
  
  let url = '../API' + '/UpdateContact' + '.php';
  let dict = { 
    UserEmail: activeElement.dataset.uid,
    FName :document.getElementById("FName").value,
    LName :document.getElementById("LName").value,
    ContactID :activeElement.dataset.pid,
    PhoneNumber :document.getElementById("phone").value,
    ContactEmail: document.getElementById("email").value
  };

  if(dict.FName == "" || dict.LName == "" || dict.PhoneNumber == "" || dict.ContactEmail == "")
  {
    if(dict.FName == "")
    {
      document.getElementById("FName").style.borderColor = "red";
      document.getElementById("EFNE").style.visibility = "visible";
    }
    else
    {
      document.getElementById("FName").style.borderColor = "green";
    }
    if(dict.LName == "")
    {
      document.getElementById("LName").style.borderColor = "red";
      document.getElementById("ELNE").style.visibility = "visible";
    }
    else
    {
      document.getElementById("LName").style.borderColor = "green";
    }
    if(dict.PhoneNumber == "")
    {
      document.getElementById("phone").style.borderColor = "red";
      document.getElementById("EPNE").style.visibility = "visible";
    }
    else
    {
      document.getElementById("phone").style.borderColor = "green";
    }
    if(dict.ContactEmail == "")
    {
      document.getElementById("email").style.borderColor = "red";
      document.getElementById("ECEE").style.visibility = "visible";
    }
    else
    {
      document.getElementById("email").style.borderColor = "green";
    }
    
    errorEdit.innerText = "Please fill out all fields";
    return;
  }

  fetch(url,{
      method: 'POST',
      body: JSON.stringify(dict)
      })
      .then(res => {res.json})
      .then(data => {getData();})
      .catch(error => {window.alert(error)});
      activeElement.parentElement.style.display = 'none'; 
}

function cancelEdit()
{
  activeElement.innerHTML = tempElement;
  initButtons();
}


function deletePopup()
{
  var output = `
      <h3>Are you sure you want to delete this contact?</h3>
      <div class="buttons">
         <a href="#" class="edit" onclick="testDelete()">Delete Contact</a>
         <a href="#" class="cancel" onClick="cancelDelete()">Cancel</a>
      </div>
   </div>
   `;
  activeElement.innerHTML = output;
}

function cancelDelete()
{
  activeElement.innerHTML = tempElement;
  initButtons();
}

function testDelete()
{
  //console.log("Delete");
  let url = '../API' + '/DeleteContact' + '.php';
  let dict = { 
    UserEmail: activeElement.dataset.uid,
    FName :activeElement.dataset.fname,
    LName :activeElement.dataset.lname,
    ContactID :activeElement.dataset.pid,
    PhoneNumber :activeElement.dataset.phone,
    ContactEmail: activeElement.dataset.email
  };

  fetch(url,{
      method: 'POST',
      body: JSON.stringify(dict)
      })
      .then(res => {res.json})
      .then(data => {getData();})
      .catch(error => {window.alert(error)});
  activeElement.parentElement.style.display = 'none';
  activeElement.innerHTML = tempElement;
  
}

function generatePreview(FName, LName, UserEmail, PhoneNumber, ContactEmail, ContactID)
{
  var output = `
  <div class="preview" data-pid = ${ContactID} data-uid = ${UserEmail} data-fname = ${FName} data-lname = ${LName} data-email = ${ContactEmail} data-phone = ${PhoneNumber}>
      <i class="fas fa-times" ></i>
      <h3>${FName} ${LName}</h3>
      <h3>${PhoneNumber}</h3>
      <h3>${ContactEmail}</h3>
      <div class="buttons">
         <a href="#" class="edit" onclick="testEdit()">Edit Contact</a>
         <a href="#" class="delete" onclick="deletePopup()">Delete Contact</a>
      </div>
   </div>
   `;
  return output;
}

function generateContact(FName, LName, UserEmail, PhoneNumber, ContactEmail, ContactID)
{

  var output = `
      <div class="contact" data-pid = ${ContactID} data-uid = ${UserEmail} data-fname = ${FName} data-lname = ${LName} data-email = ${ContactEmail} data-phone = ${PhoneNumber}>
         <h3>${FName} ${LName}</h3>
         <h3>${PhoneNumber}</h3>
     </div>
   `;
  return output;
}


//gus's edits

function showAddContact()
{
  document.getElementById("addPreview").style.display = "block";
  document.getElementById("add").style.display = "block";
}

function hideAddContact()
{
  document.getElementById("addFName").value ="";
  document.getElementById("addLName").value ="";
  document.getElementById("addEmail").value ="";
  document.getElementById("addPhoneNumber").value ="";
  document.getElementById("FNE").style.visibility = "hidden";
  document.getElementById("LNE").style.visibility = "hidden";
  document.getElementById("PNE").style.visibility = "hidden";
  document.getElementById("CEE").style.visibility = "hidden";
  
  document.getElementById("addFName").style.borderColor = "";
  document.getElementById("addLName").style.borderColor = "";
  document.getElementById("addPhoneNumber").style.borderColor = "";
  document.getElementById("addEmail").style.borderColor = "";
  
  document.getElementById("add").style.display = "none";
  document.getElementById("addPreview").style.display = "none";
  document.getElementById("warningtext").innerHTML ="";
}

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
    
    document.getElementById("FNE").style.visibility = "hidden";
    document.getElementById("LNE").style.visibility = "hidden";
    document.getElementById("PNE").style.visibility = "hidden";
    document.getElementById("CEE").style.visibility = "hidden";
    
    
    if(dict.FName == "" || dict.LName == "" || dict.PhoneNumber == "" || dict.ContactEmail == "")
    {
      document.getElementById("warningtext").innerHTML = "Please fill out all fields.";
      if(dict.FName == "")
      {
        document.getElementById("FNE").style.visibility = "visible";
        document.getElementById("addFName").style.borderColor = "red";
      }
      else
        {
        document.getElementById("addFName").style.borderColor = "green";
        }
      if(dict.LName == "")
      {
        document.getElementById("LNE").style.visibility = "visible";
        document.getElementById("addLName").style.borderColor = "red";
      }
      else
      {
        document.getElementById("addLName").style.borderColor = "green";
      }
      if(dict.PhoneNumber == "")
      {
      document.getElementById("PNE").style.visibility = "visible";
      document.getElementById("addPhoneNumber").style.borderColor = "red";
      }
      else
      {
        document.getElementById("addPhoneNumber").style.borderColor = "green";
      }
      if(dict.ContactEmail == "")
      {
        document.getElementById("CEE").style.visibility = "visible";
        document.getElementById("addEmail").style.borderColor = "red";
      }
      else
      {
        document.getElementById("addEmail").style.borderColor = "green";
      }
      return;
    }
    
    xhr.send(JSON.stringify(dict));
    xhr.onload = function() {
           //window.alert("CONTACT CREATED");
           hideAddContact();
           getData();
           //window.location.href = "test.html";
    };
    xhr.onerror = function(){
           window.alert(error);
       };
}

