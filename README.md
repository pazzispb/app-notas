# Pasos para correr la aplicación

## 1.  Archivo .env

`DB_CONNECTION_STRING=mongodb://db:27017`

`PORT=3000`

## 2. Hacer login en docker

`docker login`

## 3. Crear el contenedor con para la base de datos con el dockerfile, esto debe hacerse en la direcion de "/db/"

`docker build -t tu-usuario-dockerhub/my-db-app .`

`docker tag tu-usuario-dockerhub/my-db-app tu-usuario-dockerhub/my-db-app:1.0`

`docker push tu-usuario-dockerhub/my-db-app:1.0`

## 4. Crear el contenedor con para la app con el dockerfile, esto debe hacerse en la direcion del repositorio

`docker build -t tu-usuario-dockerhub/my-web-app .`

`docker tag tu-usuario-dockerhub/my-web-app tu-usuario-dockerhub/my-web-app:1.0`

`docker push tu-usuario-dockerhub/my-web-app:1.0`

`docker tag tu-usuario-dockerhub/my-web-app:latest tu-usuario-dockerhub/my-web-app:1.0.0`

`docker push tu-usuario-dockerhub/my-web-app:1.0.0`

## 5. Correr la aplicación

`docker-compose up`

Ruta:http://localhost:3000/notes-add
