var React = require('react');

module.exports = StarsFrame = React.createClass( {
  render: function () {
    var stars = [];

    for (var i = 0; i < this.props.numberOfStars; i++) {
      stars.push(
        <span className="glyphicon glyphicon-star"
              key={i}
        >

        </span>
      );
    }

    return (
      <div id="stars-frame">
        <div className="well">
          {stars}
        </div>
      </div>
    );
  }
});
