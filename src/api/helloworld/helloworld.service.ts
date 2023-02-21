import HelloWorldRepository from './helloworld.repository';
import { ICreateHelloWorld } from './helloworld.interface';
import { helloworld } from '@prisma/client';
import { HelloWorldError } from './helloworld.error';
import { Result } from 'neverthrow';

const HelloWorldService = {
    getAll: async (): Promise<helloworld[]> => {
        return await HelloWorldRepository.getAll();
    },
    getOne: async (id: string): Promise<Result<helloworld, HelloWorldError>> => {
        return await HelloWorldRepository.getOne(id);
    },
    create: async (helloworld: ICreateHelloWorld): Promise<Result<helloworld, HelloWorldError>> => {
        return await HelloWorldRepository.create(helloworld);
    },
    delete: async (id: string): Promise<Result<helloworld, HelloWorldError>> => {
        return await HelloWorldRepository.delete(id);
    },
    update: async (id: string, helloworld: ICreateHelloWorld): Promise<Result<helloworld, HelloWorldError>> => {
        return await HelloWorldRepository.update(id, helloworld);
    }
};

export default HelloWorldService;
