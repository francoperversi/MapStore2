const PropTypes = require('prop-types');
/**
 * Copyright 2016, GeoSolutions Sas.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */
const React = require('react');
const Debug = require('../../../components/development/Debug');
const Localized = require('../../../components/I18N/Localized');
const {connect} = require('react-redux');
const {LoginPlugin} = require('../../../plugins/Login');
const {Jumbotron} = require('react-bootstrap');

class Login extends React.Component {
    static propTypes = {
        messages: PropTypes.object,
        locale: PropTypes.string,
        security: PropTypes.object,
        enabled: PropTypes.bool
    };

    renderGroups = () => {
        if (!this.props.security || !this.props.security.user) {
            return null;
        }
        let groups = this.props.security.user.groups.group.length ? this.props.security.user.groups.group : [this.props.security.user.groups.group];
        return (<div> your groups: <ul>
            {groups.map((group) => {return <li>{group.groupName}</li>; })}
        </ul></div>);
    };

    render() {
        return (<Localized messages={this.props.messages} locale={this.props.locale}>
            <div className="fill">
                    <div style={{textAlign: "right"}}><LoginPlugin /></div>
                    <Jumbotron style={{position: "absolute", bottom: 0, left: 0, right: 0, top: "35px"}}>
                    <h1>Hello, {this.props.security && this.props.security.user && this.props.security.user.name || "Guest user. Please login"}</h1>
                    <p>This is a sample of the login functionality.</p>
                    <p>{this.renderGroups()}</p>
                  </Jumbotron>
                <Debug/>
            </div>
        </Localized>);
    }
}

module.exports = connect((state) => {
    return {
        locale: state.locale && state.locale.current,
        messages: state.locale && state.locale.messages || {},
        security: state.security
    };
})(Login);
