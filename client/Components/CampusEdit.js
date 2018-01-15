import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Checkbox, Form } from "semantic-ui-react";
import { showForm, editForm, updateCampus } from "../store";

class CampusEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { form, handleSubmit, onClose, onChange } = this.props;
    console.log(this.props);
    return (
      <div>
        {form && (
          <Form onSubmit={handleSubmit}>
            <Form.Field>
              <label>Name</label>
              <input
                placeholder="Name"
                name="name"
                value={this.state.name}
                onChange={onChange}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Description</label>
              <input
                placeholder="Description"
                name="description"
                value={this.state.description}
                onChange={onChange}
              />
            </Form.Field>
            <br />
            <Form.Field>
              <label>Image Url</label>
              <input
                placeholder="Image Url"
                name="imageUrl"
                value={this.state.imageUrl}
                onChange={onChange}
              />
            </Form.Field>
            <br />
            <Button
              floated="right"
              color="red"
              type="submit"
              onClick={() => onClose()}
            >
              Submit
            </Button>
          </Form>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    campus: state.campus,
    form: state.form
  };
};

const mapDispatchToProps = (dispatch, ownProps, state) => {
  return {
    handleSubmit(e) {
      event.preventDefault();
      const id = ownProps.match.params.id;
      console.log("id", id);
      console.log("state", this.state);
      console.log("ownProps", ownProps);
      const { name, imageUrl, description } = ownProps.campus;
      const campusUpdate = { name, imageUrl, description };
      dispatch(showForm(false));
      dispatch(updateCampus(id, campusUpdate));
    },
    onChange(ev) {
      const change = {};
      change[ev.target.name] = ev.target.value;
      const campus = Object.assign(ownProps.campus, change);

      dispatch(editForm(campus));
    },
    onClose() {
      console.log("hit");
      dispatch(showForm(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusEdit);
