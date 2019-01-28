import React, {Component} from 'react';

class Items extends Component {
  render () {
    const { item, changeRepo } = this.props;

    return (
        <li className="item" onClick={changeRepo} data-repo={item.name} >{item.name}</li>
    )
  }
}
export default Items;