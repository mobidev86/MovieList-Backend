import awaggerAutogen from 'swagger-autogen';
const options: any = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js TypeScript project',
        },

    },

};
const outputFile = './docs/swagger.json';
const endpointsFiles = ['.**/app.ts', '../src/v1/**/*controller*.ts'];
awaggerAutogen(outputFile, endpointsFiles, options);

// export default swaggerSpec;
