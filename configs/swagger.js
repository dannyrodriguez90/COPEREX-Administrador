import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options ={
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Adminstrador de empresas API",
            version: "1.0.0",
            description: "API para una gestion de empresas",
            contact:{
                name: "Danny Rodriguez",
                email: "drodriguez-2020522@kinal.org.gt"
            }
        },
        servers:[
            {
                url: "http://localhost:3001/coperex/v1"
            }
        ]
    },
    apis:[
        "./src/auth/auth.routes.js",
        "./src/empresas/empresa.routes.js",
    ]
}

const swaggerDocs = swaggerJSDoc(options)

export { swaggerDocs, swaggerUi}