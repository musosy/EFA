import { describe, it, expect } from '@jest/globals';
import HelloWorldService from '../../src/helloworld/helloworld.service';

describe('HelloWorld Service tests', () => {
    describe('Function "hello" tests', () => {
        it('should return an object with a status and a message', () => {
            const result = HelloWorldService.hello();
            expect(result.status).toEqual(200);
            expect(result.message).toEqual('Hello World!');
        });
    });
    describe('Function "helloUser" tests', () => {
        it('should return an object with a status and a custom message', () => {
            const name = 'User';
            const result = HelloWorldService.helloUser(name);
            expect(result.status).toEqual(200);
            expect(result.message).toEqual(`Hello ${name}!`);
        });
    });
});
