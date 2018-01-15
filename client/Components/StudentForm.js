import React from "react";
import { connect } from "react-redux";
import { editForm, addStudentThunk, showForm } from "../store";
import {
  Button,
  Form,
  Segment,
  Input,
  Select,
  TextArea
} from "semantic-ui-react";

const StudentForm = props => {
  console.log("studentform props", props);
  const { student, campuses, form, onSubmit, onClose, onChange } = props;
  return (
    <div>
      {form && (
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>First Name</label>
            <input
              placeholder="firstName"
              name="firstName"
              value={student.firstName}
              onChange={onChange}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Last Name</label>
            <input
              placeholder="lastName"
              name="lastName"
              value={student.lastName}
              onChange={onChange}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Email</label>
            <input
              placeholder="Email"
              name="email"
              value={student.email}
              onChange={onChange}
            />
          </Form.Field>
          <br />
          <Form.Field>
            <label>G.P.A</label>
            <input
              placeholder="G.P.A"
              name="gpa"
              value={student.gpa}
              onChange={onChange}
            />
          </Form.Field>
          <br />
          <label>Campus</label>
          <select name="campusId" onChange={onChange} className="form-control">
            {campuses.map(campus => {
              return (
                <option value={campus.id} key={campus.id}>
                  {campus.name}
                </option>
              );
            })}
          </select>
          <br />
          <Button
            floated="right"
            color="green"
            type="submit"
            onClick={() => onClose()}
          >
            Submit
          </Button>
        </Form>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange(e) {
      const { name } = e.target;
      dispatch(editForm({ [name]: e.target.value }));
    },
    onSubmit(e) {
      e.preventDefault();
      const firstName = e.target.firstName.value;
      const lastName = e.target.lastName.value;
      const email = e.target.email.value;
      const gpa = e.target.gpa.value;
      const campusId = e.target.campusId.value * 1;
      dispatch(showForm(false));
      dispatch(addStudentThunk({ firstName, lastName, email, gpa, campusId }));
    },
    onClose() {
      dispatch(showForm(false));
    }
  };
};

const mapStateToProps = state => {
  return {
    campuses: state.campuses,
    form: state.form,
    student: {}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm);
