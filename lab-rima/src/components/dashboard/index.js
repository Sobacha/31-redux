import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate, categoryDelete} from '../../actions/category-actions';
import CategoryForm from '../category-form/index';
import CategoryItem from '../category-item/index';


class Dashboard extends React.Component{

  render(){
    return(
      <section>
        <h1>Budget Tracker</h1>

        <CategoryForm
          buttonText='create'
          onComplete={this.props.dashboardCategoryCreate} />

        <ul>
          {this.props.categories ?
            this.props.categories.map(category => {
              return <CategoryItem 
                key={category.id}
                category={category}
                onClick={this.props.dashboardCategoryDelete} />
            });
            :
            undefined
          }
        </ul>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  categories: state,
});

const mapDispatchToProps = (dispatch, getState) => ({
  dashboardCategoryCreate: category => {dispatch(categoryCreate(category))},
  dashboardCategoryDelete: category => {dispatch(categoryDelete(category))},
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
