import React from 'react';
import {connect} from 'react-redux';
import {categoryUpdate} from '../../action/category-action';
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

  handleClick(event) {
    event.preventDefault();
    this.props.onClick(this.state.category);
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
          <CategoryForm
            category={this.props.category}
            buttonText='update'
            onComplete={this.props.noteItemCategoryUpdate} />
        )}
      </li>
    );
  }
}

const mapStateToProps = state => ({
  category: state.category
});

const mapDispatchToProps = (dispatch, getState) => ({
  noteItemCategoryUpdate: category => dispatch(categoryUpdate(category)),
});

export default (mapStateToProps, mapDispatchToProps)(CategoryItem);
