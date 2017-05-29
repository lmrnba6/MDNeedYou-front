import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";


export default class SimpleForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            address: '',
            result: '',
            country: '',
            redirect: false,
        };
        this.onChange = (address) => this.setState({ address });
        this.getCity = this.getCity.bind(this);
    }

    handleFormSubmit = (event) => {
        event.preventDefault()

        geocodeByAddress(this.state.address)
            .then(results => this.getCity(results[0]))
            .then(latLng => this.setState({ result: latLng }))
            .catch(error => console.error('Error', error))
    }

    getCity(address) {

        var arrAddress = address.address_components;
        var itemRoute = '';
        var itemCity = '';
        var itemCountry = '';
        var itemPc = '';
        var itemSnumber = '';

        // iterate through address_component array
        $.each(arrAddress, function (i, address_component) {
            //console.log('address_component:' + i);

            if (address_component.types[0] == 'route') {
                //console.log(i + ': route:' + address_component.long_name);
                itemRoute = address_component.long_name;
            }

            if (address_component.types[0] == 'locality') {
                // console.log('town:' + address_component.long_name);
                itemCity = address_component.long_name.replace(" ","").toLowerCase();
            }

            if (address_component.types[0] == 'country') {
                // console.log('country:' + address_component.long_name);
                itemCountry = address_component.long_name;
            }

            if (address_component.types[0] == 'postal_code_prefix') {
                // console.log('pc:' + address_component.long_name);
                itemPc = address_component.long_name;
            }

            if (address_component.types[0] == 'street_number') {
                //console.log('street_number:' + address_component.long_name);
                itemSnumber = address_component.long_name;
            }
        });

        this.setState({ city: itemCity, country: itemCountry });
        this.setState({ redirect: true })
    }

    render() {

        const AutocompleteItem = ({ suggestion }) => (<div><i className='fa fa-map-marker' /> {suggestion}</div>)
        console.log(this.state.city)
        const inputProps = {
            placeholder: 'Where are you?',
            value: this.state.address,
            onChange: this.onChange,

        }

        const defaultStyles = {

            root: {
                position: 'relative',
                paddingBottom: '0px',
                color: 'black',
            },
            input: {
                display: 'inline-block',
                width: '75%',
                padding: '10px',
                borderRadius: '200px',
                border: 'black',
                float: 'left',

            },

            autocompleteContainer: {
                position: 'absolute',
                top: '100%',
                backgroundColor: 'white',
                border: '1px solid #555555',

                width: '75%',
                marginTop: '40px',


            },
            autocompleteItem: {
                backgroundColor: '#ffffff',
                padding: '10px',
                color: '#0000',
                cursor: 'pointer',
                textAlign: 'left',

            },
            autocompleteItemActive: {
                backgroundColor: '#1996d7'
            }
        }

        return (

            this.state.redirect ?
                <Redirect to={'/businessList/'+this.state.city.trim()} /> :
                <div id='autoComplete' class='col-md-6 col-md-offset-3'>
                    <form onSubmit={this.handleFormSubmit}>
                        <input class="pull-right autoComplete btn btn-lg btn-primary" type='submit' value="Heal me" />
                        <PlacesAutocomplete autocompleteItem={AutocompleteItem} styles={defaultStyles} inputProps={inputProps} />

                    </form>
                </div>
        )
    }
}
