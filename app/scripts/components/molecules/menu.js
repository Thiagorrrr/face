import React, {Component} from 'react';
import Item from '../atoms/Items';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: [],
      contentRepo: []
    }; 
  }

  connection(api) {
    fetch(api)
    .then(response => response.json())
    .then((data) => {
      this.setState({content: data});
    }).catch((error) => {
        console.error(error,"Carregamento da Api falhou!")
    });
  }
  getContent() {
    const api = 'https://api.github.com/orgs/facebook/repos';
     
    this.connection(api);     
  }
  componentDidMount() {
    this.getContent()
  }

  render () {
    const { changeRepo, close , navigation} = this.props;
    const { content } = this.state;
    return (
      <div className={`menu ${close}`}>
        <div className="menu__navigation" onClick={navigation}>
          <div className={`menu__wrapper ${close}`}>
            <span className={`menu__burguer ${close}`}></span>
          </div>
        </div>
          <ul className={`menu__ul ${close}`} key={content.id}>
          {
            content.length > 0 ? 
            content.map((item) => <Item changeRepo={changeRepo} key={item.id} item={item}/> ) : null
          }
        </ul>
      </div>
    )
  }
}
export default Menu;
