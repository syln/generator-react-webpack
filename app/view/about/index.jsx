import React from 'react';
import Search from '../../components/SearchBox';
import Plist from '../../components/plist';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.less';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {"keyword": ""};
    this.refreshKeyword = this.refreshKeyword.bind(this);
  }

  refreshKeyword(name) {
    this.setState({"keyword": name});
  }

  render() {
    return (
      <div className="container">
        <section className="jumbotron">
          <h3 className="jumbotron-heading">Search Github Users</h3>
          <Search sendAction={this.refreshKeyword}/>
        </section>
        <h2>123</h2>
        <Plist keyword={this.state.keyword}/>
      </div>
    );
  }
}

const app = document.createElement('div');
document.body.appendChild(app);
ReactDOM.render(<App />, app);
