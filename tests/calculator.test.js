const { add, subtract } = require("../src/calculator");

describe("Calculator functions", () => {
    test("adds 2 and 3 to return 5", () => {
        expect(add(2, 3)).toBe(5);
    });

    test("subtracts 4 from 10 to return 6", () => {
        expect(subtract(10, 4)).toBe(6);
    });
});
