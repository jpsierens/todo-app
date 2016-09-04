import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';
import Todo from '../components/Todo';

const Todos = ({ todos }) =>
    <div className="todos">
        { todos.map(t => <Todo key={t.updated_at} {...t} />) }
    </div>;

Todos.propTypes = {
    todos: PropTypes.array,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFilter: filterText => dispatch(filterTable(filterText))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Todos);
