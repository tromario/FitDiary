import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';

import * as CategoryActions from '../../app/actions/CategoryActions';
import * as types from '../../app/constants/Category';

const MockAdapter = require('axios-mock-adapter');
const mock = new MockAdapter(axios);

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('category actions', () => {
    let store;
    beforeEach(() => {
        store = mockStore({})
    });

    // afterEach(() => {
    //     mock.restore();
    //     mock.reset();
    // });

    it('should handle createCategory', () => {
        const category = { _id: 1, name: 'Рис' };
        const expectedActions = [
            { type: types.CREATE_CATEGORY_REQUEST },
            { type: types.CREATE_CATEGORY_SUCCESS, payload: category }
        ];

        mock.onPost('/api/v1/categories').reply(200, category);

        return store.dispatch(CategoryActions.createCategory(category)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle getCategories', () => {
        const categories = [
            { _id: 1, name: 'Рис' },
            { _id: 2, name: 'Молочное' },
        ];
        const expectedActions = [
            { type: types.GET_CATEGORIES_REQUEST },
            { type: types.GET_CATEGORIES_SUCCESS, payload: categories }
        ];

        mock.onGet('/api/v1/categories').reply(200, categories);

        return store.dispatch(CategoryActions.getCategories()).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle getCategory', () => {
        const category = { _id: 1, name: 'Рис' }
        const expectedActions = [
            { type: types.GET_CATEGORY_REQUEST },
            { type: types.GET_CATEGORY_SUCCESS, payload: category }
        ];

        mock.onGet('/api/v1/categories/' + category._id).reply(200, category);

        return store.dispatch(CategoryActions.getCategory(category._id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle updateCategory', () => {
        // TODO: Решить с именованием аттрибута id
        const category = { id: 1, name: 'Рис' };
        const expectedActions = [
            { type: types.UPDATE_CATEGORY_REQUEST },
            { type: types.UPDATE_CATEGORY_SUCCESS, payload: category }
        ];

        mock.onPut('/api/v1/categories/' + category.id).reply(200, category);

        return store.dispatch(CategoryActions.updateCategory(category)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });

    it('should handle deleteCategory', () => {
        const category = { _id: 1, name: 'Рис' };
        const expectedActions = [
            { type: types.DELETE_CATEGORY_REQUEST },
            { type: types.DELETE_CATEGORY_SUCCESS, payload: category }
        ];

        mock.onDelete('/api/v1/categories/' + category._id).reply(200, category);

        return store.dispatch(CategoryActions.deleteCategory(category._id)).then(() => {
            expect(store.getActions()).toEqual(expectedActions);
        });
    });
});
