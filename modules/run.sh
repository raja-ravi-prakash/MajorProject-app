export PATH="/home/ronin/anaconda3/bin:$PATH"
source activate vnv
python createImage/app.py < entity.json > entityid
mkdir compareFaces/faces
python extractFaces/app.py image.jpg
sudo mv primaryEntity.json compareFaces/primaryEntity.json
python compareFaces/app.py
# bash clean.sh