import React from 'react'
import {Link} from 'react-router-dom'
const Room = ({ room, showButton }) => {
  return (
    <div className="col-md-4">
      <div className="card shadow-sm my-2">
        <div className="card-body">
          <h6 className="card-title">{room.title}</h6>
          <div className="room-info">
            <div className="col-md-12 px-0">
              <i className="fas fa-users mr-2"></i>
              Capacity: {room.capacity}
            </div>
            <div className="col-md-12 px-0">
              <i className="fas fa-money-bill-alt mr-2"></i>
              Price: ${room.price}
            </div>
          </div>
        </div>
        {showButton ? <Link to={'/room/' + room.code} className="btn btn-light">More</Link> : null}
      </div>
    </div>

  )
}
export default Room