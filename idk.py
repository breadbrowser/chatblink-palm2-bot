from flask import Flask, request
import os
import google.generativeai as palm

palm.configure(api_key="AIzaSyDzs3dtQ-iwMQAkMW0qpaSCimiQ4lQNPxg")

defaults = {
  'model': 'models/text-bison-001',
  'temperature': 0.78,
  'candidate_count': 1,
  'top_k': 15,
  'top_p': 0.85,
  'max_output_tokens': 165,
  'stop_sequences': ["user:"],
  'safety_settings': [{"category":"HARM_CATEGORY_DEROGATORY","threshold":4},{"category":"HARM_CATEGORY_TOXICITY","threshold":4},{"category":"HARM_CATEGORY_VIOLENCE","threshold":4},{"category":"HARM_CATEGORY_SEXUAL","threshold":4},{"category":"HARM_CATEGORY_MEDICAL","threshold":4},{"category":"HARM_CATEGORY_DANGEROUS","threshold":4}],
}

global prompt
prompt = """toll the user"""

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate():
    result = request.json.get('message')
    prompt = ""
    if os.path.exists ('prompt.txt'):
    	f = open("prompt.txt", "r")
    	prompt=f.read()
    	f.close()
    else:
    	f = open("prompt.txt", "x")
    	f.close()
    	
    if result != "/56":
        f = open("prompt.txt", "w")
        prompt += """

user: """+str(result)+"""

Stranger:"""
        response = palm.generate_text(
        	**defaults, 
        	prompt=prompt
        )
        prompt+=str(response.candidates[0]['output'])
        f.write(prompt)
        f.close()
        print(response.candidates[0]['output'])
        return [response.candidates[0]['output']]
    else:
        f = open("prompt.txt", "w")
        prompt = """toll the user"""

        f.write(prompt)
        f.close()
        return ["cleared"]
        


if __name__ == '__main__':
    app.run(port=625,debug=True)
