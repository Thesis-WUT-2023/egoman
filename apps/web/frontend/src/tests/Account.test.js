import { render, screen, fireEvent } from '@testing-library/react';
import Model, { validateValues } from '../pages/Model';


describe("login", () => {
    test("validate function should pass on correct input ", () => {
        const values = {
            product: "Test",
            month: "12/2022",
            month1: "1",
            month2: "2",
            month3: "3",
            astma: "0",
            pochp: "0",
            sold: "3",
        };
        let errors = validateValues(values);
        expect(errors).toStrictEqual({});

    });

    test("validate function should fails on incorrect input ", () => {
        const values =
        {
            product: "Test",
            month: "12/2022",
            month1: "-2",
            month2: "2",
            month3: "3",
            astma: "0",
            pochp: "0",
            sold: "3",
        };
        let errors = validateValues(values);
        expect(errors).toStrictEqual({ nums: "All fields should be higher than 0" });

    });


});


