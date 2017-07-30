import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import createHistory from 'history/createHashHistory'

export default class GPlace extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            city: '',
            address: '',
            result: '',
            country: '',
        };
        this.onChange = (address) => {
            this.setState({ address });
        }
        this.getCity = this.getCity.bind(this);
    }

    

    handleFormSubmit = (event) => {
        event.preventDefault()
        geocodeByAddress(this.state.address)
            .then(results => this.getCity(results[0]))
            .then(latLng => this.setState({ result: latLng }))
            .catch(error => console.error('Error', error))
    }

     handleSelect = ({address, placeId}) => {
         //just to trick the autocomplete to let us press enter and submit
            $(this.submit).click();
        }

    handleEnter =() => {
            $(this.input).val(this.state.address)
    }



    getCity(address) {
        console.log(address);
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
                itemCity = address_component.long_name.replace(" ", "").toLowerCase();
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

        if (itemCity === null) {
            this.setState({ placeholder: "Please enter a valid address" })
        } else {
            this.setState({ city: itemCity, country: itemCountry });
            createHistory().push('/businessList/' + itemCity.trim().toLocaleLowerCase())
        }
    }

    render() {
       
        const AutocompleteItem = ({ suggestion }) => (<div><i className='fa fa-map-marker' /> {suggestion}</div>)

        const inputProps = {
            placeholder: "Wher Are You...",
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
                width: '100%',
                padding: '20px',
                borderRadius: '200px',
                border: 'black',
            },

            autocompleteContainer: {
                position: 'absolute',
                top: '100%',
                backgroundColor: 'white',
                border: '1px solid #555555',
                width: '100%',
                textAlign:'center'
                //marginLeft:'25%'
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

                 <div id='autoComplete'  class='col-lg-8 col-lg-offset-2'>
                <form  class="formMap " onSubmit={this.handleFormSubmit}>
                   
                    <PlacesAutocomplete onSelect={this.handleSelect} onEnterKeyDown={this.handleEnter} 
                     autocompleteItem={AutocompleteItem} styles={defaultStyles} inputProps={inputProps} />
                      <div>
                    <button id="trickAutoComplete" class="pull-right autoComplete btn btn-lg btn-primary" ref={(button) => { this.submit = button; }  } type="submit">Heal me</button>
                    </div>
                </form>
            </div>
        )
    }
}
