import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';

import Menu from '../../app/components/Menu';

describe('<Menu />', () => {
    it('Сравнение содержимого элементов меню', () => {
        const originalLinks = [
            { text: 'Главная', to: '/' },
            { text: 'Продукты', to: '/products' },
            { text: 'Категории', to: '/categories' },
            { text: 'Приемы пищи', to: '/meals' },
            { text: 'Личный профиль', to: '/profile' }
        ];

        const renderedComponent = shallow(
            <Menu />
        );

        const navLinks = renderedComponent.find('NavLink');
        const actualLinks = navLinks.map(link => {
            return {
                "text": link.props().children, 
                "to": link.props().to 
            };
        });
        expect(actualLinks).toEqual(originalLinks);
    })
})