import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import '../styles/App.scss';
import Home from "../pages/Home";
import RoomPage from "../pages/Room";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import RoomsPage from "../pages/Rooms";
import { Provider } from 'react-redux'
import store from '../store';

class App extends Component {
	NotFound = () => {
		return (
			<h1>404</h1>
		)
	}

	render() {
		return (
			<Provider store={store}>
				<React.Fragment>
					<Router>
						<Switch>
							<Route exact path="/" component={Home} />
							<Route path="/rooms" component={RoomsPage} />
							<Route path="/room/:code" component={RoomPage} />
							<Route path="*" component={this.NotFound} />
						</Switch>
					</Router>
					<ToastContainer />
				</React.Fragment>
			</Provider>
		);
	}
}

export default App;