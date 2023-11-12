oldmessage=''
newMessage=''

//clear chat
function ch() {
fetch('http://localhost:625/generate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({message: "/56"})
})
.then(res => res.json())
.then(data => {
  console.log(data);
});
}

//get strangers newest message
function getms() {
let messages = document.querySelectorAll('#msgs .stranger');
let lastMessage = messages[messages.length - 1].innerText;
console.log(lastMessage);
newMessage=lastMessage
}
//send message to ai then send reply
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
$("#msg").val(myVariable[0]);
document.getElementById('send_message').click();
} 
//check if user is typing or afk
function afk() {
getms();
if(newMessage==oldmessage) {
  console.log("waiting to see user is just typing");
  wait(15000);
  if(newMessage==oldmessage) {
  	  console.log("stranger is not responding finding new stranger");
      ch();
      document.getElementById("next-stranger")[0].click();
  } else {
  	oldmessage=newMessage
    aibot(newMessage);
  }
} else {
  oldmessage=newMessage
  aibot(newMessage);
}
}
  
//check if stranger is connected
function checksr() {
if(stranger_id==false) {
  console.log("finding stranger");
  ch(1);
  document.getElementById("next-stranger")[0].click();
  wait(2500);
  if(stranger_id==false) {
    console.log("stranger disconnected");
    ch(1);
    document.getElementById("next-stranger")[0].click();
  } else {
    console.log("stranger is connected");
  }
} else {
  console.log("stranger is connected");
}
}

//find stranger
function sag() {
if(stranger_id==false) {
  console.log("finding stranger");
  ch(1);
  document.getElementById("next-stranger")[0].click();
  wait(2500);
  if(stranger_id==false) {
    console.log("stranger disconnected");
    ch(1);
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
}

// main thing
function main() {
checksr(1);
sag(1);
afk(1);


}
