/*global describe, it, expect*/

import React from 'react/addons';
import KeysVisualizer from '../index.jsx';

describe('KeysVisualizer', function () {
  it('displays the component', function () {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <KeysVisualizer />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(
      application, 'KeysVisualizer');

    expect(divs.length).to.equal(1);
  });
});
