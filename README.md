# Información general | [English](https://github.com/Nano204/AlkemyChallengeBE/blob/main/README_English.md)

## Inteción

Este proyecto fue creado con dos intenciones princiaplmente

### 1. Participar del challenge de Alkemy

Uno de los propósitos del poriyecto es particpar del challenge con el fin de hacer parte de los procesos de aceleración de Alkemy para programadores Jr. y de la misma manera medir mis propios conocimientos adquieridos en el Backend de NodeJS, al igual que adquirir nuevos conocimientos gracias a los apartados del proyecto que exigen alguna tecnología o funcionalidad que desconozco antes de inciar el proyecto.

### 2. Crear una código guiado para otros programadores que esten interesados en aprender sobre Backend con NodeJs

El segundo propósito de este proyecto es construir un código generíco a cerca de cómo montar un servidor local y conectarlo a aun BD de postgress, por lo que el código se encuentra completamente commentado para facilitar la lectura e indicar que hace cada uno de los bloques de código.<br />
**Todos los comentarios estan en ingles.**

## Orden de lectura

A continuación presento cual fue el orden de creación de cada uno de los archivos para que sirva cómo guía para la lectura del código y asi se permita llevar un proceso de pensamiento hilado que facilita la comprensión del mismo:

**1.** index.js + server.js <br />
**2.** src/db/index.js <br />
**3.** src/test/. (Usar el interruptor de la función "isAutheticated" en el middleware "authentication")<br />
**4.** src/db/models/. <br />
**5.** src/middlewares (CRUD) - Documentación aqui: [Postman](https://documenter.getpostman.com/view/21829383/UzJPMapD)<br />
**6.** src/mw/authetication <br />

**Nota:** Mis test dejaron de funcionar cuando incluí la autenticación porque aun no sé cómo incluir enviar cookies desde el jest hacia los post y asi tener permanencia del usuario logueado. Para hacer funcionar los test puse un interruptor en la función isAuthenticated.

# Alkemy Challenge Backend - NodeJS

## Objetivo

Desarrollar una API para explorar el mundo de Disney, la cual permitirá conocer y modificar los personajes que lo componen y entender en qué películas estos participaron. Por otro lado, deberá exponer la información para que cualquier frontend pueda consumirla.

👉 No es necesario armar el Frontend. <br />
👉 Las rutas deberán seguir el patrón REST. <br />
👉 Utilizar NodeJs y Express. <br />
👉 Utilizar la librería Sequelize.

`¡No es indispensable hacer todo!`

Mientras más completes, mayor puntaje obtendrás, pero puedes enviar la app hasta el estadío que la tengas en base a tu conocimiento actual. Recuerda que el objetivo del challenge es entender tu nivel de conocimiento actual.

## Requerimientos técnicos

1.  Modelado de Base de Datos ✔️

2.  Autenticación de Usuarios ✔️

3.  Listado de Personajes ✔️

4.  Creación, Edición y Eliminación de Personajes (CRUD) ✔️

5.  Detalle de Personaje ✔️

6.  Búsqueda de Personajes ✔️

7.  Listado de Películas ✔️

8.  Detalle de Película / Serie con sus personajes ✔️

9.  Creación, Edición y Eliminación de Película / Serie ✔️

10. Búsqueda de Películas o Series ✔️

11. Envío de emails ✔️

12. **Extra:** Testing ⚠️

Para mas información pueden visitar `https://www.alkemy.org/`
