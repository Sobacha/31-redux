import React from 'react';
import {connect} from 'react-redux';
import {categoryCreate} from '../../actions/category-actions';
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
              return <CategoryItem key={category.id} category={category} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
