import React, {Component} from 'react'

class MySelect extends Component{ 
	render(){
		return(
		<select value="coconut" onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
        </select>
          );
	}
    
};

export default MySelect; 