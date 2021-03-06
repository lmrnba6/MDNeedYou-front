import React from "react"
import { render } from "react-dom"

export default class GMap extends React.Component {
  state = { zoom: 10 };

  

  render() {
    return(

      <div class="container">
	<div class="row">
        <div id="filter-panel" class="collapse filter-panel">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form class="form-inline" role="form">
                        <div class="form-group">
                            <label class="filter-col"  for="pref-perpage">Rows per page:</label>
                            <select id="pref-perpage" class="form-control">
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option selected="selected" value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                            </select>                                
                        </div> 
          <div class="container">
	<div class="row">
        <div id="filter-panel" class="collapse filter-panel">
            <div class="panel panel-default">
                <div class="panel-body">
                    <form class="form-inline" role="form">
                        <div class="form-group">
                            <label class="filter-col"  for="pref-perpage">Rows per page:</label>
                            <select id="pref-perpage" class="form-control">
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                                <option value="6">6</option>
                                <option value="7">7</option>
                                <option value="8">8</option>
                                <option value="9">9</option>
                                <option selected="selected" value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="30">30</option>
                                <option value="40">40</option>
                                <option value="50">50</option>
                                <option value="100">100</option>
                                <option value="200">200</option>
                                <option value="300">300</option>
                                <option value="400">400</option>
                                <option value="500">500</option>
                                <option value="1000">1000</option>
                            </select>                                
                        </div>
                        <div class="form-group">
                            <label class="filter-col"  for="pref-search">Search:</label>
                            <input type="text" class="form-control input-sm" id="pref-search"/>
                        </div>
                        <div class="form-group">
                            <label class="filter-col"  for="pref-orderby">Order by:</label>
                            <select id="pref-orderby" class="form-control">
                                <option>Descendent</option>
                            </select>                                
                        </div> 
                        <div class="form-group">    
                            <div class="checkbox">
                                <label><input type="checkbox"/> Remember parameters</label>
                            </div>
                            <button type="submit" class="btn btn-default filter-col">
                                <span class="glyphicon glyphicon-record"></span> Save Settings
                            </button>  
                        </div>
                    </form>
                </div>
            </div>
        </div>    
        <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#filter-panel">
            <span class="glyphicon glyphicon-cog"></span> Advanced Search
        </button>
	</div>
</div>
                    </form>
                </div>
            </div>
        </div>    
        <button type="button" class="btn btn-primary" data-toggle="collapse" data-target="#filter-panel">
            <span class="glyphicon glyphicon-cog"></span> Advanced Search
        </button>
	</div>
</div>

    )}



  
}




