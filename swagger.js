const swaggerAutogen = require('swagger-autogen')();

output = './swagger_doc.json';
endpoints = ['./routers/UsersAPI.js','./routers/AutoresAPI.js','./routers/LivrosAPI.js',]

swaggerAutogen(output,endpoints);