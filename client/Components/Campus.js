import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import {
  fetchCampus,
  showForm,
  fetchStudents,
  removeStudentThunk
} from "../store";
import { Card, Icon, Image, Segment, Button } from "semantic-ui-react";
import CampusEdit from "./CampusEdit";
import StudentForm from "./StudentForm";

class Campus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      forProp: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchCampus(id);
    this.props.showForm();
  }

  componentWillReceiveProps(nextProps) {
    // console.log("cwrp", nextProps);
    if (
      this.state.forProp &&
      nextProps.campus.students == this.props.campus.students
    ) {
      const { id } = this.props.match.params;
      this.props.fetchCampus(id);
    }
  }

  //   componentWillReceiveProps(nextProps) {
  //     if (nextProps.student.id !== this.props.student.id) {
  //       this.props.fetchStudents();
  //     }
  //   }

  render() {
    const { campus } = this.props;
    // console.log("SingleCampus Props", this.props);
    return (
      <div className="campuses">
        <Link to="/campus">
          <h2>Campus</h2>
        </Link>
        <h2>{campus.name}</h2>
        <CampusDetail {...this.props} />
      </div>
    );
  }
}

const CampusDetail = props => {
  const { campus, onClick, onDelete, campuses, enable } = props;

  const students = campus.students;

  return (
    <div>
      <span>
        <Card className="headerDivider">
          <Image src={campus.imageUrl} />
          <Card.Content>
            <Card.Header>{campus.name}</Card.Header>
            <Card.Meta />
            <Card.Description>{campus.description}</Card.Description>
          </Card.Content>
          <Card.Content extra>
            <a>
              <Icon name="user" />
              {campus.students ? campus.students.length : 0} Students
            </a>
            <Button
              color="red"
              className="campusButton"
              onClick={() => onClick()}
            >
              <CampusEdit {...props} />
              Edit Campus
            </Button>
          </Card.Content>
        </Card>
      </span>
      <span className="componentName">
        <h2>Students</h2>
      </span>
      <div className="componentDivider">
        <Card.Group>
          {students &&
            students.map(student => (
              <div key={student.id} className="campuses col-md-4">
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
                  </Link>
                  <Card.Content extra>
                    <Button
                      color="red"
                      className="campusButton"
                      onClick={() => onDelete(student)}
                    >
                      Delete Student
                    </Button>
                  </Card.Content>
                </Card>
              </div>
            ))}
        </Card.Group>
      </div>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    students: state.students,
    student: state.student,
    campus: state.campus,
    form: state.form,
    campuses: state.campuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampus(id) {
      dispatch(fetchCampus(id));
    },
    fetchStudents() {
      dispatch(fetchStudents());
    },
    showForm() {
      dispatch(showForm(false));
    },
    onClick() {
      dispatch(showForm(true));
      //   dispatch(fetchCampus(id));
    },
    onDelete(id) {
      dispatch(removeStudentThunk(id));
    },
    enableCampus() {
      dispatch(showForm(true));
    }
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Campus));
