import React from 'react'
import Room from './Room';

const Rooms = ({ rooms }) => {
  return (
    <div className="card-deck">
      {rooms && rooms.map((room, key) => (
        <Room room={room} key={key} showButton={true}/>
      ))}
    </div>
  )
}
export default Rooms