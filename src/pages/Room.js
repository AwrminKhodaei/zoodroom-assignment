import React, { Component } from 'react';
import Layout from '../layout/master';
import Room from '../components/Room';
import { roomsServices } from '../services/rooms.service';
import { toast } from 'react-toastify';
class RoomPage extends Component {
  state = {
    roomInfo: {}
  }
  componentDidMount() {
    this.handleGetRoom()
  }

  // Get room info
  handleGetRoom = () => {
    const { code } = this.props.match.params
    roomsServices.getRoom(code)
      .then(response => {
        if (response.status === 200) {
          this.setState({
            roomInfo: response.data
          });
        } else {
          toast.error('Error getting room info from api')
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('Error getting room info from api')
      })
  }
  render() {
    const { roomInfo } = this.state
    return (
      <Layout activeLink='room'>
        <Room room={roomInfo} showButton={false}/>
      </Layout>
    );
  }
}

export default RoomPage;