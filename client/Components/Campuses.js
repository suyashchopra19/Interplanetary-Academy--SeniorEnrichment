import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCampuses, showForm, removeCampusThunk } from '../store';
import CampusForm from './CampusForm';
import { Link } from 'react-router-dom';
import StudentForm from './StudentForm'
import {
  Card,
  Icon,
  Image,
  Grid,
  Segment,
  Button,
  Confirm,
  Modal
} from 'semantic-ui-react';

class CampusesList extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.fetchCampuses();
    this.props.showForm(true);
  }

  render() {
    // const {campuses} = this.props
    // console.log(campuses)
    return <CampusesContainer {...this.props} />;
  }
}

const CampusesContainer = props => {
  const { campuses, enableCampus, showForm, onDelete } = props;
  console.log('CampusComponentProps', props);
  return (
    <div className="students">
      <h1>Campuses</h1>
      <Button className="addCampus" onClick={enableCampus}>
        {<CampusForm />}
        ADD CAMPUS
      </Button>

      <Link to="/student">
      <Button className="seeStudents" floated="right">
        STUDENTS
      </Button>
      </Link>

      <Grid padded>
        <Grid.Row padded>
          {campuses &&
            campuses.map(campus => (
              <div key={campus.id} className="campuses col-md-4">
                {console.log('Hi', campus)}
                <Segment>
                  <Card.Group>
                    <Card>
                      <Link to={`/campus/${campus.id}`}>
                        <Image src={campus.imageUrl} />
                      </Link>
                      <Card.Content>
                        <Card.Header>{campus.name}</Card.Header>
                        <Card.Meta>
                          <span className="date" />
                        </Card.Meta>
                        <Card.Description>
                          {campus.description}
                        </Card.Description>
                      </Card.Content>
                      <Card.Content extra>
                        <a>
                          <Icon name="user" />
                          {campus.students ? campus.students.length : 0}
                          Students
                        </a>
                        <Button
                          color="red"
                          className="campusButton"
                          onClick={() => onDelete(campus)}
                        >
                          Delete Campus
                        </Button>
                      </Card.Content>
                    </Card>
                  </Card.Group>
                </Segment>
              </div>
            ))}
        </Grid.Row>
      </Grid>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    campuses: state.campuses
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchCampuses() {
      dispatch(fetchCampuses());
    },
    enableCampus() {
      dispatch(showForm(true));
    },
    showForm() {
      dispatch(showForm(false));
    },
    onDelete(id) {
      dispatch(removeCampusThunk(id));
    }
  };
};

const Campuses = connect(mapStateToProps, mapDispatchToProps)(CampusesList);

export default Campuses;
