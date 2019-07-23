import React from 'react';
import { expect } from 'chai';
import Enzyme, { shallow } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';

import RemoteData from '../src/remote-data'

Enzyme.configure({ adapter: new Adapter() })

describe("<RemoteData />", () => {
  function makeComponent(p: () => Promise<string[]>) {
    return <RemoteData<Error, string[]>
        dataFetcher={p}
        notAskedUI={<span className="notAsked">asdf</span>}
        loadingUI={<span className="loading">bla</span>}
        failureUI={(error) => <span className="error">{error.toString()}</span>}
        successUI={(comments) => <ul className="comments">{ comments.map((comment, index) => <li key={index}>{comment}</li>) }</ul>}
      />
  }

  it("starts at the NotAsked state", () => {
    const wrapper = shallow(
      makeComponent(() => Promise.resolve(["asdf"])),
      {disableLifecycleMethods: true})
    expect(wrapper.find(".notAsked")).to.have.lengthOf(1)
  })
  
  it("transitions immediately to the Loading state", () => {
    const wrapper = shallow(
      makeComponent(() => Promise.resolve(["asdf"])));
    expect(wrapper.find(".loading")).to.have.lengthOf(1)
  })
  
  it("transitions to the Loaded state when it receives data", (done) => {
    const wrapper = shallow(
      makeComponent(() => Promise.resolve(["asdf"])));
    setTimeout(() => {
      expect(wrapper.find(".comments")).to.have.lengthOf(1)
      done();
    }, 10);
  })
  
  it("Loading 4", (done) => {
    const wrapper = shallow(
      makeComponent(() => Promise.reject(Error("blah"))));
    setTimeout(() => {
      expect(wrapper.find(".error")).to.have.lengthOf(1)
      done();
    }, 10);
  })
})
