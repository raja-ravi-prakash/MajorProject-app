import urllib.request
import json
import os

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
for i, index in primaryEntity:
    primaryEntities.append(createFile(i['file'], "assets/primary/"+index+"primary.jpg"))


entities = createFaces('assets/entity.jpg')

print(entities, primaryEntities)