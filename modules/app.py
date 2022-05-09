import urllib.request
import json
import os
import base64
from deepface import DeepFace
import cv2

def createFile(dataUri, path):
    response = urllib.request.urlopen(dataUri)
    with open(path, 'wb') as f:
        f.write(response.file.read())
    return path

def createFaces(imagePath):
    image = cv2.imread(imagePath)
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    faceCascade = cv2.CascadeClassifier(cv2.data.haarcascades + "haarcascade_frontalface_default.xml")
    faces = faceCascade.detectMultiScale(
        gray,
        scaleFactor=1.3,
        minNeighbors=3,
    )
    index = 0
    facesPaths = []
    for (x, y, w, h) in faces:
        roi_color = image[y:y + h, x:x + w]
        path = 'assets/faces/' + str(index) + 'faces.jpg'
        facesPaths.append(path)
        cv2.imwrite(path, roi_color)
        index+=1
    return facesPaths
    

entityFile = open('entity.json', "r")
entity = json.loads(entityFile.read())

primaryEntityFile = open('primaryEntity.json', "r")
primaryEntity = json.loads(primaryEntityFile.read())

os.mkdir('assets')
os.mkdir('assets/primary')
os.mkdir('assets/faces')

mainEntityFile = createFile(entity['file'], 'assets/entity.jpg')
primaryEntities = []
index=0
for i in primaryEntity:
    tempPath = createFile(i['file'], "assets/primary/" + str(index) + "primary.jpg")
    primaryEntities.append({
        "_id": i['_id'],
        "path": tempPath 
    })
    index+=1


entities = createFaces('assets/entity.jpg')

foundedPrimaryEntities = []
newPrimaryEntities = []
global isFaceFound
isFaceFound = False
for i in entities:
    isFaceFound = False
    for j in primaryEntities:
        result = DeepFace.verify(img1_path = i, img2_path = j['path'])
        isFaceFound = result['verified']
        if(isFaceFound):
            foundedPrimaryEntities.append(j['_id'])
            break
    if(isFaceFound==False):
        newPrimaryEntities.append(i)

def toDataUri(filename):
    ext = filename.split('.')[-1]
    prefix = f'data:image/{ext};base64,'
    with open(filename, 'rb') as f:
        img = f.read()
    return prefix + base64.b64encode(img).decode('utf-8')

newPrimaryEntities = [toDataUri(i) for i in newPrimaryEntities]

def getDatabase():
    from pymongo import MongoClient

    from pymongo import MongoClient
    client = MongoClient('localhost', 27017)

    return client['c15-major-project']

db = getDatabase()
if(len(newPrimaryEntities)):
    result = db['primaryentities'].insert_many([{
        'user': entity['user'],
        'file': i
    } for i in newPrimaryEntities])
    for j in result.inserted_ids:
        foundedPrimaryEntities.append(j)

from bson.objectid import ObjectId
db['entities'].update_one({
    '_id': ObjectId(entity['_id']),
}, {
    '$set': {
        'primaryEntity': [ObjectId(i) for i in foundedPrimaryEntities]
    }
})