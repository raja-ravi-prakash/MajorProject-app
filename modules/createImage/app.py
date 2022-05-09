import urllib.request
import json

payload = json.loads(input())
dataUri = payload['file']
response = urllib.request.urlopen(dataUri)
with open('image.jpg', 'wb') as f:
    f.write(response.file.read())