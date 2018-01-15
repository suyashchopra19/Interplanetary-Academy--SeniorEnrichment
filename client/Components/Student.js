import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { fetchStudent, showForm, fetchCampuses, fetchCampus } from "../store";
import { Card, Icon, Image, Button } from "semantic-ui-react";
import StudentEdit from "./StudentEdit";

class Student extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchStudent(id);
    this.props.fetchCampuses();
    this.props.showForm();
  }

  componentWillReceiveProps(nextProps){
      if(nextProps.student.campusId !== this.props.student.campusId){
          console.log('cwrp',nextProps)
         this.props.fetchCampus(nextProps.student.campusId); 
      }
  }


  render() {
    return (
    
      <div className="campuses row">
        {this.props.student.fullName && <h1>{this.props.student.fullName}</h1>}
        <Link to="/campus">
          <Button className="seeCampus" floated="right">
            CAMPUSES
          </Button>
        </Link>
        <StudentDetail {...this.props} />
        <StudentEdit {...this.props} />
      </div>
    );
  }
}

const StudentDetail = props => {
  const { student, onCLick, campus } = props;
//   const campus = student.campus;
  console.log("student", props);
//   const campus= student.campus
  return (
    <div className="student">
      <Card>
        <Image src="https://thumbs.dreamstime.com/b/graduaci%C3%B3n-de-la-escuela-universidad-muchacho-46468660.jpg" />
        <Card.Content>
          <Card.Header>{student.fullName}</Card.Header>
          <Card.Meta>
            <span className="date">{student.email}</span>
          </Card.Meta>
          <Card.Description></Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name="user" />
            G.P.A : {student.gpa}
          </a>
        </Card.Content>
        <Card.Content extra>
          <Icon name="university" />
          {campus && (
            <Link to={`/campus/${campus.id}`}>{campus.name}</Link>
          )}
        </Card.Content>
      </Card>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    student: state.student,
    form: state.form,
    campus:state.campus
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchStudent(id) {
      dispatch(fetchStudent(id));
    },
    showForm() {
      dispatch(showForm(false));
    },
    onClick(id) {
      dispatch(showForm(true));
      dispatch(fetchStudent(id));
    },
    fetchCampuses() {
      dispatch(fetchCampuses());
    },
    fetchCampus(id) {
      dispatch(fetchCampus(id));
    }
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Student)
);
