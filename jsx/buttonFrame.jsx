var React = require('react');

module.exports = React.createClass( {
  render: function () {
    var disabled, button,
      correct = this.props.correct;

    switch (correct) {
      case true:
        button = (
          <button className="btn btn-success btn-lg"
                  onClick={ this.props.acceptAnswer }
          >
            <span className="glyphicon glyphicon-ok"></span>
          </button>
        )
        break;
      case false:
        button = (
          <button className="btn btn-danger btn-lg" >
            <span className="glyphicon glyphicon-remove"></span>
          </button>
        )
        break;
      default:
        disabled = this.props.selectedNumbers.length === 0;
        button = (
          <button className="btn btn-primary btn-lg"
                  disabled={disabled}
                  onClick = { this.props.checkAnswer }
          >
            =
          </button>
        )
    }

    return (
      <div id="button-frame">
        { button }
        <br/> <br/>
        <botton className="btn btn-warning btn-xs"
                disabled={this.props.redraws == 0}
                onClick={this.props.redraw}
        >
          <span className="glyphicon glyphicon-refresh">
            &nbsp;
            { this.props.redraws }
          </span>
        </botton>
      </div>
    );
  }
});
