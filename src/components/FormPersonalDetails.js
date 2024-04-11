import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';
import FormInput from './FormInput';

export class FormPersonalDetails extends Component {
  state = {
    errors: {
      occupation: '',
      city: '',
      bio: ''
    }
  }

  continue = e => {
    e.preventDefault();
    // Validate input
    if (this.validate()) {
      this.props.nextStep();
    }
  }

  back = e => {
    e.preventDefault();
    this.props.prevStep(); // Call the prevStep function from props
  }

  validate = () => {
    const { values } = this.props;
    let isValid = true;

    // Validate occupation
    if (values.occupation.trim() === '') {
      this.setState(prevState => ({
        errors: { ...prevState.errors, occupation: 'Occupation is required' }
      }));
      isValid = false;
    } else {
      this.setState(prevState => ({
        errors: { ...prevState.errors, occupation: '' }
      }));
    }

    // Validate city
    if (values.city.trim() === '') {
      this.setState(prevState => ({
        errors: { ...prevState.errors, city: 'City is required' }
      }));
      isValid = false;
    } else {
      this.setState(prevState => ({
        errors: { ...prevState.errors, city: '' }
      }));
    }

    // Validate bio
    if (values.bio.trim() === '') {
      this.setState(prevState => ({
        errors: { ...prevState.errors, bio: 'Bio is required' }
      }));
      isValid = false;
    } else {
      this.setState(prevState => ({
        errors: { ...prevState.errors, bio: '' }
      }));
    }

    return isValid;
  }

  handleChange = input => e => {
    const { errors } = this.state;
    // Clear error when user starts typing
    this.setState({
      errors: { ...errors, [input]: '' }
    });
    this.props.handleChange(input)(e);
  }

  render() {
    const { values } = this.props;
    const { errors } = this.state;

    return (
      <MuiThemeProvider>
        <React.Fragment>
          <AppBar title="Enter Personal Details" />
          <FormInput
            label="Occupation"
            value={values.occupation}
            onChange={this.handleChange('occupation')}
            errorText={errors.occupation}
          />
          <br />

          <FormInput
            label="City"
            value={values.city}
            onChange={this.handleChange('city')}
            errorText={errors.city}
          />
          <br />

          <FormInput
            label="Bio"
            value={values.bio}
            onChange={this.handleChange('bio')}
            errorText={errors.bio}
          />
          <br />

          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
            disabled={Object.values(errors).some(error => error !== '')}
          />

          <RaisedButton
            label="Back"
            primary={false}
            style={styles.button}
            onClick={this.back} // Call the back function on click
          />
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

const styles = {
  button: {
    margin: 15
  }
}

export default FormPersonalDetails;
