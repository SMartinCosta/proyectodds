Back-end para TP de Diseño de Sistemas basado en Spring Boot (Java)

La base de datos está dockerizada. Para usarla hay que correr el comando:
> docker pull cherckyto/dds-mysql:1.0

> docker run -p 3306:3306 -d cherckyto/dds-mysql:1.0

Si se inicializa el contenedor desde Docker Desktop hay que exponer el puerto 3306 del contenedor. 
Para ello es necesario ingresar al menú Images y al presionar el botón Run de la imagen cherckyto/dds-mysql 
se debe abrir Optional Settings e ingresar el valor 3306 en ambos casilleros de la sección Ports. Luego 
presionar Run.

Y queda la base de datos lista en la máquina. En el directorio /db se encuentran los archivos para dockerizar la base de datos si no se desea utilizar la imagen subida al hub de docker.

Para realizar las pruebas con Postman se puede importar la colección para este ejercicio que se encuentra en el directorio raiz del proyecto.

Para iniciar el proyecto desde cero se utilizó: [**Spring Initializr**](https://start.spring.io/#!type=maven-project&language=java&platformVersion=3.1.0&packaging=jar&jvmVersion=17&groupId=org.utn.frd&artifactId=dds&name=dds&description=Backend%20DDS&packageName=org.utn.frd.dds&dependencies=mysql,web,data-jpa,data-jpa)

El proyecto contiene un dockerfile que permite dockerizar la aplicación.
