import { formatUserName } from "./utils";

describe('utils', () => {
    test('formatUserName adds @ to the beginning of the username', () => {
        expect(formatUserName('jc')).toBe('@jc');
    })

    test('formatUserName does not add @ when it is already provided', () => {
        expect(formatUserName('@jc')).toBe('@jc');
      });
})