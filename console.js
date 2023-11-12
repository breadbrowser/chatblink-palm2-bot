let oldMessage = '';
let newMessage = '';

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

const getStrangerMessage = () => {
  const messages = document.querySelectorAll('#msgs .stranger');
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1].innerText;
    console.log(lastMessage);
    newMessage = lastMessage;
  } else {
    console.log("No messages found");
  }
}

const sendBotMessage = async (input) => {
  const response = await fetch('http://localhost:625/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  const data = await response.json();
  console.log(data);
  $("#msg").val(data[0]);
  document.getElementById('send_message').click();
}

const checkAFK = async () => {
  getStrangerMessage();
  if (newMessage === oldMessage) {
    console.log("waiting to see user is just typing");
    await wait(15000);
    getStrangerMessage();
    if (newMessage === oldMessage) {
      console.log("stranger is not responding finding new stranger");
      await clearChat();
      document.getElementById("next-stranger").click();
    } else {
      oldMessage = newMessage;
      await sendBotMessage(newMessage);
    }
  } else {
    oldMessage = newMessage;
    await sendBotMessage(newMessage);
  }
}

const checkStranger = async () => {
  if (!stranger_id) {
    console.log("finding stranger");
    await clearChat();
    document.getElementById("next-stranger").click();
    await wait(2500);
    if (!stranger_id) {
      console.log("stranger disconnected");
      await clearChat();
      document.getElementById("next-stranger").click();
    } else {
      console.log("stranger is connected");
    }
  } else {
    console.log("stranger is connected");
  }
}

const findStranger = async () => {
  if (!stranger_id) {
    console.log("finding stranger");
    await clearChat();
    document.getElementById("next-stranger").click();
    await wait(2500);
    if (!stranger_id) {
      console.log("stranger disconnected");
      await clearChat();
      document.getElementById("next-stranger").click();
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

const main = async () => {
  await checkStranger();
  await findStranger();
  await checkAFK();
}
