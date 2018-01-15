import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import axios from 'axios';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
// import {  } from 

//Inital State
const initialState = {
    campuses: [],
    change: {},
    campus: {},
    students: [],
    student: {},
    input: {},
    form: false,
}

//Action Type
const GET_CAMPUSES = 'GET_CAMPUSES';
const GET_CAMPUS = 'GET_CAMPUS';
const ADD_CAMPUS = 'ADD_CAMPUS';
const UPDATE_CAMPUS = 'UPDATE_CAMPUS';
const REMOVE_CAMPUS = 'REMOVE_CAMPUS';
const GET_STUDENTS = 'GET_STUDENTS';
const GET_STUDENT = 'GET_STUDENT';
const ADD_STUDENT = 'ADD_STUDENT';
const UPDATE_STUDENT = 'UPDATE_STUDENT';
const REMOVE_STUDENT = 'REMOVE_STUDENT';
const SHOW_FORM = 'SHOW_FORM';
const EDIT_FORM = 'EDIT_FORM';

//Action Creator
const getCampuses = campuses => {
  return {
    type: GET_CAMPUSES,
    campuses
  };
};

const getCampus = campus => {
  return {
    type: GET_CAMPUS,
    campus
  };
};

const editCampus = campus => {
  return {
    type: UPDATE_CAMPUS,
    campus
  };
};

const addCampus = campus => {
  return {
    type: ADD_CAMPUS,
    campus
  };
};

const removeCampus = () => {
  return {
    type: REMOVE_CAMPUS
  };
};

const getStudents = students => {
  return {
    type: GET_STUDENTS,
    students
  };
};

const getStudent = student => {
  return {
    type: GET_STUDENT,
    student
  };
};

const editStudent = student => {
  return {
    type: UPDATE_STUDENT,
    student
  };
};

const addStudent = student => {
  return {
    type: ADD_STUDENT,
    student
  };
};

const removeStudent = () => {
  return {
    type: REMOVE_STUDENT
  };
};

export const showForm = input => {
  return {
    type: SHOW_FORM,
    input
  };
};

export const editForm = input => {
  return {
    type: EDIT_FORM,
    input
  };
};

//Thunk creator
export const fetchCampuses = () => {
  return dispatch => {
    return axios
      .get('/api/campuses')
      .then(res => res.data)
      .then(campuses => dispatch(getCampuses(campuses)));
  };
};

export const fetchCampus = id => {
  return dispatch => {
    return axios
      .get(`/api/campuses/${id}`)
      .then(res => res.data)
      .then(campus => dispatch(getCampus(campus)));
  };
};

export const updateCampus = (campusId, input) => {
  return dispatch => {
    const update = {}
    return axios
      .put('/api/campuses/' + campusId, input)
      .then(res => res.data)
      .then(campus => dispatch(editCampus(campus)))
  };
};

export const addCampusThunk = campus => {
  return dispatch => {
    return axios
      .post('/api/campuses', campus)
      .then(res => res.data)
      .then(newCampus => dispatch(addCampus(newCampus)));
  };
};

export const removeCampusThunk = campus => {
  return dispatch => {
    return axios
      .delete(`/api/campuses/${campus.id}`, campus)
      .then(res => res.data)
      .then(() => dispatch(fetchCampuses()))
      .then(() => dispatch(removeCampus()));
  };
};

export const fetchStudents = () => {
  return dispatch => {
    return axios
      .get('api/students')
      .then(res => res.data)
      .then(students => dispatch(getStudents(students)));
  };
};

export const fetchStudent = id => {
  return dispatch => {
    return axios
      .get(`/api/students/${id}`)
      .then(res => res.data)
      .then(student => {
        dispatch(getStudent(student));
      });
  };
};

export const updateStudent = (id, input) => {
  return dispatch => {
    return axios
      .put(`/api/students/${id}`, input)
      .then(res => res.data)
      .then(student => dispatch(editStudent(student)))
      .then(fetchStudents);
  };
};

export const addStudentThunk = student => {
  return dispatch => {
    return axios
      .post('/api/students', student)
      .then(res => res.data)
      .then(newStudent => dispatch(addStudent(newStudent)));
  };
};

export const removeStudentThunk = student => {
  return dispatch => {
    return axios
      .delete(`/api/students/${student.id}`, student)
      .then(res => res.data)
      .then(() => dispatch(removeStudent()))
      .then(() => dispatch(fetchStudents()))
      .then(() => dispatch(fetchCampuses()));
  };
};


//Reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CAMPUSES:
      return Object.assign({}, state, { campuses: action.campuses });

    case GET_CAMPUS:
      return Object.assign({}, state, { campus: action.campus });

    case UPDATE_CAMPUS:
      return Object.assign({}, state, { campuses: action.campus });

    case ADD_CAMPUS:
      return Object.assign({}, state, {
        campuses: [...state.campuses, action.campus]
      });

    case REMOVE_CAMPUS:
      return Object.assign({}, state, { campuses: [...state.campuses] });

    case GET_STUDENTS:
      return Object.assign({}, state, { students: action.students });

    case GET_STUDENT:
      return Object.assign({}, state, { student: action.student });

    case ADD_STUDENT:
      return Object.assign({}, state, {
        students: [...state.students, action.student]
      });

    case UPDATE_STUDENT:
      return Object.assign({}, state, { student: action.student });

    case REMOVE_STUDENT:
      return Object.assign({}, state, { students: [...state.students] });

    case SHOW_FORM:
      return Object.assign({}, state, { form: action.input });

    case EDIT_FORM:
      return Object.assign({}, state, { input: action.input });

    default:
      return state;
  }
};

//Store

const store = createStore(
  reducer,
  composeWithDevTools(
    applyMiddleware(createLogger({ collapsed: true }), thunkMiddleware)
  )
);
export default store
