import React from 'react';
import {connect} from 'react-redux';
import {categoryUpdate} from '../../action/category-action';
import CategoryForm from '../category-form/index';
import {renderIf} from '../../lib/utils';


class CategoryItem extends React.Component{
  constructor(props){
    super(props);

    this.state = {
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
    this.props.onClick(this.props.categoryItem);
  }

  handleDoubleClick(event) {
    event.preventDefault();
    this.setState({editing: true});
  }

  render(){
    return <li
      key={this.props.key}
      onDoubleClick={this.handleDoubleClick}
    >
      <p>{this.props.categoryItem.name}: {this.props.categoryItem.budget}</p>

      <button
        className="delete"
        onClick={this.handleClick}>
          Delete
      </button>

      {renderIf(this.state.editing,
        <CategoryForm
          editing={this.handleGetSetState()}
          category={this.props.categoryItem}
          buttonText='update'
          onComplete={this.props.categoryItemCategoryUpdate} />
      )}
    </li>;
  }
}

const mapStateToProps = state => ({
  categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  categoryItemCategoryUpdate: category => dispatch(categoryUpdate(category)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoryItem);
