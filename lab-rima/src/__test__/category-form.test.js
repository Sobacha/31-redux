import React from 'react';
import Enzyme from 'enzyme';
import { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
require('jest');

Enzyme.configure({adapter: new Adapter()});
import CategoryForm from '../components/category-form/index';
import Dashboard from '../components/dashboard/index';


describe('CategoryForm component', () => {

  test('initial state', () => {
    let mountedCategoryForm = mount(<CategoryForm />);

    expect(mountedCategoryForm.state('name')).toEqual('');
    expect(mountedCategoryForm.state('budget')).toEqual(0);
  });

  test('handleChange: should change state when input value changes', () => {
    const form = mount(<CategoryForm />);
    const inputName = form.find('.name');
    const inputBudget = form.find('.budget');
    inputName.instance().value = 'Test name';
    inputName.simulate('change');
    inputBudget.instance().value = 100;
    inputBudget.simulate('change');

    expect(form.state().name).toEqual('Test name');
    expect(form.state().budget).toEqual(100);
  });

  test('handleSubmit: should save a new category in categorys in dashboard state when save button is clicked', () => {
    const dashboard = mount(<Dashboard />);
    const form = mount(<CategoryForm handleAddCategory={dashboard.instance().handleAddCategory}/>);
    const inputName = form.find('.name');
    const inputBudget = form.find('.budget');
    inputName.instance().value = 'Test name2';
    inputName.simulate('change');
    inputBudget.instance().value = 200;
    inputBudget.simulate('change');
    form.simulate('submit');

    expect(dashboard.state().categorys[0].name).toEqual('Test name2');
    expect(dashboard.state().categorys[0].budget).toEqual(200);
  });

});
