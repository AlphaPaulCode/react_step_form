import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export class FormUserDetails extends Component {
  state = {
    errors: {
      firstName: '',
      lastName: '',
      email: ''
    }
  }

  continue = e => {
    e.preventDefault();
    // Validate input
    if (this.validate()) {
      this.props.nextStep();
    }
  }

  validate = () => {
    const { firstName, lastName, email } = this.props.values;
    const errors = {};
    let isValid = true;

    if (firstName.trim() === '') {
      errors.firstName = 'First name is required';
      isValid = false;
    }

    if (lastName.trim() === '') {
      errors.lastName = 'Last name is required';
      isValid = false;
    }

    if (email.trim() === '') {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = 'Invalid email address';
      isValid = false;
    }

    this.setState({ errors });
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
          <AppBar title="Enter User Details" />
          <TextField
            hintText="Enter your First Name"
            floatingLabelText="First Name"
            onChange={this.handleChange('firstName')}
            defaultValue={values.firstName}
            errorText={errors.firstName}
          />
          <br />

          <TextField
            hintText="Enter your Last Name"
            floatingLabelText="Last Name"
            onChange={this.handleChange('lastName')}
            defaultValue={values.lastName}
            errorText={errors.lastName}
          />
          <br />

          <TextField
            hintText="Enter your Email"
            floatingLabelText="Email"
            onChange={this.handleChange('email')}
            defaultValue={values.email}
            errorText={errors.email}
          />
          <br />

          <RaisedButton
            label="Continue"
            primary={true}
            style={styles.button}
            onClick={this.continue}
            disabled={Object.values(errors).some(error => error !== '')}
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

export default FormUserDetails;
