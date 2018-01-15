import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
// import store, { fetchCampuses, fetchStudents, fetchCampus } from '../store';
// import { connect } from 'react-redux';

import Campuses from './Campuses'
import Students from './Students'
import Campus from './Campus'
import Student from './Student'

const App = (props) => {
    return (
        <Switch>
            <Route exact path="/" render={() => <Redirect to="/campus" />} />
            <Route exact path ="/campus" component={Campuses} />
            <Route exact path="/campus/:id" component={ Campus } />
            <Route exact path ="/student" component={Students} />
            <Route exact path="/student/:id" component={ Student } />
        </Switch>
    )
}

// const mapStateToProps = (state) => {
//     return {
//         campuses: state.campuses,
//         students:state.students
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         fetchCampuses(){
//             dispatch(fetchCampuses());
//         }

//     }
// }

// const App = connect(mapStateToProps, mapDispatchToProps)(AppContainer)

export default App
