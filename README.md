# NEXT.js Teslo Shop

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

- Mongo corre en la siguiente dirección:

```
mongodb://localhost:27017/teslodb
```

## Configurar variables de entorno

Renombrar el archivo **.env.template** a **.env** y reemplazar los valores por los que sean necesarios.

## LLenar la base de datos con datos de prueba

Llamar a la siguiente ruta:
`http://localhost:3000/api/seed`
