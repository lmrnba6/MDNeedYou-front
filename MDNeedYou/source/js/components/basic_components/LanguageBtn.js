import React from "react";



export default class LanguageBtn extends React.Component {
    constructor() {
        super()

    }


    render() {

        return (
            <div class="btn-group dropup">
                <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown">
                    <span class="lang-sm lang-lbl-full" lang="it"></span> <span class="caret"></span>
                </button>
                <ul class="dropdown-menu" role="menu">
                    <li><span class="lang-sm lang-lbl-full" lang="ar"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="be"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="bg"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="cs"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="da"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="de"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="el"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="en"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="es"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="et"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="fi"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="fr"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="ga"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="hi"></span></li>
                    <li><span class="lang-sm lang-lbl-full" lang="hr"></span></li>
                </ul>
            </div>
        );
    }
}
