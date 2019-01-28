import React, {Component} from 'react';

class Commits extends Component {
    constructor(props) {
        super(props);
        this.state = {
          content: [],
          repository: {},
          page: 10
        };
        this.loadMore = this.loadMore.bind(this)
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
        const apiRepositor =  `https://api.github.com/repos/facebook/${repository}/commits?per_page=${this.state.page}`;
        this.connection(apiRepositor)
    }
    loadMore(){
        this.setState({page: this.state.page + 10})
        this.getContent()
    }
    componentDidMount() {
        this.getContent()
    }
    componentWillReceiveProps() {
        this.getContent()
    }
    render () {
        const { content} = this.state;
        return (
            <div className= "commits">
                <h2 className="commits__title">Commits</h2>
                <ul>
                    {
                        content.map((item) =>
                            <li className= "commits__list-user" key={item.sha}>
                                <div className="commits__wrapper">
                                 {
                                    item.author &&
                                    <img className="commits__img" src={item.author.avatar_url} alt={item.commit.author.name}/>
                                }
                                    <span className="commits__name">{item.commit.author.name}</span>
                                </div>
                                <h3 className="commits__description">
                                    {item.commit.message}
                                </h3>
                            </li>
                        )
                    }
                </ul>
                <div className="commits__wrapper-btn">
                    <button className="commits__btn" onClick={this.loadMore}>ver mais</button>
                </div>
            </div>
        )
    }
}
export default Commits;
