import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import '../App.css';

class OrganisedChaos extends Component{
	render(){
		return(
			this.props.teams_list.map((team)=>{
				return(<Card className='team_cards'>
				<CardContent className='team_cards_content'>
        			<Typography color="textSecondary" gutterBottom>
         				<b>{team.team_name}</b>
        			</Typography>
        			<div className='cards_chip_container'>
        			{team.team_members.map((member, index)=>{
        				return (<Chip key={index} className='cards_chip' label={member.Name} />);
        			})}
        			</div>
        		</CardContent>	
				</Card>)
			})
			)
	}
}

export default OrganisedChaos;