import urllib.request
import json

payload = json.loads(input())
dataUri = payload['file']
print(payload['_id'])
response = urllib.request.urlopen(dataUri)
with open('image.jpg', 'wb') as f:
    f.write(response.file.read())