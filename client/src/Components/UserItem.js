import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
/*import Option from 'muicss/lib/react/option';
import Select from 'muicss/lib/react/select';*/
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import FilledInput from '@material-ui/core/FilledInput';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import my_select from './Select'
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
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
		var options_list = ['1','2','3','4','5'];
		return (<div className="user_item_container">
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
        <ListItemText />
		<TextField className="user_item" id={this.props.id} placeholder='EMAIL ID' label={'User Email ID '+ Number(this.props.id+1)} 
			onChange={this.on_change_email} value={this.props.email_id} />  		
		<IconButton className="user_item" size='medium' arial-label='delete'>
		<DeleteIcon onClick={(e)=>this.on_click(e)} />
		</IconButton>
		</div>)
	}
}

export default withStyles(styles)(UserItem);
