import React, { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = {
    error: null,
    errorInfo: null,
  };

  componentDidCatch(error, errorInfo) {
    this.setState({
      error,
      errorInfo,
    });
  }
  render() {
    if (this.error) {
      return (
        <main>
          <h1>Something broke this application</h1>
          <p>
            {this.state.error.toString()} <br />
            {this.state.errorInfo.componentStack}
          </p>
        </main>
      );
    }
    return this.props.children;
  }
}
