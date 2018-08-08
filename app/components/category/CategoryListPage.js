import React, {Component} from "react";

import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import * as CategoryActions from "../../actions/CategoryActions";

import {NavLink} from "react-router-dom";

class CategoryListPage extends Component {
    componentWillMount() {
        const {getCategories} = this.props.categoryActions;

        getCategories();
    }

    render() {
        const {categories} = this.props.category;
        const {getCategories, deleteCategory, updateCategory} = this.props.categoryActions;

        let tableTemplate = categories.map(function (category, index) {
            return (
                <tr key={index}>
                    <td>{category.name}</td>
                    <td><NavLink to={`/categories/${category._id}`}>Подробнее</NavLink></td>
                    <td><NavLink to={`/categories/${category._id}`}>Изменить</NavLink></td>
                    <td><a href="#" onClick={() => deleteCategory(category._id)}>Удалить</a></td>
                </tr>
            );
        });

        return (
            <div>
                <h2>Категории</h2>
                <NavLink to={"/categories/new"}>Добавить</NavLink>
                <h3>Список категорий:</h3>
                <table>
                    <tbody>
                    <tr>
                        <th>Наименование</th>
                        <th colSpan="3">Действия</th>
                    </tr>
                    {tableTemplate}
                    </tbody>
                </table>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        category: state.category
    };
}

function mapDispatchToProps(dispatch) {
    return {
        categoryActions: bindActionCreators(CategoryActions, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryListPage)
