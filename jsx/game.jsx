var React = require('react');
var ReactDOM = require('react-dom')

var StarsFrame = require('./starsFrame.jsx');
var ButtonFrame = require('./buttonFrame.jsx');
var AnswerFrame = require('./answerFrame.jsx');
var NumbersFrame = require('./numbersFrame.jsx');
var DoneFrame = require('./doneFrame.jsx');

var possibleCombinationSum = function(arr, n) {
  if (arr.indexOf(n) >= 0) { return true; }
  if (arr[0] > n) { return false; }
  if (arr[arr.length - 1] > n) {
    arr.pop();
    return possibleCombinationSum(arr, n);
  }
  var listSize = arr.length, combinationsCount = (1 << listSize)
  for (var i = 1; i < combinationsCount ; i++ ) {
    var combinationSum = 0;
    for (var j=0 ; j < listSize ; j++) {
      if (i & (1 << j)) { combinationSum += arr[j]; }
    }
    if (n === combinationSum) { return true; }
  }
  return false;
};

var Game = React.createClass( {
  getInitialState: function() {
    return {
      numberOfStars: this.randomNumber(),
      selectedNumbers: [],
      usedNumbers: [],
      redraws: 5,
      correct: null,
      doneStatus: null
    };
  },

  resetGame: function() {
    this.replaceState(this.getInitialState());
  },

  randomNumber: function () {
    return Math.floor(Math.random()*9) + 1;
  },

  selectNumber: function(clickedNumber) {
    var state = this.state;


    if(state.usedNumbers.indexOf(clickedNumber) === -1) {
      state.selectedNumbers.push(clickedNumber);
      state.correct = null;
      this.setState(state);
    }
  },

  unselectNumber: function(clickedNumber) {
    var selectedNumbers = this.state.selectedNumbers,
      idx = selectedNumbers.indexOf(clickedNumber);

    selectedNumbers.splice(idx, 1);

    this.setState({
      selectedNumbers: selectedNumbers,
      correct: null
    });
  },

  sumOfSelectedNumbers: function() {
    return this.state.selectedNumbers.reduce(function (p, n) {
      return p + n;
    }, 0);
  },

  checkAnswer: function () {
    var correct = (this.state.numberOfStars ===
                    this.sumOfSelectedNumbers());
    this.setState({correct: correct});
  },

  acceptAnswer: function() {
    var usedNumbers = this.state.usedNumbers.concat(this.state.selectedNumbers);
    var self = this;

    this.setState({
      selectedNumbers: [],
      usedNumbers: usedNumbers,
      correct: null,
      numberOfStars: this.randomNumber()
    }, function() {
      self.updateDoneStatus();
    })
  },

  redraw: function () {
    var self = this;

    if(this.state.redraws > 0) {
      this.setState({
        selectedNumbers: [],
        correct: null,
        numberOfStars: this.randomNumber(),
        redraws: this.state.redraws - 1
      }, function() {
        self.updateDoneStatus();
      });
    }
  },

  possibleSolution: function () {
    var numberOfStars = this.state.numberOfStars,
      possibleNumbers = [],
      usedNumbers = this.state.usedNumbers;

    for(var i = 1; i <= 9; i++){
      if(usedNumbers.indexOf(i) < 0){
        possibleNumbers.push(i);
      }
    }

    return possibleCombinationSum(possibleNumbers, numberOfStars);
  },

  updateDoneStatus: function() {
    if(this.state.usedNumbers.length === 9) {
      this.setState({
        doneStatus: 'Done. Nice!'
      });

      return;
    }

    if (this.state.redraws === 0 && !this.possibleSolution()) {
      this.setState({
        doneStatus: 'Game Over!'
      });
    }
  },

  render: function () {
    var selectedNumbers = this.state.selectedNumbers,
      correct = this.state.correct,
      usedNumbers = this.state.usedNumbers,
      redraws = this.state.redraws,
      doneStatus = this.state.doneStatus,
      bottomFrame
      ;

    if(doneStatus) {
      bottomFrame = <DoneFrame doneStatus = { doneStatus }
                               resetGame = { this.resetGame } />
    } else {
      bottomFrame = <NumbersFrame selectedNumbers = { selectedNumbers }
                                  usedNumbers = { usedNumbers }
                                  selectNumber = { this.selectNumber } />
    }

    return (
      <div id="game">
        <h2>Play Nine</h2>
        <hr />
        <div className="clearfix" >
          <StarsFrame numberOfStars = { this.state.numberOfStars } />
          <ButtonFrame selectedNumbers = { selectedNumbers }
                       correct = { correct }
                       checkAnswer = { this.checkAnswer }
                       acceptAnswer = { this.acceptAnswer }
                       redraw = { this.redraw }
                       redraws = { redraws }
          />
          <AnswerFrame selectedNumbers = { selectedNumbers }
                       unselectNumber = { this.unselectNumber }
          />
        </div>

        {bottomFrame}

      </div>
    );
  }
});

ReactDOM.render(
  <Game />,
  document.getElementById('container')
  );