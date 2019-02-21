import React, { Component } from 'react';
import { connect } from 'react-redux';
import Layout from '../layout/master';
import { cityServices } from '../services/city.service';
import { toast } from 'react-toastify';
import { typesServices } from '../services/types.service';
import { roomsServices } from '../services/rooms.service';
import classnames from 'classnames'
import Rooms from '../components/Rooms';
import { addCity } from '../actions/roomActions';
class Home extends Component {
	state = {
		cities: [],
		roomTypes: [],
		rooms: [],
		guests: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
		slectedCityId: null,
		slectedCity: null,
		selectedCapacity: null,
		errors: {}
	}

	componentDidMount() {
		this.handleGetAllCities()
		this.handleGetAllTypes()
		this.handleGetAllRooms()
	}


	handleQuery = () => {
		const { selectedCapacity, slectedCity, slectedCityId } = this.state
		// Check for erros here

		if (selectedCapacity === 'null') {
			this.setState({
				errors: { capacity: 'Capacity is not selected' }
			});
			return
		} else if (slectedCityId === 'null') {
			this.setState({
				errors: { capacity: 'Capacity is not selected' }
			});
			return
		} else {

			this.props.dispatch(addCity(Number(slectedCityId)))
			this.props.history.push(`/rooms/${slectedCity}?guest=${selectedCapacity}&type=3`)

		}

	}

	handleDropDownChange = (event, name) => {
		// persist event to get data
		event.persist();

		// get selected item's index
		const index = event.nativeEvent.target.selectedIndex;

		if (name === 'city') {
			this.setState({
				slectedCityId: event.target.value,
				slectedCity: event.nativeEvent.target[index].text
			})
		}
		if (name === 'capacity') {
			this.setState({
				selectedCapacity: event.target.value
			})
		}

	}

	handleGetAllCities = () => {
		cityServices.getAllCities()
			.then(response => {
				if (response.status === 200) {
					this.setState({
						cities: response.data
					})
				} else {
					toast.error('Error getting cities from api')
				}


			})
			.catch(err => {
				console.log(err);
				toast.error('Error getting cities from api')

			})
	}

	handleGetAllTypes = () => {
		typesServices.getAllTypes()
			.then(response => {
				if (response.status === 200) {
					this.setState({
						roomTypes: response.data
					})
				} else {
					toast.error('Error getting types from api')
				}


			})
			.catch(err => {
				console.log(err);
				toast.error('Error getting types from api')

			})
	}

	handleGetAllRooms = () => {
		roomsServices.getAllRooms()
			.then(response => {
				console.log(response);

				if (response.status === 200) {
					this.setState({
						rooms: response.data
					})
				} else {
					toast.error('Error getting rooms from api')
				}


			})
			.catch(err => {
				console.log(err);
				toast.error('Error getting rooms from api')

			})
	}
	render() {
		const { cities, roomTypes, guests, rooms, errors } = this.state
		return (
			<Layout
				activeLink='home'
				pageClass='home-page'>
				<div className="hero-overlay">
					<div className="slogan text-center">
						<h2 className="slogan__text text-white">LUXURY SPACE THAT YOU CAN AFFOR <br /> WHERE DREAMS COME TRUE</h2>
					</div>
					<div className="filter-container">
						{this.state.selectedCapacity} || {this.state.slectedCityId}
						<div className="row">
							<div className="col-md-3">
								<select
									className={classnames('form-control', { "is-invalid": errors.capacity })}
									onChange={(e) => this.handleDropDownChange(e, 'city')}>
									<option value="">select city</option>
									{cities && cities.map(city => (
										<option value={city.id} key={city.id}>{city.name}</option>
									))}

								</select>
								<div class="invalid-feedback">Example invalid custom select feedback</div>

							</div>
							<div className="col-md-3">
								<select className="form-control" onChange={(e) => this.handleDropDownChange(e, 'type')}>
									<option value="">select room type</option>
									{roomTypes && roomTypes.map(type => (
										<option value={type.name} key={type.id}>{type.name}</option>
									))}
								</select>
							</div>
							<div className="col-md-3">
								<select className="form-control" onChange={(e) => this.handleDropDownChange(e, 'capacity')}>
									<option value="">select capacity</option>
									{guests && guests.map((item, key) => (
										<option value={item} key={key}>{item}</option>
									))}
								</select>
							</div>
							<div className="col-md-3">
								<button
									className="btn btn-success px-5 ml-md-5"
									onClick={this.handleQuery}
									disabled={!(this.state.selectedCapacity && this.state.slectedCityId)}>
									Check Availibility
									</button>
							</div>
						</div>
					</div>
				</div>
				<div className="latest-rooms mt-5">
					<div className="row">
						<div className="col-md-12">
							<h2 className="text-center mb-5">LATEST ROOMS</h2>
							<div className="row">
								<div className="col-md-8 mx-auto">
									<Rooms rooms={rooms} />
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
export default connect()(Home);