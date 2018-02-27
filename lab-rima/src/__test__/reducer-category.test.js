import reducer from '../reducer/category';


describe('Category reducer', () => {

  describe('default action', () => {
    test('should return an initial app state', () => {
      expect(reducer(undefined, {})).toEqual([]);
    });
  });

  describe('create action', () => {
    test('should create a new category in app state', () => {
      const mockCategory = {name: 'new one', budget: 100, id: 1};
      expect(reducer([], {type: 'CATEGORY_CREATE', payload: mockCategory})).toEqual([mockCategory]);
    });
  });

  describe('update action', () => {
    test('should return an updated app state', () => {
      const mockCategory = {name: 'new one', budget: 100, id: 1};
      let categories = reducer([], {type: 'CATEGORY_CREATE', payload: mockCategory});
      const updatedMockCategory = {name: 'updated one', budget: 150, id: 1};
      expect(reducer(categories, {type: 'CATEGORY_UPDATE', payload: updatedMockCategory})).toEqual([updatedMockCategory]);
    });
  });

  describe('remove action', () => {
    test('should return an app state with removed an item', () => {
      const mockCategory = {name: 'new one', budget: 100, id: 1};
      let categories = reducer([], {type: 'CATEGORY_CREATE', payload: mockCategory});
      expect(reducer(categories, {type: 'CATEGORY_DELETE', payload: mockCategory})).toEqual([]);
    });
  });
});
