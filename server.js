const express = require('express')
const app = express()
const send_mail = require('./mailer')
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));

//CORS response header addition. 
app.use((req, res, next) => {
	res.append('Access-Control-Allow-Origin', ['*']);
	res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
	res.append('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

const PORT = 3000;
try {
	app.listen(PORT || 3000, (msg) => console.log('server listening at' + PORT));
} catch (e) {
	console.log(e);
}

app.get('/test/service', (req, res) => {
	console.log('get msg')
	res.json([{
		'id': 1, 'name': 'John'
	}])
})
var ReactDOM = require('react-dom');
var React = require('react');
import  OrganisedChaos from './client/src/Components/OrganisedChaos';
import ReactDOMServer from 'react-dom/server'

app.post('/fetch_groups', function (req, res) {
	let aUsers = req.body.Users || []
	//console.log(JSON.stringify(req.body));
	let aGroups = req.body.Groups || []
	/*
	User = {
		Name,
		PreferredGroup,
		email
	}
	Group = string of groupName 
	*/
	let team_list  = mapUsersToGroups(aUsers, aGroups)
	let email_list = aUsers.map((user)=>{
		return user.email;
	}).filter((email)=>{
		return email;
	})
	var email_html_body = ReactDOMServer.renderToString(<OrganisedChaos teams_list={teams_list} />);
	var status = send_mail("Task List !", email_html_body,team_list)
	res.json(team_list)
})

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