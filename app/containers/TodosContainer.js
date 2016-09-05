import { connect } from 'react-redux';
import { createTodo } from '../actions';
import Todos from '../components/Todos';

const mapStateToProps = (state) => {
    return {
        todos: state.todos
    };
};

const TodosContainer = connect(
    mapStateToProps,
    { createTodo }
)(Todos);

export default TodosContainer;
