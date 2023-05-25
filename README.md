# Aplicación app-notas

## Equipo de trabajo
- Pazzis Paulino 1103790
- Paola Saldaña 1104081
- Alexa Guzmán 1101488
- Johan Contreras 1106473
- Allen Silverio 1104220

## Descripción de la asignación
Han de escoger una de las dos apps compartidas y aplicar 12 factores a la misma, e implementar los siguientes puntos:

- Code Base (I)
- Dependencias (II)
- Config (III)
- Backing Services (IV)
- Port Binding (VII)

## Requerimientos de la aplicación
1. Docker
2. NodeJS
3. Instalar las dependencias de la aplicación con el comando `npm install`

## Pasos para ejecutar la aplicación

### 1. Se debe tener un archivo .env con las siguientes variables de entorno:

`DB_CONNECTION_STRING=mongodb://localhost:27017`

`PORT=3000`

### 2. Crear el contenedor con dockerfile

`docker build -t mongo-app-db .`

`docker run -d -p 27017:27017 --name mongo-app mongo-app-db`


### 3. Correr la aplicación
`node main.js`

Ruta: http://localhost:3000/notes-add