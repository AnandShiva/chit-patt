import React, {Component} from 'react'
import TextField from '@material-ui/core/TextField'
import DeleteIcon from '@material-ui/icons/Delete'
import IconButton from '@material-ui/core/IconButton';
import '../App.css';

class GroupItem extends Component{
	constructor(){
		super();
	}
	on_click(event){
		this.props.on_delete(this.props)
	}
	on_change = (e) =>{
		console.log(e.target.value)
		let changed_group_data =  {
			id : this.props.id,
			value : e.target.value,
			label : this.props.label
		};
		this.props.on_change(changed_group_data, this.props.id);
	}
	render(){
		return (<div >
		<TextField id={this.props.id} placeholder='Task Description ' label={"Task "+Number(this.props.id+1)} 
		onChange={this.on_change} value={this.props.value} />  
		<IconButton size='medium' arial-label='delete'>
		<DeleteIcon onClick={(e)=>this.on_click(e)} />
		</IconButton>
		</div>)
	}
}

export default GroupItem
