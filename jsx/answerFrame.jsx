var React = require('react');

module.exports = React.createClass( {
  render: function () {
    var props = this.props;

    var selectedNumbers = props.selectedNumbers.map(function (i) {
      return (
        <span
          onClick={props.unselectNumber.bind(null, i)}
          key={i}>
          {i}
        </span>
      );
    })

    return (
      <div id="answer-frame">
        <div className="well">
          { selectedNumbers }
        </div>
      </div>
    );
  }
});
