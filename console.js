let oldMessage = '';
let newMessage = '';

function removePrefix(str) {
    return str.split(":")[1].trim();
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const clearChat = async () => {
  const response = await fetch('http://localhost:625/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: "/56" })
  });
  const data = await response.json();
  console.log(data);
}
function checksr() {
if(stranger_id==false) {
  console.log("finding stranger");
  clearChat(1);
  document.getElementById("next-stranger").click();
  await wait(10000);
  wait(2500);
  if(stranger_id==false) {
    console.log("stranger disconnected");
    clearChat(1);
    document.getElementById("next-stranger").click();
    await wait(10000);
  } else {
    console.log("stranger is connected");
  }
} else {
  console.log("stranger is connected");
}
}

const getStrangerMessage = () => {
  const messages = document.querySelectorAll('#msgs .stranger');
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1].innerText;
    console.log(lastMessage);
    newMessage = lastMessage;
  } else {
    console.log("No messages found");
    await wait(10000);
  }
}

const sendBotMessage = async (input) => {
  input=removePrefix(input)
  const response = await fetch('http://localhost:625/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  const data = await response.json();
  console.log(await data);
  await $("#msg").val(await data[0]);
  document.getElementById('send_message').click();
}

const checkAFK = async () => {
  while(true) {
    await checksr();
    await getStrangerMessage();
    if (newMessage === oldMessage) {
      console.log("waiting to see user is just typing");
      await wait(10000);
    } else {
      oldMessage = newMessage;
      await sendBotMessage(newMessage);
    }
  }
}

const main = async () => {
  await checkAFK();
}

main();
