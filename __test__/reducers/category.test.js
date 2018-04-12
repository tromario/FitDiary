import reducer from '../../app/reducers/category';
import * as types from '../../app/constants/Category';

describe('category reducer', () => {
    it('should return the initial state', () => {
        expect(
            reducer(undefined, {})
        ).toEqual({
            categories: [],
            category: null
        })
    });

    it('should handle empty CREATE_CATEGORY_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.CREATE_CATEGORY_SUCCESS,
                payload: {}
            })
        ).toEqual({
            categories: [{}],
            category: null
        });
    });

    it('should handle CREATE_CATEGORY_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.CREATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Молочное'
                }
            })
        ).toEqual({
            categories: [{
                _id: 0,
                name: 'Молочное'
            }],
            category: null
        });

        expect(
            reducer({
                categories: [{
                    _id: 0,
                    name: 'Молочное'
                }], 
                category: null
            }, 
            {
                type: types.CREATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 1,
                    name: 'Бобовые'
                }
            })
        ).toEqual({
            categories: [
                {
                    _id: 0,
                    name: 'Молочное'
                },
                {
                    _id: 1,
                    name: 'Бобовые'
                }
            ],
            category: null
        });
    });

    it('should handle GET_CATEGORIES_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.GET_CATEGORIES_SUCCESS,
                payload: [{
                    _id: 0,
                    name: 'Молочное'
                }]
            })
        ).toEqual({
            categories: [{
                _id: 0,
                name: 'Молочное'
            }],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [{
                    _id: 0,
                    name: 'Молочное'
                }], 
                category: null
            }, 
            {
                // пришло новое состояние от сервера и его нужно переписать в замен старому
                type: types.GET_CATEGORIES_SUCCESS,
                payload: [
                    {
                        _id: 0,
                        name: 'Молочное'
                    },
                    {
                        _id: 1,
                        name: 'Бобовые'
                    }
                ]
            })
        ).toEqual({
            categories: [
                {
                    _id: 0,
                    name: 'Молочное'
                },
                {
                    _id: 1,
                    name: 'Бобовые'
                }
            ],
            category: null
        });
    });

    it('should handle GET_CATEGORY_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.GET_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Молочное'
                }
            })
        ).toEqual({
            categories: [],
            category: {
                _id: 0,
                name: 'Молочное'
            }
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [], 
                category: {
                    _id: 0,
                    name: 'Молочное'
                }
            }, 
            {
                // пришло новое состояние от сервера и его нужно переписать в замен старому
                type: types.GET_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Бобовые'
                }
            })
        ).toEqual({
            categories: [],
            category: {
                _id: 0,
                name: 'Бобовые'
            }
        });
    });

    it('should handle UPDATE_CATEGORY_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Молочное'
                }
            })
        ).toEqual({
            categories: [],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [{
                    _id: 0,
                    name: 'Молочное'
                }], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно обновить для нужного элемента
                type: types.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Бобовые'
                }                
            })
        ).toEqual({
            categories: [{
                _id: 0,
                name: 'Бобовые'
            }],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        _id: 0,
                        name: 'Рис'
                    },
                    {
                        _id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно обновить для нужного элемента
                type: types.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 1,
                    name: 'Макароны'
                }                
            })
        ).toEqual({
            categories: [
                {
                    _id: 0,
                    name: 'Рис'
                },
                {
                    _id: 1,
                    name: 'Макароны'
                }
            ],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        _id: 0,
                        name: 'Рис'
                    },
                    {
                        _id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно обновить для нужного элемента
                type: types.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Макароны'
                }                
            })
        ).toEqual({
            categories: [
                {
                    _id: 0,
                    name: 'Макароны'
                },
                {
                    _id: 1,
                    name: 'Греча'
                }
            ],
            category: null
        });

        // проверка на отсутствие нужного поля
        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        id: 0,
                        name: 'Рис'
                    },
                    {
                        id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно обновить для нужного элемента
                type: types.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Макароны'
                }                
            })
        ).toEqual({
            categories: [
                {
                    id: 0,
                    name: 'Рис'
                },
                {
                    id: 1,
                    name: 'Греча'
                }
            ],
            category: null
        });

        // проверка на отсутствие нужного поля
        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        id: 0,
                        name: 'Рис'
                    },
                    {
                        id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно обновить для нужного элемента
                type: types.UPDATE_CATEGORY_SUCCESS,
                payload: {
                    id: 0,
                    name: 'Макароны'
                }                
            })
        ).toEqual({
            categories: [
                {
                    id: 0,
                    name: 'Рис'
                },
                {
                    id: 1,
                    name: 'Греча'
                }
            ],
            category: null
        });
    });

    it('should handle DELETE_CATEGORY_SUCCESS', () => {
        expect(
            reducer(undefined, {
                type: types.DELETE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Молочное'
                }
            })
        ).toEqual({
            categories: [],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [{
                    _id: 0,
                    name: 'Молочное'
                }], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно удалить для нужного элемента
                type: types.DELETE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Молочное'
                }                
            })
        ).toEqual({
            categories: [],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        _id: 0,
                        name: 'Рис'
                    },
                    {
                        _id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно удалить для нужного элемента
                type: types.DELETE_CATEGORY_SUCCESS,
                payload: {
                    _id: 1,
                    name: 'Греча'
                }                
            })
        ).toEqual({
            categories: [{
                _id: 0,
                name: 'Рис'
            }],
            category: null
        });

        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        _id: 0,
                        name: 'Рис'
                    },
                    {
                        _id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно удалить для нужного элемента
                type: types.DELETE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Рис'
                }                
            })
        ).toEqual({
            categories: [{
                _id: 1,
                name: 'Греча'
            }],
            category: null
        });

        // проверка на отсутствие нужного поля
        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        id: 0,
                        name: 'Рис'
                    },
                    {
                        id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно удалить для нужного элемента
                type: types.DELETE_CATEGORY_SUCCESS,
                payload: {
                    _id: 0,
                    name: 'Рис'
                }                
            })
        ).toEqual({
            categories: [
                {
                    id: 0,
                    name: 'Рис'
                },
                {
                    id: 1,
                    name: 'Греча'
                }
            ],
            category: null
        });

        // проверка на отсутствие нужного поля
        expect(
            reducer({
                // имеем в данный момент
                categories: [
                    {
                        id: 0,
                        name: 'Рис'
                    },
                    {
                        id: 1,
                        name: 'Греча'
                    }
                ], 
                category: null
            }, 
            {
                // пришел новый объект от сервера и его нужно удалить для нужного элемента
                type: types.DELETE_CATEGORY_SUCCESS,
                payload: {
                    id: 0,
                    name: 'Рис'
                }                
            })
        ).toEqual({
            categories: [
                {
                    id: 0,
                    name: 'Рис'
                },
                {
                    id: 1,
                    name: 'Греча'
                }
            ],
            category: null
        });
    });
})