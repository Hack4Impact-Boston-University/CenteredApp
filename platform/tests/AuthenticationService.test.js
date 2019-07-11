const service = require("../services/AuthenticationService");

test('session create', () => {

    const validSessionExample = {
        id: expect.any(String),
        expiration: expect.any(Number)
    };

    //getting null object because the function returns before the session information is fetched from the database
    expect(service.serializeUser("desilva")).toMatchObject(validSessionExample);
})