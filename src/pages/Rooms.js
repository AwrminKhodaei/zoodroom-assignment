import React, { Component } from 'react';
import Layout from '../layout/master';
import { connect } from 'react-redux';
import { cityServices } from '../services/city.service';
import { toast } from 'react-toastify';
import { typesServices } from '../services/types.service';
import { roomsServices } from '../services/rooms.service';
import classnames from 'classnames'
import { Dropdown } from 'semantic-ui-react'

import { addCity, setURLParams } from '../actions/roomActions';
import Rooms from '../components/Rooms';

class RoomsPage extends Component {
	state = {
		cities: [],
		roomTypes: [],
		roomType: '',
		roomTypeName: '',
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
		this.handleGetRooms()
	}


	// handle query rooms
	// also checks for validation here
	handleQuery = () => {
		const { selectedCapacity, slectedCity, slectedCityId, roomType, roomTypeName } = this.state
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

			// dispatch query params to redux store
			this.props.dispatch(setURLParams({
				capacity: selectedCapacity,
				slectedCity,
				slectedCityId,
				roomType,
				roomTypeName,
			}))
			// update url
			this.props.history.replace(`/rooms/${slectedCity}?guest=${selectedCapacity}&type=${roomType}`)

			// Get new Room's detail 
			this.handleGetRooms(this.props.city.state.roomType, this.props.city.state.capacity, this.props.city.state.city_id)

		}

	}

	// handle dropdown change status 
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
		if (name === 'type') {
			this.setState({
				roomType: event.target.value,
				roomTypeName: event.nativeEvent.target[index].text
			})
		}

	}

	// Get all cities for dropdown
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

	// Get all types for dropdown
	handleGetAllTypes = () => {
		typesServices.getAllTypes()
			.then(response => {
				if (response.status === 200) {
					this.setState({
						roomTypes: response.data
					})
				} else if (response.status === 404) {
					toast.error('No room found!')
				}


			})
			.catch(err => {
				console.log(err);
				toast.error('Error getting types from api')

			})
	}

	// funtion to get room with query params
	handleGetRooms = () => {

		const { roomType, capacity, city_id } = this.props.city.state

		roomsServices.getRoomByQuery(roomType, capacity, city_id)
			.then(response => {
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
		// destructure stuff from state and reduxt store
		const { cities, roomTypes, guests, rooms, selectedCapacity, slectedCityId } = this.state
		const { roomTypeName, capacity, city_id, name } = this.props.city.state

		return (
			<Layout activeLink='room' pageClass='rooms-page'>
				<div className="hero-overlay">
					<div className="slogan text-center">
						<h2 className="slogan__text text-white">Showing result for <span className="text-danger">{this.props.city.state.name}</span></h2>
					</div>
					<div className="filter-container">
						<div className="row">
							<div className="col-md-3">
								<select
									className="form-control"
									onChange={(e) => this.handleDropDownChange(e, 'city')}>
									<option value={city_id}>{name}</option>
									{cities && cities.map(city => (
										<option value={city.id} key={city.id}>{city.name}</option>
									))}

								</select>
							</div>
							<div className="col-md-3">
								<select className="form-control" onChange={(e) => this.handleDropDownChange(e, 'type')}>
									<option value={roomTypeName}>{roomTypeName}</option>
									{roomTypes && roomTypes.map(type => (
										<option value={type.id} key={type.id}>{type.name}</option>
									))}
								</select>
							</div>
							<div className="col-md-3">
								<select className="form-control" onChange={(e) => this.handleDropDownChange(e, 'capacity')}>
									<option value={capacity}>{capacity}</option>
									{guests && guests.map((item, key) => (
										<option value={item} key={key}>{item}</option>
									))}
								</select>
							</div>
							<div className="col-md-3">
								<button
									className="btn btn-success px-5 ml-md-5"
									onClick={this.handleQuery}
									disabled={!(selectedCapacity && slectedCityId)}>
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
									{
										rooms.length > 0 ?
											<Rooms rooms={rooms} />
											: <h2 className="text-center">Not Found</h2>
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</Layout>
		);
	}
}
const mapStateToProps = (state) => ({
	city: state
})
export default connect(mapStateToProps)(RoomsPage);