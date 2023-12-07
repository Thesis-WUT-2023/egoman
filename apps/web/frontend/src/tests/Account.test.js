import { render, screen, fireEvent } from '@testing-library/react';
import Account, { validateValues } from '../pages/Account';


describe("Update Account", () => {
    test("validate function should pass on correct input ", () => {
        const values = { name:"Test", surname:"Test", email: "test@test.com", password: "test1234", repassword:"test1234"};
        let errors = validateValues(values);
        expect(errors).toStrictEqual({});
    });
    

});


