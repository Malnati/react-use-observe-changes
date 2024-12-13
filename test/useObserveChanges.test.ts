
jest.mock('react-router-dom', () => ({
    useSearchParams: jest.fn(),
}));

describe('index', () => {
    beforeAll(() => {
        jest.spyOn(global.console, 'info').mockImplementation(() => {});
        jest.spyOn(global.console, 'warn').mockImplementation(() => {});
        jest.spyOn(global.console, 'error').mockImplementation(() => {});
    });

    afterAll(() => {
        jest.restoreAllMocks();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

	it('should test something', () => {
		expect(() => { throw new Error('paramName is required') }).toThrow('paramName is required');
	});
});
