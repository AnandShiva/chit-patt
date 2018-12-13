import React, {Component} from 'react'
import List from '@material-ui/core/List'
import ListItem from "@material-ui/core/ListItem";
import IconButton from '@material-ui/core/IconButton';
import AddIcon from '@material-ui/icons/Add';
import { withStyles } from "@material-ui/core/styles";
import './GroupsContainer.css'
import GroupItem from './GroupItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

class GroupsContainer extends Component{
	constructor(){
		super();
/*		this.state = this.props.groups_list;
		this.state.group_count = 0;
		console.log('constructor');*/
	}

	on_addbutton_press = ()=>{
		let new_immutable_group_list = this.props.groups_list.slice();
		new_immutable_group_list.push({
			id : this.props.groups_list.length,
			value : ''
		});
		this.props.on_items_change(new_immutable_group_list,this.props.name);
	}
	delete_group = (group_data)=>{
		console.log(group_data);
		let new_immutable_group_list = this.props.groups_list.slice();
		new_immutable_group_list.splice(group_data.id, 1);
		this.props.on_items_change(new_immutable_group_list,this.props.name);
	} 
	handleGroupValueChange = (changed_group_value, group_index)=>{
		let new_immutable_group_list = this.props.groups_list.slice();
		console.log(changed_group_value)
		new_immutable_group_list[group_index] = changed_group_value;
		this.props.on_items_change(new_immutable_group_list,this.props.name);
	}
	render(){
			var divStyle = {
				width : '200px',
				'text-align' : 'center'
			}
		return (
			<div className="groups_container">
			<List>
			<ListItem className="add_group_item"> 
				<Paper style={divStyle} >
				  <Typography variant="h5" component="h3">
          			{this.props.name}
       			  </Typography>
				</Paper>
				<IconButton>
					<AddIcon onClick={this.on_addbutton_press} />
				</IconButton>
			</ListItem>
			{this.props.groups_list.map((group,index) => 
				<ListItem> 
						<GroupItem id={index} on_change={this.handleGroupValueChange} 
							label={this.props.name+' '+index} 
							value={group.value} on_delete={this.delete_group} /> 
				</ListItem> ) }
			</List>
			</div>
			)

	}
}

export default (GroupsContainer);