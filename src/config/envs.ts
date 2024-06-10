import 'dotenv/config'
import * as joi from 'joi'

interface EnvVars {
    PORT: number;
    PRODUCTS_MICROSERVICE_HOST: string;
    PRODUCTS_MICROSERVICE_PORT: string;

    CLIENTS_MICROSERVICE_HOST: string;
    CLIENTS_MICROSERVICE_PORT: string;
}


const envsSchema = joi.object({
    PORT: joi.number().required(),
    PRODUCTS_MICROSERVICE_HOST: joi.string().required(),
    PRODUCTS_MICROSERVICE_PORT: joi.number().required(),

    CLIENTS_MICROSERVICE_HOST: joi.string().required(),
    CLIENTS_MICROSERVICE_PORT: joi.number().required(),
})
.unknown(true);



const { error, value } = envsSchema.validate( process.env );

if ( error ){
    throw new Error(`Config validation error: ${ error.message },`);
}

const envVars: EnvVars = value;


export const envs = {
    port: envVars.PORT,
    productsMicroserviceHost: envVars.PRODUCTS_MICROSERVICE_HOST,
    productsMicroservicePort: +envVars.PRODUCTS_MICROSERVICE_PORT,

    clientesMicroserviceHost: envVars.CLIENTS_MICROSERVICE_HOST,
    clientesMicroservicePort: +envVars.CLIENTS_MICROSERVICE_PORT,
}