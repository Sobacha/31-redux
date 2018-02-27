import React from 'react';
import {connect} from 'react-redux';
import {categoryUpdate} from '../../action/category-action';
import CategoryForm from '../category-form/index';
import {renderIf} from '../../lib/utils';


class CategoryItem extends React.Component{
  constructor(props){
    console.log('item constructor');
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
    console.log('item render');
    return <li
        key={this.props.key}
        onDoubleClick={this.handleDoubleClick}
      >
        <p>{this.state.category.name}: {this.state.category.budget}</p>

        <button
          className="delete"
          onClick={this.handleClick}>
          Delete
        </button>

        {renderIf(this.state.editing,
          <CategoryForm
            category={this.state.category}
            buttonText='update'
            onComplete={this.props.categoryItemCategoryUpdate} />
        )}
      </li>
  }
}

const mapStateToProps = state => ({
  category: state
});

const mapDispatchToProps = (dispatch, getState) => ({
  categoryItemCategoryUpdate: category => dispatch(categoryUpdate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
