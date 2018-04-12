import React from 'react';
import ReactDOM from 'react-dom';
import Home from '../../app/components/Home';
import { shallow } from 'enzyme';

describe('<Home />', () => {
    it('Сравнение содержимого компонента Home', () => {
        const renderedComponent = shallow(
            <Home />
        );

        expect(renderedComponent.find('h1').text()).toBe('Главная');
    })
})