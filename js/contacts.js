getData();
loadCookie();

// Restructure
// Make all pop ups hidden by nature
// Create hide function and hide contact function that takes the element and adds hidden to it
// Create show function that shows element

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

function search(prefix)
{
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
        const emptyContacts = document.getElementById("noContacts");
        if( emptyContacts.length == 0)
        {
          emptyContacts.innerHTML = "No Contacts";
          document.querySelector('.contacts-preview').innerHTML = "";
          document.querySelector('.container').innerHTML = ""  ;
        }
        else
        {
          emptyContacts.innerHTML = "";
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
        .catch(error => console.log(error));
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
  let previewBox = preveiwContainer.querySelectorAll('.preview'); //TODO MOVE TO TOP
  
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
      console.log(data); // TODO REMOVE
      let preview = ``;
      let contacts= `<div class="contacts-container">`;
      data.forEach(function(Contact){ // TURN INTO ARROW FUNCTION
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
      <input type="text" id="name" value=${activeFName} ${activeLName}>
      <input type="text" id="phone" value=${activePhone}>
      <input type="text" id="email" value=${activeEmail}>
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
  console.log("Push");
  let url = '../API' + '/UpdateContact' + '.php';  // DEFINE URL
  let dict = {
                "email": email.value,
                "password": password.value
  };

  fetch(url,{
      method: 'POST',
      body: JSON.stringify(dict)
      })
      .then(res => {res.json})
      .then(data => {
          console.log(data);
          createCookie(data);
          window.location.href ="contacts.html";  // TODO point to correct file
          })
      .catch(error => {
          window.alert(error)
      });
  activeElement.innerHTML = tempElement;
  initButtons();
}

function cancelEdit()
{
  activeElement.innerHTML = tempElement;
  initButtons();
}

function testDelete()
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

function generatePreview(FName, LName, UserEmail, PhoneNumber, ContactEmail, ContactID)
{
  var output = `
  <div class="preview" data-pid = ${ContactID} data-uid = ${UserEmail} data-fname = ${FName} data-lname = ${LName} data-email = ${ContactEmail} data-phone = ${PhoneNumber}>
      <i class="fas fa-times"></i>
      <h3>${FName} ${LName}</h3>
      <h3>${PhoneNumber}</h3>
      <h3>${ContactEmail}</h3>
      <div class="buttons">
         <a href="#" class="edit" onclick="testEdit()">Edit Contact</a>
         <a href="#" class="delete">Delete Contact</a>
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