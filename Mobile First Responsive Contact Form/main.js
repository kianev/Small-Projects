// Initialize Firebase
let config = {
    apiKey: "AIzaSyDOGFFSEjnXakjTDzVbWqj--xiwyt3pcqI",
    authDomain: "contactform-e1741.firebaseapp.com",
    databaseURL: "https://contactform-e1741.firebaseio.com",
    projectId: "contactform-e1741",
    storageBucket: "",
    messagingSenderId: "1090485230547"
};
firebase.initializeApp(config);

let messagesRef = firebase.database().ref("messages");

document.getElementById("contact-form").addEventListener("submit", submitForm);

function submitForm(e) {
    e.preventDefault();

    let name = getValues("name");
    let company = getValues("company");
    let email = getValues("email");
    let phone = getValues("phone");
    let message = getValues("message");

    saveMessage(name, company, email, phone, message);

    document.querySelector(".alert").style.display = "block";
    setTimeout(function () {
        document.querySelector(".alert").style.display = "none";
    }, 3000);

    document.getElementById("contact-form").reset();
}

function getValues(id) {
    return document.getElementById(id).value;
}

function saveMessage(name, company, email, phone, message) {
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        company: company,
        email: email,
        phone: phone,
        message: message
    });
}
