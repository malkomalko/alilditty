/*global describe, it, expect*/

import React from 'react/addons';
import Modal from '../index.jsx';

describe('Modal', function () {
  it('displays the component', function () {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <Modal />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(
      application, 'Modal');

    expect(divs.length).to.equal(1);
  });
});
