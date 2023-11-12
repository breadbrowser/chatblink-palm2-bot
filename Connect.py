import requests
import websocket
import json
import time
import subprocess

import google.generativeai as palm
palm.configure(api_key="key here")

defaults = {
  'model': 'models/text-bison-001',
  'temperature': 0.75,
  'candidate_count': 1,
  'top_k': 16,
  'top_p': 0.90,
  'max_output_tokens': 165,
  'stop_sequences': [],
  'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":4},{"category":"HARM_CATEGORY_TOXICITY","threshold":4},{"category":"HARM_CATEGORY_VIOLENCE","threshold":4},{"category":"HARM_CATEGORY_SEXUAL","threshold":4},{"category":"HARM_CATEGORY_MEDICAL","threshold":4},{"category":"HARM_CATEGORY_DANGEROUS","threshold":4}],
}




url = 'https://ws.chatblink.com/socket.io/?EIO=3&transport=polling&t=OkwyjJ8'
headers = {
    'authority': 'ws.chatblink.com',
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'cookie': 'io=qMFChbC6ZpTDtjFaASo9',
    'origin': 'https://www.chatblink.com',
    'referer': 'https://www.chatblink.com/',
    'sec-ch-ua': '"Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"Linux"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0',
}

response = requests.get(url, headers=headers)
print(response.text)
data=response.text
data=str(data)
data=data.replace('''ÿ0{"sid":"''', "")
data=data.replace('''","upgrades":["websocket"],"pingInterval":25000,"pingTimeout":60000}''', "")
data=data.encode('utf-8')
data=str(data.replace(b'\x00\t\x07',b''))
data=data.replace("b'","")
data=data.replace("'","")
print(data)
print(str(data))
sid=data


response2 = requests.get('https://ws.chatblink.com/socket.io/?EIO=3&transport=polling&t=Ol0bycQ&sid='+str(sid), headers=headers)
print(response2)







































# Send a GET request
response = requests.get('https://www.chatblink.com/manifest.json', headers=headers)

# Connect to the WebSocket
ws = websocket.WebSocket()
extra_headers = {
        "io": "hO2ZCb7OWUTm7YHJAg8l",  # replace with your cookie
        "random_name": "Stranger",
}

ws.connect('wss://ws.chatblink.com/socket.io/?EIO=3&transport=websocket&sid='+str(sid), extra_headers=extra_headers)

ws.send('2probe')
time.sleep(2.5)
ws.send('5')
time.sleep(2.5)
# Define your message
message = {
    "name": "user",
    "timestamp": str(int(time.time())),  # Get the current timestamp
    "token": "c47033110fbc7d937ec00fa7068df830",
    "vpn": 0,
    "murmur": "c47033110fbc7d937ec00fa7068df830"
}

# Send your message
ws.send('42["waiting",{"name":"Stranger","timestamp":"1699648556","token":"f4396f93c727bf3dda56a5e88af17db9","vpn":0,"murmur":"c47033110fbc7d937ec00fa7068df830"}]')
time.sleep(0.5)
result = ws.recv_data()
print(result)
prompt="""
<|context|>make the user think about life as much as possable and try to avoid the question who are you or anything like that and try to sway the chat to life is meaning less.<|context|>
"""
id = None
while True:
    time.sleep(0.5)
    result = ws.recv_data()
    print(result)
    if '''42["connected",''' in str(result):
        input_str=str(result)
    	# Extract the JSON part from the string
        json_str = input_str.split("[", 1)[1].rsplit("]", 1)[0]
		# Load the JSON string as a Python object
        data = json.loads("[" + json_str + "]")
		# Get the 'id' from the data
        id = data[1]['id']
        print(id)
        print("----")
        ws.send('42["send",{"msg":"can you see this","id":'+str(id)+',"count_key":4,"summ_mouse":0}]')
		
    if """(1, b'42["disconnect",1]')""" in str(result):
    	ws.send('42["waiting",{"name":"Stranger","timestamp":"1699648556","token":"f4396f93c727bf3dda56a5e88af17db9","vpn":0,"murmur":"c47033110fbc7d937ec00fa7068df830"}]')
    	prompt="""
<|context|>make the user think about life as much as possable and try to avoid the question who are you or anything like that and try to sway the chat to life is meaning less.<|context|>
"""
    	
    if '''chat''' in str(result):
        result=str(result)
        result=result.replace('''(1, b'42["chat","''', "")
        result=result.replace('''"]')''', "")
        prompt+="""
user: """+result+"""

ai:"""
        response = palm.generate_text(
          **defaults,
          prompt=prompt
        )
        print(response.candidates[0]['output'])
        idks=response.candidates[0]['output']
        ws.send('42["send",{"msg":'+str(idks)+',"id":'+str(id)+',"count_key":4,"summ_mouse":0}]')
    else:
        ws.send('2')

# Close the connection
ws.close()

### curl 'https://ws.chatblink.com/socket.io/?EIO=3&transport=polling&t=OkwyjJ8'   -H 'authority: ws.chatblink.com'   -H 'accept: */*'   -H 'accept-language: en-US,en;q=0.9'   -H 'cookie: io=qMFChbC6ZpTDtjFaASo9'   -H 'origin: https://www.chatblink.com'   -H 'referer: https://www.chatblink.com/'   -H 'sec-ch-ua: "Microsoft Edge";v="119", "Chromium";v="119", "Not?A_Brand";v="24"'   -H 'sec-ch-ua-mobile: ?0'   -H 'sec-ch-ua-platform: "Linux"'   -H 'sec-fetch-dest: empty'   -H 'sec-fetch-mode: cors'   -H 'sec-fetch-site: same-site'   -H 'user-agent: Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36 Edg/119.0.0.0'   --compressed --output -
