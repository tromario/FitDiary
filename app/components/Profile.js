import React from 'react';

export default class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
    this.timerId = setInterval(
      () => this.tick(),
      1000
    );
  }

  tick() {
    this.setState({date: new Date()});
  }

  componentWillUnmount() {
    clearInterval(this.timerId);
  }

  render() {
    return (
      <div>
        <h1>Добро пожаловать, {this.props.name}!</h1>
        <h2>Текущее время: {this.state.date.toLocaleTimeString()}</h2>
      </div>
    );
  }
}

Profile.defaultProps = { name: "Роман" };
