import React from 'react';
import { connect } from 'react-redux';
import { editForm, addCampusThunk, showForm } from '../store';
import { Button, Checkbox, Form } from 'semantic-ui-react';

const AddCampus = props => {
  console.log('Campus Form Props: ', props);
  const { campus, form, onChange, onSubmit, onClose } = props;
  return (
    <div>
      {form && (
        <Form onSubmit={onSubmit}>
          <Form.Field>
            <label>Name</label>
            <input placeholder="Name" name="name" value={campus.name} onChange={onChange} />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Description</label>
            <input placeholder="Description" name="description" value={campus.description} onChange={onChange} />
          </Form.Field>
          <br />
          <Form.Field>
            <label>Image Url</label>
            <input placeholder="Image Url" name="imageUrl" value={campus.imageUrl} onChange={onChange} />
          </Form.Field>
          <br />
          <Button floated="right" color="green" type="submit" onClick={() => onClose()}>Submit</Button>
        </Form>

      )}
    </div>
  );
};

const mapStateToProps = state => {
  return {
    form: state.form,
    campus: {}
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onChange(ev) {
      const { name } = ev.target;
      dispatch(editForm({ [name]: ev.target.value }));
    },
    onSubmit(ev) {
      ev.preventDefault();
      const name = ev.target.name.value;
      const description = ev.target.description.value;
       const imageUrl = ev.target.imageUrl.value||"https://pbs.twimg.com/profile_images/694191024416112642/VtJUhbKk.png";
      dispatch(showForm(false));
      dispatch(addCampusThunk({ name, description, imageUrl }));
    },
    onClose() {
      dispatch(showForm(false));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCampus);
