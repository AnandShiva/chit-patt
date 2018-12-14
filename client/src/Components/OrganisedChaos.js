import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import '../App.css';

class OrganisedChaos extends Component{
	render(){
		//console.log(this.props.teams_list);
		return(
			this.props.teams_list.map((team)=>{
				return(<Card className='team_cards'>
				<CardContent>
        			<Typography color="textSecondary" gutterBottom>
         				<b>{team.team_name}</b>
        			</Typography>
        			{team.team_members.map((member)=>{
        				return (<Chip className='cards_chip' label={member.Name} />);
        			})}
        		
        		</CardContent>	
				</Card>)
			})
			)
	}
}

export default OrganisedChaos;