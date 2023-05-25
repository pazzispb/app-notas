-- Archivo .env

.env :

DB_CONNECTION_STRING=mongodb://localhost:27017
PORT=3000

-- Crear el contenedor con dockerfile

docker build -t mongo-app-db .
docker run -d -p 27017:27017 --name mongo-app mongo-notas-db


-- Correr la aplicación
node main.js
Ruta: http://localhost:3000/notes-add