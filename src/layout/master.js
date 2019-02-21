import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';
class Layout extends Component {
  render() {
    const { activeLink, children, pageClass } = this.props
    return (
      <div className={pageClass}>
        <nav className="navbar navbar-expand-lg navbar-light bg-transparent rounded">
          <a className="navbar-brand" href="#">ZoodRoom</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsExample09" aria-controls="navbarsExample09" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarsExample09">
            <ul className="navbar-nav ml-auto">
              <li className={classnames('nav-item', { active: activeLink === 'home' })}>
                <Link className="nav-link" to="/">Home</Link>
              </li>
              <li className={classnames('nav-item', { active: activeLink === 'room' })}>
                <Link className="nav-link" to="/rooms/2213">Rooms</Link>
              </li>
            </ul>
          </div>
        </nav>
        {children}
      </div>
    );
  }
}
export default Layout