import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Button from '@material-ui/core/Button'
import OrganisedChaos from './Components/OrganisedChaos';
import OrganisedChaosForEmail from './Components/OrganisedChaosForEmail';
import ResultsPage from './Components/Results';
import Home from './Components/Home';
import AppBar from '@material-ui/core/AppBar';

class App extends Component {
  constructor() {
    super();
    this.state = {
      tasks_list: ['t1', 't2', 't3'].map(function (obj) {
        return {
          value: obj
        }
      }),
      /*      tasks_list : [{
             value: ""
           }], */
      people_list: ['p1', 'p2', 'p3', 'p4', 'p5', 'p6', 'p7', 'p8'].map(function (obj) {
        return {
          value: obj,
          preferred_task: '',
          email_id: ''
        }
      }),
      /*       people_list : [{
              value: '',
              preferred_task: '',
              email_id: ''
            }], */
      teams: []
    }
  }

  groups_list_update = (groups_list, list_type) => {
    this.state[list_type + '_list'] = groups_list;
    this.setState(this.state);
  }

  home = () => {
    return (<Home onSubmit={this.on_submit.bind(this)} onItemChange={this.groups_list_update} people_list={this.state.people_list} tasks_list={this.state.tasks_list} />);
  }


  ResultsSection = () => {
    return (<ResultsPage teams={this.state.teams} />)
  }
  /*
    List type enum : tasks or people
  */

  on_submit = () => {
    let tasks_list = this.state.tasks_list.map(function (task) {
      return task.value;
    });
    let people_list = this.state.people_list.map(function (people) {
      return {
        Name: people.value,
        PreferredGroup: people.preferred_task,
        email: people.email_id
      }
    });
    let request_object = {
      Users: people_list,
      Groups: tasks_list
    }

    /*
	User = {
		Name,
		PreferredGroup,
		email
	}
	Group = string of groupName 
	*/
    let team_users_map = mapUsersToGroups(people_list, tasks_list);
    let teams_list = [];
    Object.keys(team_users_map).forEach((key) => {
      teams_list.push({
        team_name: key,
        team_members: team_users_map[key]
      })
    });
    this.state.teams = teams_list;
    this.setState(this.state);

    /* fetch("http://18.233.165.46:3000/fetch_groups", {
      method: 'post',
      body: JSON.stringify(request_object),
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
    }).then(res => res.json()).then((data) => {
      data = '[{"team_name":"t1","team_members":[{"Name":"p2","PreferredGroup":"","email":""},{"Name":"p4","PreferredGroup":"","email":""}]},{"team_name":"t2","team_members":[{"Name":"p5","PreferredGroup":"","email":""},{"Name":"p3","PreferredGroup":"","email":""}]},{"team_name":"t3","team_members":[{"Name":"p6","PreferredGroup":"","email":""},{"Name":"p1","PreferredGroup":"","email":""}]}]';
      this.state.teams = JSON.parse(data);
      this.setState(this.state);
    }) */
  }
  render() {
    return (
      <Router>
        <div>
          <Route exact path="/" component={this.home}>
          </Route>
          <Route path="/Results" component={this.ResultsSection} />
        </div>
      </Router>
    );
  }
}

function mapUsersToGroups(aUsers, aGroups) {
	//console.log(JSON.stringify(aUsers))
	//console.log(JSON.stringify(aGroups))
	if (!(aUsers.length || aGroups.length)) {
		return {};
	}
	let max_group_size = Math.ceil(aUsers.length / aGroups.length)
	//console.log(max_group_size)
	var oGroupUserMap = {
		// groupName : [user1_obj, user2_obj]
	}
	// initialize mapping object for user2group 
	for (var group_index in aGroups) {
		oGroupUserMap[aGroups[group_index]] = []
	}
	shuffleArray(aUsers)
	aUsers.sort(function (user1, user2) {
		if ((user1.PreferredGroup && user2.PreferredGroup) || (!user2.PreferredGroup && !user1.PreferredGroup)) {
			return 0
		} else if (user1.PreferredGroup && (!user2.PreferredGroup)) {
			return 1
		} else {
			return -1
		}
	})
	var user_index = aUsers.length
	while (user_index-- > 0) {
		var oCurrentUser = aUsers[user_index]
		if (oCurrentUser.PreferredGroup && oGroupUserMap[oCurrentUser.PreferredGroup].length < max_group_size) {
			// case : user has a preffered group and the preffered group has not reached its maximum groups size
			oGroupUserMap[oCurrentUser.PreferredGroup].push(oCurrentUser)
		} else {
			// case : user has no preffered groups or max groups size has reached for the group
			// hence we pick a random group and assign the current user to that group
			var random_group_name;
			do {
				random_group_name = aGroups[Math.floor(Math.random() * aGroups.length)];
			} while (oGroupUserMap[random_group_name].length >= max_group_size)
			oGroupUserMap[random_group_name].push(oCurrentUser)
		}
	}
	//console.log(oGroupUserMap)
	return oGroupUserMap

}

function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		let j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}

export default App;
