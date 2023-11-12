oldmessage=''
newMessage=''

function getms() {
let messages = document.querySelectorAll('#msgs .stranger');
let lastMessage = messages[messages.length - 1].innerText;
console.log(lastMessage);
newMessage=lastMessage
}

function aibot(input) {
let myVariable;

fetch('http://localhost:625/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({message: input})
})
.then(res => res.json())
.then(data => {
  console.log(data);
  myVariable = data;
});
}

//find stranger
function sag() {
if(stranger_id==false) {
  console.log("finding stranger");
  document.getElementById("next-stranger")[0].click();
  wait(2500);
  if(stranger_id==false) {
    console.log("stranger disconnected");
    document.getElementById("next-stranger")[0].click();
  } else {
    console.log("stranger is connected");
    $("#msg").val('hi');
    document.getElementById('send_message').click();
  }
} else {
  console.log("stranger is connected");
  $("#msg").val('hi');
  document.getElementById('send_message').click();
}













};
