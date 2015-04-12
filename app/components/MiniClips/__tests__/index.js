/*global describe, it, expect*/

import React from 'react/addons';
import MiniClips from '../index.jsx';

describe('MiniClips', function () {
  it('displays the component', function () {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <MiniClips />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(
      application, 'MiniClips');

    expect(divs.length).to.equal(1);
  });
});
