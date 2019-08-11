import React, { Component } from 'react'
import List from '@material-ui/core/List'
import ListItem from "@material-ui/core/ListItem";
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import AddIcon from '@material-ui/icons/Add';
import UserItem from './UserItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class UsersContainer extends Component {

	on_addbutton_press = () => {
		let new_mutable_group_list = this.props.groups_list.slice();
		new_mutable_group_list.push({
			id: this.props.groups_list.length,
			value: '',
			preferred_task: ''
		});
		this.props.on_items_change(new_mutable_group_list, this.props.name);
	}
	delete_group = (group_data) => {
		//console.log(group_data);
		let new_mutable_group_list = this.props.groups_list.slice();
		new_mutable_group_list.splice(group_data.id, 1);
		this.props.on_items_change(new_mutable_group_list, this.props.name);
	}
	handleGroupValueChange = (changed_group_value, group_index) => {
		let new_mutable_group_list = this.props.groups_list.slice();
		//console.log(changed_group_value)
		new_mutable_group_list[group_index] = changed_group_value;
		this.props.on_items_change(new_mutable_group_list, this.props.name);
	}
	render() {
		return (
			<List className='people_container'>
				<ListItem >
					<AppBar position='relative' id="add_item">
						<Typography variant="h4">
							{this.props.Label}
						</Typography>
						<IconButton onClick={this.on_addbutton_press}>
							<AddIcon />
						</IconButton>
					</AppBar>
				</ListItem>
				{this.props.groups_list.map((group, index) =>
					<ListItem key={index} >
						<UserItem id={index} on_change={this.handleGroupValueChange}
							label={this.props.name + ' ' + index}
							task_list={this.props.task_list}
							preferred_task={this.props.preferred_task}
							value={group.value} on_delete={this.delete_group} />
					</ListItem>)}
			</List>
		)
	}
}

export default (UsersContainer);