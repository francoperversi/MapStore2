/*
 * Copyright 2019, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import { createSink } from 'recompose';
import expect from 'expect';

// config for recompose usage of RXJS
import rxjsconfig from 'recompose/rxjsObservableConfig';
import { setObservableConfig } from 'recompose';
import currentPageSectionManager from '../currentPageSectionManager';

import STORY from 'json-loader!../../../../../../test-resources/geostory/sampleStory_1.json';
const contents = STORY.sections[1].contents;

setObservableConfig(rxjsconfig);

describe('currentPageSectionManager enhancer', () => {
    beforeEach((done) => {
        document.body.innerHTML = '<div id="container"></div>';
        setTimeout(done);
    });
    afterEach((done) => {
        ReactDOM.unmountComponentAtNode(document.getElementById("container"));
        document.body.innerHTML = '';
        setTimeout(done);
    });
    it('rendering with defaults', (done) => {
        const Sink = currentPageSectionManager(createSink( props => {
            expect(props).toExist();
            done();
        }));
        ReactDOM.render(<Sink />, document.getElementById("container"));
    });

    it('calls updateCurrentPage when onVisibilityChange is called', done => {
        const actions = {
            updateCurrentPage: () => {}
        };
        const spyCallback = expect.spyOn(actions, 'updateCurrentPage');
        const Sink = currentPageSectionManager(createSink(props => {
            expect(props).toExist();
            // first render, trigger onVisibility change to make the background to be 1
            props.onVisibilityChange({ id: contents[1].id, visible: true, entry: {intersectionRatio: 1} });
            expect(spyCallback).toHaveBeenCalled();
            expect(spyCallback.calls[0].arguments[0].sectionId).toBe(contents[1].id);
            done();
        }));
        ReactDOM.render(<Sink updateCurrentPage={actions.updateCurrentPage} contents={contents} />, document.getElementById("container"));
    });
});
