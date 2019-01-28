import React, { Component } from 'react';
import Menu from '../molecules/menu';
import Repo from '../molecules/repo';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      repository: {},
      close: ' '
    };
    this.changeRepo = this.changeRepo.bind(this)
    this.navigation = this.navigation.bind(this)
  }
  changeRepo(e) {
    this.setState({repository: e.target.getAttribute('data-repo')})
    this.navigation();
  }

  navigation(){
    this.setState({
      close: (this.state.close === ' ') ? 'true' : ' '
    })
  }
  render () {
    const {repository, close}= this.state
    return (
      <div className="content">
        <Menu changeRepo={this.changeRepo} close={close} navigation={this.navigation}/>
        
        { repository.length > 0 ?
          <Repo
          repository={repository}
        /> : null
        }
      </div>
    )
  }
}
export default App;