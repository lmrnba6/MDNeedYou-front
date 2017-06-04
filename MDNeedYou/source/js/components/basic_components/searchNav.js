import React from "react";
import { IndexLink, Link } from "react-router-dom";


export default class SearchExpand extends React.Component {

    render() {

        return (
            <div>
                <form class="navbar-form" role="search">
                    <div class="input-group">
                        <input type="text" class="form-control" placeholder="Where are you?" name="q" />
                        <div class="input-group-btn">
                            <button class="btn btn-default" type="submit"><i class="glyphicon glyphicon-search"></i></button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}
