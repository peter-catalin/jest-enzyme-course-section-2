import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import App from './App';

// This is a really basic manner of configuring Enzyme. It could be setup globally with Jest
// when we have multiple test files but for now this is good enough.
Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper component for the App component
 * @function setup
 *
 * @param {object} props - Component props specific to this setup
 * @param {object} state  - Initial state for setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = null) => {
  const wrapper = shallow(<App {...props} />);
  if (state) {
    wrapper.setState(state);
  }
  return wrapper;
};

/**
 * Returns a ShallowWrapper containing node(s) with the fiven data-test value.
 *
 * @param {ShallowWrapper} wrapper  - Enzyme shallow wrapper to search within.
 * @param {string} val - Value of data-test atrribute for search.
 * @returns {ShallowWrapper}
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test='${val}']`);
};

/*
 * The following tests are quite simple and just check if the components end up beeing rendered.
 * We use data attributes to assert if the component is beeing rendered or not.
 */
test('Renders without error', () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, 'component-app');
  expect(appComponent.length).toBe(1);
});

test('Renders increment button', () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, 'increment-button');
  expect(button.length).toBe(1);
});

test('Renders counter display', () => {
  const wrapper = setup();
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.length).toBe(1);
});

test('Renders reset button', () => {
  const wrapper = setup();
  const resetButton = findByTestAttr(wrapper, 'reset-button');
  expect(resetButton.length).toBe(1);
});

/**
 * This is the first test that works with the state as well.
 *
 */
test('The counter starts at 0', () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state('counter');
  expect(initialCounterState).toBe(0);
});

/**
 * We will actually test if the display is modified because we want our test to be as far
 * removed from the actual implementation.
 */
test('Clicking the button increments the counter display', () => {
  // Setup the component with a counter value that is different from the initial one, say 9
  const counter = 9;
  const wrapper = setup(null, { counter });

  // We find the increment button and we click it
  const button = findByTestAttr(wrapper, 'increment-button');
  button.simulate('click');

  // Ask Gimeno why is this neccessary, the test still passes.
  //wrapper.update();

  // We check that the expected value is found in the resulting string
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter + 1);
});

/**
 * These are the tests that are proposed in the challange part of Section 2.
 */
test('Renders decrement button', () => {
  const wrapper = setup();
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  expect(decrementButton.length).toBe(1);
});

test('Clicking the decrement button decrements the counter display', () => {
  // Setup the component with an initial counter of 4
  const counter = 4;
  const wrapper = setup(null, { counter });

  // Find the decrement button and click it
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // Check that the counter display decremented.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain(counter - 1);
});

test('Clicking the decrement button when the counter is 0 shows the error message', () => {
  // Setup the component with an initial state of 0 (this is the default, that's why we don't pass in any state)
  const wrapper = setup();

  // Expect the error element to not be present
  const errorElement = findByTestAttr(wrapper, 'error-element');
  expect(errorElement.length).toBe(0);

  // Find the decrement button and click it
  const decrementButton = findByTestAttr(wrapper, 'decrement-button');
  decrementButton.simulate('click');

  // Search for the error element and expect it to be rendered.
  const errorElementAfterClick = findByTestAttr(wrapper, 'error-element');
  expect(errorElementAfterClick.length).toBe(1);
});

test('When the error message is visible clicking the increment button makes it dissapear', () => {
  // Setup the component with it's initial counter value (0), and with the error flag to true
  const wrapper = setup(null, { error: true });

  // Check that the error message is there (remember that we set the error flag to true in the setup method)
  const errorMessage = findByTestAttr(wrapper, 'error-element');
  expect(errorMessage.length).toBe(1);

  // Find and click the the increment button, afterwards check that the error message has disappeared
  const incrementButton = findByTestAttr(wrapper, 'increment-button');
  incrementButton.simulate('click');
  const errorMessageAfterClick = findByTestAttr(wrapper, 'error-element');
  expect(errorMessageAfterClick.length).toBe(0);
});

test('When the counter is something other than 0 and the reset button is clicked the counter display shows 0', () => {
  // Set up the component with a counter value different from 0.
  const wrapper = setup(null, { counter: 6, error: false });

  // Find the reset button and click it.
  const resetButton = findByTestAttr(wrapper, 'reset-button');
  resetButton.simulate('click');

  // Check that the counter display shows 0.
  const counterDisplay = findByTestAttr(wrapper, 'counter-display');
  expect(counterDisplay.text()).toContain('0');
});

test('When the error message is present, if the reset button is clicked the message error disappears', () => {
  // Set up the component with the error message present
  const wrapper = setup(null, { error: true });

  // Check that the error message is there
  const errorMessage = findByTestAttr(wrapper, 'error-element');
  expect(errorMessage.length).toBe(1);

  // Find and click the reset button
  const resetButton = findByTestAttr(wrapper, 'reset-button');
  resetButton.simulate('click');

  // Check that the message error has disappeared
  const errorMessageAfterClick = findByTestAttr(wrapper, 'error-element');
  expect(errorMessageAfterClick.length).toBe(0);
});
