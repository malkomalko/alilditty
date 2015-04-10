/*global describe, it, expect*/

import React from 'react/addons';
import Application from '../index.jsx';

describe('Application', function () {
  it('displays the component', function () {
    const TestUtils = React.addons.TestUtils;

    const application = TestUtils.renderIntoDocument(
      <Application />
    );

    const divs = TestUtils.scryRenderedDOMComponentsWithClass(
      application, 'Application');

    expect(divs.length).to.equal(1);
  });
});
