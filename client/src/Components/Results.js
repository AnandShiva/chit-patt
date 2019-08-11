import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import OrganisedChaos from '../Components/OrganisedChaos';
import OrganisedChaosForEmail from '../Components/OrganisedChaosForEmail';
import RightArrow from './RightArrowComponent';

class ResultsPage extends Component {
    constructor() {
        super();
    }
    nav_back = ()=> {
        window.history.back();
    }
    render() {
        return (<div className='results_page_container' >
            <IconButton onClick={this.nav_back} className='next_logo'>
                <RightArrow css_class="back_logo" />
            </IconButton>
            <OrganisedChaos teams_list={this.props.teams} />
            <IconButton className='next_logo' >
                <RightArrow css_class="svg_icon"/>
            </IconButton>
        </div>
        );
    }

}

export default ResultsPage;
