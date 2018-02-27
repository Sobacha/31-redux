import React from 'react';
import {renderIf} from '../../lib/utils';

class CategoryForm extends React.Component{
  constructor(props){
    super(props);

    this.state = this.props.category ? this.props.category :
      {
        name: '',
        budget: 0,
      };

    let memberFunctions = Object.getOwnPropertyNames(CategoryForm.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleChange(event){
    let {name, value} = event.target;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.onComplete(this.state);

    this.setState({
      name: '',
      budget: 0,
    });
  }

  handleClick(event){
    event.preventDefault();

    this.props.editing.setState({editing: false});

    this.setState({
      name: '',
      budget: 0,
    });
  }

  render(){
    return(
      <form
        className="category-form"
        onSubmit={this.handleSubmit}
        id="category-form">

        <input
          className="name"
          type="text"
          name="name"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder="Enter a name"/>

        <input
          className="budget"
          type="number"
          name="budget"
          value={this.state.budget}
          onChange={this.handleChange}/>

        <button
          className="save"
          type="submit">
          {this.props.buttonText}
        </button>

        {renderIf(this.props.editing,
          <button
            className="cancel"
            type="button"
            onClick={this.handleClick}>
            cancel
          </button>
        )}
      </form>
    );
  }
}

export default CategoryForm;
