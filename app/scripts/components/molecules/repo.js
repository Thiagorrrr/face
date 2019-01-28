import React, {Component} from 'react';
import {Star, Fork} from '../svgs/svgs'
import Commits from '../molecules/commits';

class Repo extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: {},
          repository: {}
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
        const {repository}= this.props
        const apiRepositor =  `https://api.github.com/repos/facebook/${repository}`;    
        this.connection(apiRepositor)
    }

    componentDidMount() {
        this.getContent()
    }

    shouldComponentUpdate(nextProps, nextState){
        if (this.props.repository === nextProps.repository) {
            this.getContent()
          }
        return true;
    }
    
   
    render () {
        const { content} = this.state;
        return (
            <div className="repository"> 
                <div className="repository__content">
                    <h2 className="repository__title">{content.name}</h2>
                    <div className="repository__content-count">
                        <Star/>
                        <span className="repository__count-name">Stars:</span> <span className="repository__count">{content.stargazers_count}</span>
                    </div>
                    <div className="repository__content-count">
                        <Fork/>
                        <span className="repository__count-name">Forks:</span> <span className="repository__count">{content.forks}</span>
                    </div>
                </div>
                <Commits repository={this.props.repository}/>
            </div>
        )
    }
}
export default Repo;
