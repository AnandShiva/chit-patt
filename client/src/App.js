import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import TextField from '@material-ui/core/TextField'
import Button  from '@material-ui/core/Button'
import GroupsContainer from './Components/GroupsContainer'
import OrganisedChaos from './Components/OrganisedChaos';
class App extends Component {
  constructor(){
    super();
    this.state = {
      tasks_list : ['t1','t2','t3'].map(function(obj){
        return {
          value : obj
        }
      }),
      people_list : ['p1','p2','p3','p4','p5','p6'].map(function(obj){
        return {
          value : obj
        }
      }), 
      teams : []
    }
  }
  /*
    List type enum : tasks or people
  */
  groups_list_update =(groups_list, list_type)=>{
    this.state[list_type+'_list'] = groups_list;
    this.setState(this.state);
  }
  on_submit = ()=>{
    let tasks_list = this.state.tasks_list.map(function(task){
        return task.value;
    });
    let people_list = this.state.people_list.map(function(people){
        return {
          Name : people.value,
          PreferredGroup : ""
        }
    });
    let request_object = {
      Users : people_list,
      Groups : tasks_list
    }
    fetch("/fetch_groups",{
      method : 'post', 
      body : JSON.stringify(request_object),
      headers: {
            "Content-Type": "application/json; charset=utf-8",
            // "Content-Type": "application/x-www-form-urlencoded",
      },
    }).then(res=>res.json()).then((data)=>{
        this.state.teams = [];
        let teams_list = Object.keys(data).forEach((key)=>{
          this.state.teams.push({
            team_name : key, 
            team_members : data[key]
          })
        })
        this.setState(this.state);
    })
  }


  render() {
    let results = ''
    if(this.state.teams.length){
              results = <OrganisedChaos className='team_container' teams_list={this.state.teams} />
    }

    return (
      <div className="App">
              <div>
              <div className='tasks'>
                 <GroupsContainer name='tasks' groups_list={this.state.tasks_list} on_items_change={this.groups_list_update} />
              </div>
              <div className='team_container'>
              {results}
              </div>
              <div className='people'>
                  <GroupsContainer name='people' groups_list={this.state.people_list} on_items_change={this.groups_list_update} />
             </div>
             <div className='submit' onClick={this.on_submit}>
              <Button variant="contained" color="primary" >
                Submit
              </Button>
             </div>
             </div>
             
      </div>

    );
  }
}

export default App;