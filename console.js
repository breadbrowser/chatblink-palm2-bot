let oldMessage = '';
let newMessage = '';

function removePrefix(str) {
    return str.split(":")[1].trim();
}

const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

var textarea = document.getElementById('msg'); // Get the textarea element
var counter = 0; // Initialize a counter

// Define a function to simulate a key press
async function simulateKeyPress() {
    // Create a new 'keydown' event
    var keydownEvent = new KeyboardEvent('keydown', {
        key: 'a',
        code: 'KeyA',
        charCode: 97,
        keyCode: 97,
        view: window,
        bubbles: true
    });
    
    // Create a new 'keyup' event
    var keyupEvent = new KeyboardEvent('keyup', {
        key: 'a',
        code: 'KeyA',
        charCode: 97,
        keyCode: 97,
        view: window,
        bubbles: true
    });

    // Dispatch the events
    textarea.dispatchEvent(keydownEvent);
    textarea.dispatchEvent(keyupEvent);

    counter++; // Increment the counter

    await wait(500)

    // If 5 seconds have passed (assuming each key press takes 1 second)
    if (counter >= 5) {
        clearInterval(intervalId); // Stop the interval
    }
}


// Call the function every 1 second (1000 milliseconds)



const clearChat = async () => {
  const response = await fetch('http://localhost:625/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: "/56" })
  });
  const data = await response.json();
  console.log(data);
}
const checksr = async () => {
  if(stranger_id==false) {
    console.log("finding stranger");
    await clearChat(1);
    document.getElementById("next-stranger").click();
    await wait(5000);
    if(stranger_id==false) {
      console.log("stranger disconnected");
      await clearChat(1);
      document.getElementById("next-stranger").click();
      await wait(5000);
    } else {
      console.log("stranger is connected");
    }
  } else {
    console.log("stranger is connected");
  }
}


const getStrangerMessage = async () => {
  const messages = document.querySelectorAll('#msgs .stranger');
  if (messages.length > 0) {
    const lastMessage = messages[messages.length - 1].innerText;
    console.log(lastMessage);
    newMessage = lastMessage;
  } else {
    console.log("No messages found");
    await wait(1000);
  }
}

const sendBotMessage = async (input) => {
  input=removePrefix(input)
  const response = await fetch('http://localhost:625/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message: input })
  });
  const data2 = await response.json();
  let data = data2[0];
  data = data.replace(/\*/g, "");
  console.log(data);
  setInterval(simulateKeyPress, 7000);
  await $("#msg").val(data);
  document.getElementById('send_message').click();
}

const checkAFK = async () => {
  while(true) {
    await checksr();
    await getStrangerMessage();
    if (newMessage === oldMessage) {
      console.log("waiting to see user is just typing");
      await wait(1000);
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
