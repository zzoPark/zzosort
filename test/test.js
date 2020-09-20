const assert = require("assert");
const zzosort = require("../src/zzosort");

describe("zzosort", () => {
  describe("#insertionSort()", () => {
    let arr = [3, 1, 10, 6, 7],
        expected = [1, 3, 6, 7, 10];
    it("should work", () => {
      zzosort.insertionSort(arr, 0, arr.length - 1, (a, b) => (a - b));
      assert.deepEqual(arr, expected);
    });
  });
  describe("#heapSort()", () => {
    let arr = [3, 1, 10, 6, 7],
        expected = [1, 3, 6, 7, 10];
    it("should work", () => {
      zzosort.heapSort(arr, 0, arr.length - 1, (a, b) => (a - b));
      assert.deepEqual(arr, expected);
    });
  });
});
