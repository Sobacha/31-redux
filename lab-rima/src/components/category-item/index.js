import React from 'react';
import CategoryForm from '../category-form/index';
import { renderIf } from '../../lib/utils';


class CategoryItem extends React.Component{
  constructor(props){
    super(props);

    this.state = {
      category: this.props.category,
      editing: false,
    };

    let memberFunctions = Object.getOwnPropertyNames(CategoryItem.prototype);
    for(let functionName of memberFunctions){
      if(functionName.startsWith('handle')){
        this[functionName] = this[functionName].bind(this);
      }
    }
  }

  handleGetSetState() {
    return {
      state: this.state,
      setState: this.setState.bind(this),
    };
  }

  handleClick(event) {
    event.preventDefault();
    this.props.handleRemoveCategory(this.props.category);
  }

  handleDoubleClick(event) {
    event.preventDefault();
    this.setState({editing: true});
  }

  render(){
    return(
      <li
        key={this.props.category.id}
        onDoubleClick={this.handleDoubleClick}
      >
        <p>{this.props.category.name}: {this.props.category.budget}</p>
        <button
          className="delete"
          onClick={this.handleClick}>
          Delete
        </button>

        {renderIf(this.state.editing,
          <CategoryForm categoryItem={this.handleGetSetState()} handleUpdateCategory={this.props.handleUpdateCategory} />
        )}
      </li>
    );
  }
}

export default CategoryItem;
