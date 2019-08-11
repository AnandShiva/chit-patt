import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import '../App.css';

import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing.unit * 2,
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
});

class UserItem extends Component{
	constructor(){
		super();
	}
	on_click(event){
		this.props.on_delete(this.props)
	}
	on_change_user_name = (e) =>{
		console.log(e.target.value)
		let changed_group_data =  {
			id : this.props.id,
			value : e.target.value,
			label : this.props.label,
			preferred_task : this.props.preferred_task,
			email_id : this.props.email_id
		};
		this.props.on_change(changed_group_data, this.props.id);
	}
	on_change_email =(e) =>{
		let changed_user_item = {
			id : this.props.id,
			value : this.props.value,
			label : this.props.label, 
			preferred_task :this.props.preferred_task,
			email_id :  e.target.value,
		}
		this.props.on_change(changed_user_item, this.props.id);

	}
	handleSelectChange = (e)=>{
		let changed_user_item = {
			id : this.props.id,
			value : this.props.value,
			label : this.props.label, 
			preferred_task : e.target.value, 
			email_id : this.props.email_id
		}
		this.props.on_change(changed_user_item, this.props.id);
	}

	render(){
		const { classes } = this.props;
		return (<div className="list_item">
		<TextField  className="user_item" id={this.props.id} placeholder='User Name' 
			label={"User "+ Number(this.props.id+1)} onChange={this.on_change_user_name} value={this.props.value} /> 
		<ListItemText />
		<div className="user_task_select">
		<form autoComplete="off">
        <FormControl className={classes.formControl}>
          <InputLabel htmlFor="age-simple">Preferred Task</InputLabel>
          <select className="select_drop_down" value={this.props.preferred_task} onChange={this.handleSelectChange}>
          	
          	{this.props.task_list.map(function(task){
          		return(<option value={task.value}>{task.value}</option>);
          	})}
          </select>
		</FormControl>
      	</form>
        </div>		
		<IconButton className="user_item" size='medium' arial-label='delete'>
		<DeleteIcon onClick={(e)=>this.on_click(e)} />
		</IconButton>
		</div>)
	}
}

export default withStyles(styles)(UserItem);
