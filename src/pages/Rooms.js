import React, { Component } from 'react';
import Layout from '../layout/master';
import {connect} from 'react-redux';
class Rooms extends Component {
  render() {
    return (
      <Layout activeLink='room'>
        This is Rooms Page
        {this.props.city_id}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  city_id: state.city_id.city_id
})
export default connect(mapStateToProps)(Rooms);