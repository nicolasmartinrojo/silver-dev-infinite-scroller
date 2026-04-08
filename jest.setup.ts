// Mock de IntersectionObserver (necesario para el infinite scroll en tests)
global.IntersectionObserver = jest.fn().mockImplementation((callback) => ({
  observe: jest.fn(),
  disconnect: jest.fn(),
  unobserve: jest.fn(),
  takeRecords: jest.fn(),
}));
global.fetch = jest.fn();
