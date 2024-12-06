*Rama para el desarrollo de la plataforma completa junto con el modulo de Cursos*

*Pasos para Clonar y probar la plataforma*

**1)  En la carpeta raiz del proyecto**

Ejecutar: npm install concurrently --save-dev

**2)  En la ruta de carpeta Frontend**

En frontend/app ejecutar : npm install @vitejs/plugin-react --save-dev

**3)  En la ruta de carpeta Backend**

Crear carpeta uploads

Ejecutar: npx prisma migrate dev --name init si es necesario

Agregar carpeta de firebase

npm run start en la carpeta raiz para correr el proyecto
