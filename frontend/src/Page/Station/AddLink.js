import React, { Component } from 'react';
import Grid from 'material-ui/Grid';
import Input from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import Button from 'material-ui/Button';

const style = {
  addLinkContainer: {
    border: '1px solid #bfbfbf',
    padding: '10px',
  },
  button: {
    marginTop: '20px',
  },
  input: {
    width: '400px',
    margin: '20px',
  },
};

class AddLink extends Component {
  render() {
    return (
      <div style={style.addLinkContainer}>
        <h1>Add Link to Station</h1>
        <div className="">
          <FormControl>
            <Input
              placeholder="Youtube link"
              value={this.props.inputUrl}
              onChange={this.props.updateInputUrl}
              style={style.input}
            />
          </FormControl>
          <Button
            raised
            color="primary"
            style={style.button}
            onClick={this.props.addLink}
          >
            Add
          </Button>
        </div>
      </div>
    );
  }
}

export default AddLink;
