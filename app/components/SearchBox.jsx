import React from 'react';
import ReactDOM from 'react-dom';
import Button from 'antd/lib/button';

export default class Search extends React.Component{
  constructor(props){
    super(props);
    this.handleSearch = this.handleSearch.bind(this);
  }
  handleSearch(){
    let name = ReactDOM.findDOMNode(this.refs.name).value;
    if(name === ''){
      return;
    }
    this.props.sendAction(name);
  }
  render(){
    return (
      <div>
        <input type='text' ref='name' placeholder='enter the name you wanna search' />
        <Button onClick={this.handleSearch}>搜索</Button>
      </div>
    )
  }
}
