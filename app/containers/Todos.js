import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { filterTable } from '../actions';

const Todos = () => {
    return (
        <div className="filterable-table">
            hola
        </div>
    );
};

Todos.propTypes = {
    filter: PropTypes.string,
    onFilter: PropTypes.func
};

const mapStateToProps = (state) => {
    return {
        filter: state.filter
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
