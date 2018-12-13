express = require('express')
app = express()
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
const PORT = 8080

app.get('/test/service', (req, res)=> {
	console.log('get msg')
	res.json([{
		'id' : 1, 'name' : 'John'
	}])
})
app.listen(PORT, (msg)=>console.log('server listening at'+ PORT + msg))

app.post('/fetch_groups',function(req,res){
	let aUsers = req.body.Users
	console.log(JSON.stringify(req.body));
	let aGroups = req.body.Groups
	/*
	User = {
		Name,
		PreferredGroup,
		email
	}
	Group = string of groupName 
	*/
	res.json(mapUsersToGroups(aUsers,aGroups))

})

function mapUsersToGroups(aUsers,aGroups){
	console.log(JSON.stringify(aUsers))
	console.log(JSON.stringify(aGroups))
	let max_group_size = Math.ceil(aUsers.length/aGroups.length)
	console.log(max_group_size)
	var oGroupUserMap = {
		// groupName : [user1_obj, user2_obj]
	}
	// initialize mapping object for user2group 
	for(var group_index in aGroups){
		oGroupUserMap[aGroups[group_index]] = []
	}

	shuffleArray(aUsers)
	aUsers.sort(function(user1,user2){
		if( (user1.PreferredGroup && user2.PreferredGroup) || (!user2.PreferredGroup && !user1.PreferredGroup) ){
			return 0
		}else if(user1.PreferredGroup && (!user2.PreferredGroup)){
			return 1
		}else {
			return -1
		}
	})
	var user_index = aUsers.length
	while(user_index-- > 0 ){
		var oCurrentUser = aUsers[user_index]
		if(oCurrentUser.PreferredGroup && oGroupUserMap[oCurrentUser.PreferredGroup].length < max_group_size){
			// case : user has a preffered group and the preffered group has not reached its maximum groups size
			oGroupUserMap[oCurrentUser.PreferredGroup].push(oCurrentUser)
		}else{
			// case : user has no preffered groups or max groups size has reached for the group
			// hence we pick a random group and assign the current user to that group
			var random_group_name;
			do{
				random_group_name = aGroups[Math.floor(Math.random()*aGroups.length)]; 
			}while(oGroupUserMap[random_group_name].length >= max_group_size)
			oGroupUserMap[random_group_name].push(oCurrentUser) 
		}
	}
	console.log(oGroupUserMap)
	return oGroupUserMap

}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}