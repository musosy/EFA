const HelloWorldService: any = {
    hello: (): any => {
        return {
            status: 200,
            message: 'Hello World!',
        };
    },

    helloUser: (name: string): any => {
        return {
            status: 200,
            message: `Hello ${name}!`,
        };
    }
};

export default HelloWorldService;
