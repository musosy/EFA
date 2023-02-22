/* eslint-disable no-unused-vars */
export enum HelloWorldErrorEnum {
    CreationError = 'The entity could not be created.',
    FindUniqueError = 'The requested entity could not be found.',
    DeletionError = 'The requested entity could not be deleted.',
    UpdateError = 'The requested entity could not be updated.',
}

export type HelloWorldError = {
    message: HelloWorldErrorEnum;
    details: unknown;
};
