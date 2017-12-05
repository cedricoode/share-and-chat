import React ,{Component} from 'react';
import { WebView } from 'react-native';
import PropTypes from 'prop-types';
import get from 'lodash/get';


class ProgramComponent extends Component {
    constructor(props) {
        super(props);
        this._onNavigatorEvent = this._onNavigatorEvent.bind(this);

    }
    componentWillMount() {
        if (this.props.navigator) {
            this._unsubscribe =
                this.props.navigator.addOnNavigatorEvent(this._onNavigatorEvent);
        }
    }

    componentWillUnmount() {
        this._unsubscribe && this._unsubscribe();
    }

    componentDidMount() {
         this.props.onLoad(); 
    }

    /**
     * The navigator property is an injected dependency of this component,
     * we cannot garantee the existence of nav event handler.
     * To make the configuration clear, normally the relevant handler is injected
     * the same place where the navigator is defined, namely in src/App.js
     * @param {NavigatorEventType} event 
     */
    _onNavigatorEvent(event) {
        get(this.props,
            'chatNavProps.eventHandler',
            () =>{})(event || {id: 'back', type: 'NavBarButtonPress'});
    }

    render() { 
        const {html} = this.props;  
        return    <WebView source={{html : html}} style={{
            flex: 1
        }}/>;
    }
} 

ProgramComponent.propTypes = {
    html: PropTypes.string,
    onLoad: PropTypes.func,
    navigator: PropTypes.object,
    programNavProps: PropTypes.object
};
export default ProgramComponent;