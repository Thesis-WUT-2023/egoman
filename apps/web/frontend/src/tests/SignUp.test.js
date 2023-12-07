import { render, screen, fireEvent } from '@testing-library/react';
import SignUp, { validateValues } from '../pages/SignUp';


describe("signup", () => {
    test("validate function should pass on correct input ", () => {
        const values = { name:"Test", surname:"Test", email: "test@test.com", password: "test1234", repassword:"test1234"};
        let errors = validateValues(values);
        expect(errors).toStrictEqual({});
    });
    test("validate function should fail on incorrect input ", () => {
        const values = { name:"Test", surname:"Test", email: "test@test.c", password: "test1234", repassword:"test1234" };
        let errors = validateValues(values);
        expect(errors).toStrictEqual({ email: "Invalid Email" });

    });
    test("validate function should fail on empty input ", () => {
        const values = { name:"", surname:"", email: "", password: "", repassword:""};
        let errors = validateValues(values);
        expect(errors).toStrictEqual({ name:"Name is required", surname:"Surname is required", email: "Email is required", password: "Password is required", repassword: "Verify the password"});

    });

    test("validate function should fail on unmatched passwords ", () => {
        const values = { name:"Test", surname:"Test", email: "test@test.com", password: "test1234", repassword:"test1235"};
        let errors = validateValues(values);
        expect(errors).toStrictEqual({repassword: "Passwords do not match"});

    });

    test("validate function should fail - spaces in password ", () => {
        const values = { name:"Test", surname:"Test", email: "test@test.com", password: "test1234", repassword:"test1234 "};
        let errors = validateValues(values);
        expect(errors).toStrictEqual({repassword: "Passwords do not match"});

    });

});


