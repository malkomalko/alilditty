/*global describe, it, expect*/

import React from 'react/addons';
import ClipSequencer from '../index.jsx';

describe('ClipSequencer', function () {
  it('displays the component', function () {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <ClipSequencer />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(
      application, 'ClipSequencer');

    expect(divs.length).to.equal(1);
  });
});
