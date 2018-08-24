import hoistStatics from 'hoist-non-react-statics';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { fromPairs, isFunction, noop } from 'lodash';

// ***********************************************************************************************
// ** TODO: This file needs to be open sourced and registerd on npm and imported from there ******
// ***********************************************************************************************

const getDisplayName = (component) =>
  component.displayName || component.name || 'Component';

// This Higher Order Component has been purposely done in the most manual way that's reasonable
// in order to document what exacly is going on.
export default function withFormHelper(fieldNames = []) {
  // This function is just the outermost layer of the onion. There are 3 layers in total. This layer
  // allows us to configure the component factory.

  return (WrappedComponent) => {
    // This function is the second layer. It's the actual "factory" function that creates the Higher Order Component.
    // It creates the class, and sets up some important things on it, and then returns it.

    class FormHelper extends Component {
      // This is the actual wrapper component class. The innermost layer that surrounds whatever component you've
      // chosen to wrap.
      static propTypes = {
        onFieldChange: PropTypes.func,
        defaultValues: PropTypes.object,
      };

      static defaultProps = {
        onFieldChange: noop,
        defaultValues: {},
      };

      constructor(props) {
        super(props);

        this.state = {
          ...fromPairs(fieldNames.map((n) => [n, ''])),
          ...props.defaultValues,
        };
        this.formSetters = fromPairs(
          fieldNames.map((n) => [
            `${n}Setter`,
            this.updateFormField.bind(this, n),
          ]),
        );
        this.formSetters.updateFormField = this.updateFormField.bind(this);
        this.dirty = false;
      }

      componentWillReceiveProps(newProps) {
        if (this.dirty) return;
        const newState = {
          ...fromPairs(fieldNames.map((n) => [n, ''])),
          ...newProps.defaultValues,
        };
        this.setState(newState);
      }

      unwrapEvent(possiblyEvent) {
        if (
          // Can't use _.get here because it's a proxy
          possiblyEvent != null &&
          possiblyEvent.target != null
        ) {
          return possiblyEvent.target.value || '';
        }
        return possiblyEvent;
      }

      updateFormField(fieldName, _value) {
        this.dirty = true;
        const value = this.unwrapEvent(_value);

        this.setState({ [fieldName]: value });
        if (isFunction(this.props.onFieldChange)) {
          this.props.onFieldChange({
            ...this.state,
            [fieldName]: value,
          });
        }
      }

      render() {
        // All we're really doing here is passing props through that were handed to us from above,
        // and adding in a couple more props of our own to support the functionality that this particular
        // Higher Order Component provides.
        return (
          <WrappedComponent
            formValues={this.state}
            formSetters={this.formSetters}
            {...this.props}
          />
        );
      }
    }

    // Convenience in case we need to know from anywhere.
    FormHelper.WrappedComponent = WrappedComponent;
    // For the dev tools extension. So the name actually makes sense.
    FormHelper.displayName = `FormHelper(${getDisplayName(WrappedComponent)})`;

    // hoistStatics just copies any non-react static vars up into our wrapper component so that stuff doens't break.
    return hoistStatics(FormHelper, WrappedComponent);
  };
}
