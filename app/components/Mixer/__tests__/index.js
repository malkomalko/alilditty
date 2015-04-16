/*global describe, it, expect*/

import React from 'react/addons';
import Mixer from '../index.jsx';

describe('Mixer', function () {
  it('displays the component', function () {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <Mixer />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(
      application, 'Mixer');

    expect(divs.length).to.equal(1);
  });
});
