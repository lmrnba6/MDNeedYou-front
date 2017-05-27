import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class SearchExpand extends React.Component {
    constructor() {
        super()

    }


    render() {

        return (
            <form action="" class="search-form">
                <div class="form-group has-feedback">
                    <label for="search" class="sr-only">Search</label>
                    <input type="text" class="form-control" name="search" id="search" placeholder="search" />
                    <span class="glyphicon glyphicon-search form-control-feedback"></span>
                </div>
            </form>
        );
    }
}
