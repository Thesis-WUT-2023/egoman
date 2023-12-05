import { render, screen, fireEvent } from '@testing-library/react';
import SignIn, { validateValues } from '../pages/SignIn';


describe("login", () => {
    test("validate function should pass on correct input ", () => {
        const values = { email: "text@test.com", password: "test" };
        let errors = validateValues(values);
        expect(errors).toStrictEqual({});

    });
    test("validate function should fail on incorrect input ", () => {
        const values = { email: "text@test.c", password: "test" };
        let errors = validateValues(values);
        expect(errors).toStrictEqual({ email: "Invalid Email" });

    });
    test("validate function should fail on empty input ", () => {
        const values = { email: "", password: "" };
        let errors = validateValues(values);
        expect(errors).toStrictEqual({ email: "Email is required", password: "Password is required" });

    });
    

});


