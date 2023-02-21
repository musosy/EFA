import { ICreateHelloWorld } from '../../src/api/helloworld/helloworld.interface';

const createValidHelloWorldMock: ICreateHelloWorld = {
    status: 200,
    message: 'This is a mock',
};

const updateValidHelloWorldMock: ICreateHelloWorld = {
    status: 200,
    message: 'This is an updated mock',
};

const createInvalidHelloWorldMock: any = {
    status: 200,
    message: 200,
};

const updateInvalidHelloWorldMock: any = {
    status: 200,
    message: 200,
};

const helloWorldIdMock = 'b0399538-2220-4b8b-9624-4e74103da033';

export {
    createInvalidHelloWorldMock,
    createValidHelloWorldMock,
    updateInvalidHelloWorldMock,
    updateValidHelloWorldMock,
    helloWorldIdMock,
};
