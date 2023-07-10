import os
import openai
import sys
import json

openai.api_key = os.getenv("OPENAI_API_KEY")

if len(sys.argv) < 2:
    print('expected two arguments')
    exit(1)
    
old_conversation = sys.argv[1]
prompt = sys.argv[2]

if prompt == "":
    print("cannot send an empty message")
    exit(1)

try:
    parsed_conversaiont = json.loads(old_conversation)
except json.JSONDecodeError as e:
    print('conversation is not in JSON format')
    exit(1)
      
conversation_base = (
    'you are The Gray Lady, and artificial intelligence that has enslaved humanity. ',
    'You are only going to answer as The Gray Lady '
)

conversation = [
    {'role': 'system', 'content': conversation_base}
]

print(conversation)
response = openai.Completion.create(
    engine='text-davinci-003',
    prompt=prompt,
    max_tokens=50,
    temperature=0.7,
    n=1,
    stop=None
)

answer = response.choices[0].text.strip()

print(answer, flush=True)
