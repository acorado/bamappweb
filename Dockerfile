# Selecciona la imagen base de Node.js
FROM node:latest

# Crea el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios para construir la aplicación en el contenedor
COPY package*.json ./
COPY . .

# Instala las dependencias del proyecto
RUN npm install

# Construye la aplicación
RUN npm run build

# Expone el puerto 3000 para que sea accesible desde el exterior
EXPOSE 8080

# Inicia la aplicación
CMD ["npm", "start"]
