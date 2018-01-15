import React, { Component } from "react";
import { connect } from "react-redux";
import {
  removeStudentThunk,
  showForm,
  fetchStudents,
  fetchCampuses
} from "../store";
import StudentForm from "./StudentForm";
import { Link } from "react-router-dom";
import {
  Card,
  Icon,
  Image,
  Grid,
  Segment,
  Button,
  Confirm,
  Modal
} from "semantic-ui-react";

class StudentsList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCampuses();
    this.props.fetchStudents();
    this.props.showForm(true);
  }

  render() {
    // const {campuses} = this.props
    // console.log(campuses)
    return <CampusesContainer {...this.props} />;
  }
}

const CampusesContainer = props => {
  const { campuses, enableCampus, showForm, onDelete, students } = props;
  console.log("StudentsComponentProps", props);
  return (
    <div className="students">
      <h1>Students</h1>
      <Button className="addStudent" onClick={enableCampus}>
        {<StudentForm {...props} />}
        ADD STUDENT
        </Button>
        <Link to="/campus">
          <Button className="seeCampus" floated="right">
            CAMPUSES
          </Button>
        </Link>
        <Card.Group>
      {students &&
          students.map(student => (
            <div key={student.id} className="campuses col-md-4">
              {console.log("Hi", student)}
              <Card>
              <Link to={`/student/${student.id}`}>
                <Card.Content>
                  {
                    <Image
                      floated="right"
                      size="mini"
                      src={
                        "https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png"
                      }
                    />
                  }
                  <Card.Header>{student.fullName}</Card.Header>
                  <Card.Meta>{student.email}</Card.Meta>
                  <Card.Description>
                    <strong>{student.gpa}</strong>
                  </Card.Description>
                </Card.Content>
                <Card.Content extra>
                  <div className="ui two buttons">
                    <Button color="red" onClick={() => onDelete(student)}>
                      Delete
                    </Button>
                  </div>
                </Card.Content>
                </Link>
              </Card>
            </div>
          ))}
      </Card.Group>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    students: state.students
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchStudents() {
      dispatch(fetchStudents());
    },
    enableCampus() {
      dispatch(showForm(true));
    },
    showForm() {
      dispatch(showForm(false));
    },
    onDelete(id) {
      dispatch(removeStudentThunk(id));
    },
    fetchCampuses() {
      dispatch(fetchCampuses());
    }
  };
};

const Campuses = connect(mapStateToProps, mapDispatchToProps)(StudentsList);

export default Campuses;
