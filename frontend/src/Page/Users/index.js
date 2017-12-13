import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { graphql, gql } from 'react-apollo';

class LandingPage extends Component {
  render() {
    if(this.props.data.loading) {
      return <h1>Loading</h1>
    }
    const { data: { getAllUsers } } = this.props;
    return (
      <div>
        {getAllUsers.map((user => (
          <div key={user.id}>
            <h2>{user.email}</h2>
            <h6>{user.firstname} {user.lastname}</h6>
          </div>
        )))}
      </div>
    );
  }
}

LandingPage.propTypes = {
  data: PropTypes.any,
};

const QUERY = gql`
{
  getAllUsers {
    id
    firstname
    lastname
    email
  }
}
`;

export default graphql(QUERY)(LandingPage);
