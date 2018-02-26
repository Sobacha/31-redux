import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('jest');

Enzyme.configure({adapter: new Adapter()});
import CategoryItem from '../components/category-item/index';
import Dashboard from '../components/dashboard/index';


describe('CategoryItem component', () => {

  test('initial state', () => {
    const mockCategory = {name: 'test name', budget: 100, id: 1};
    const dashboard = mount(<Dashboard />);
    dashboard.setState({categorys: [mockCategory]});
    const categoryitem = mount(<CategoryItem key={mockCategory.id} category={mockCategory} handleRemoveCategory={dashboard.instance().handleRemoveCategory} />);

    expect(categoryitem.state('editing')).toEqual(false);
    expect(dashboard.state('categorys')).toEqual([mockCategory]);
  });

  test('handleClick: should remove a category from categorys in dashboard state when delete button is clicked', () => {
    const mockCategory = {name: 'test name1', budget: 200, id: 2};
    const dashboard = mount(<Dashboard />);
    dashboard.setState({categorys: [mockCategory]});
    const categoryitem = mount(<CategoryItem key={mockCategory.id} category={mockCategory} handleRemoveCategory={dashboard.instance().handleRemoveCategory} />);

    expect(dashboard.state('categorys')).toEqual([mockCategory]);

    categoryitem.find('.delete').simulate('click');

    expect(dashboard.state().categorys).toEqual([]);
  });

});
