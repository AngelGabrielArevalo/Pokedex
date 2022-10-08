<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

# Ejecutar en desarrollo

1. Clonar el repositorio
2. Ejecutar 
```
npm install
```
3. Tener Nest CLI instalado
```
npm install -g @nestjs/cli
```
4. Leveantar la base de datos
```
docker-compose up -d
```
5. Clonar el arhivo __.env.templete__ y renombrar la copia a __.env__
6. Completar las variables de entorno definidas en __.env__
7. Ejecuar la aplicación en dev con:
```
npm run start:dev
```
8. Reconstruir la base de datos con la semilla
```
http://localhost:3000/api/v2/seed
```