import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form } from 'semantic-ui-react';
import { editForm, updateStudent, showForm, fetchStudent } from '../store';

class StudentEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.baseState = this.state;
  }

  resetForm = () => {
    console.log('reset')
    this.setState(this.baseState);
  };

  render() {
    console.log(this.props);
    console.log(student);
    const {
      student,
      campuses,
      form,
      title,
      onChange,
      onSubmit,
      onClose
    } = this.props;
    console.log(this.props);
    return (
      <div className="componentStudent">
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Field>
              <label>First Name</label>
              <input
                onChange={onChange}
                placeholder="First Name"
                name="firstName"
                value={this.state.firstName}
              />
            </Form.Field>
            <Form.Field>
              <label>Last Name</label>
              <input
                onChange={onChange}
                placeholder="Last Name"
                name="lastName"
                value={this.state.lastName}
              />
            </Form.Field>
          </Form.Group>
          <Form.Group>
            <Form.Field>
              <label>Email</label>
              <input
                onChange={onChange}
                placeholder="Email"
                name="email"
                value={this.state.email}
              />
            </Form.Field>
            <Form.Field>
              <label>G.P.A</label>
              <input
                onChange={onChange}
                placeholder="G.P.A"
                name="gpa"
                value={this.state.gpa}
              />
            </Form.Field>
          </Form.Group>
          <section>Campus</section>
          <div>
            <select
              name="campusId"
              onChange={onChange}
              className="form-control"
            >
              {campuses.map(campus => {
                return (
                  <option name="campusId" value={campus.id} key={campus.id}>
                    {campus.name}
                  </option>
                );
              })}
            </select>
          </div>
          <Form.Button onCLick={() => this.resetForm()}>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    student: state.student,
    form: state.form
  };
};

const mapDispatchToProps = (dispatch, ownProps, state) => {
  return {
    onChange(ev) {
      const change = {};
      change[ev.target.name] = ev.target.value;
      // const student = Object.assign(ownProps.student, change);
      dispatch(editForm(change));

    },
    onSubmit(ev) {
      ev.preventDefault();
      console.log('state', ev.target.campusId.value);
      console.log('ownProps', ownProps);
      const firstName = ev.target.firstName.value;
      const lastName = ev.target.lastName.value;
      const email = ev.target.email.value;
      const gpa = ev.target.gpa.value;
      const campusId = ev.target.campusId.value;

      const { id } = ownProps.match.params;
      Promise.all([
      dispatch(updateStudent(id, { firstName, lastName, email, gpa, campusId })),
      dispatch(fetchStudent(id))
      ])

    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentEdit);
