import React, { Component } from 'react';
import '../App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
import GroupsContainer from './GroupsContainer';
import UsersContainer from './UsersContainer';
import IconButton from '@material-ui/core/IconButton';
import nextIcon from '../circle_blue_next.svg';
import RightArrowIcon from './RightArrowComponent';
class Home extends Component {


    render() {
        return (
            <div className="page_container">
                <div className="home_container">
                    <div>
                        <UsersContainer name='people' Label="People" groups_list={this.props.people_list}
                            task_list={this.props.tasks_list} on_items_change={this.props.onItemChange} />
                    </div>
                    <div>
                        <GroupsContainer name='tasks' Label="Tasks" groups_list={this.props.tasks_list} on_items_change={this.props.onItemChange} />

                    </div>
                    <div className="next_section">
                        <IconButton className='next_logo' component={Link} to="/Results"
                            onClick={this.props.onSubmit} variant="contained" color="primary">
                            <RightArrowIcon css_class="svg_icon" />
                        </IconButton>
                    </div>


                </div>
            </div>

        );
    }
}

export default (Home);
