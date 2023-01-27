
# Lectura

Lectura es un proyecto propio de gestion de archivos pdfs.


## Variables de entorno

Para inicializar el proyecto se necesita un archivo .env en el directorio "/" con los siguientes valores.

`SECRET_KEY` Django

`ACCESS_TOKEN_DROPBOX` Dropbox Api

`PORT` 

Y otro en el directorio "/client" con los siguientes valores.

VITE_API_URL Url del servidor


## Instalacion e inicio para desarrollo

Instalación e inicio para desarrollo.

Servidor.

```bash
  cd server
  py -m vevn virtual
  virtual\Scripts\activate
  pip install -r requirements.txt
  py manage.py migrate  
  py manage.py runserver
```
Cliente.

```bash
  cd server
  cd client
  npm install
  npm run dev
```
## Estado del proyecto

El proyecto esta finalizado.

