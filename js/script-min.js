var possibleCombinationSum=function(a,b){if(a.indexOf(b)>=0)return!0;if(a[0]>b)return!1;if(a[a.length-1]>b)return a.pop(),possibleCombinationSum(a,b);for(var c=a.length,d=1<<c,e=1;d>e;e++){for(var f=0,g=0;c>g;g++)e&1<<g&&(f+=a[g]);if(b===f)return!0}return!1},StarsFrame=React.createClass({displayName:"StarsFrame",render:function(){for(var a=[],b=0;b<this.props.numberOfStars;b++)a.push(React.createElement("span",{className:"glyphicon glyphicon-star"}));return React.createElement("div",{id:"stars-frame"},React.createElement("div",{className:"well"},a))}}),ButtonFrame=React.createClass({displayName:"ButtonFrame",render:function(){var a,b,c=this.props.correct;switch(c){case!0:b=React.createElement("button",{className:"btn btn-success btn-lg",onClick:this.props.acceptAnswer},React.createElement("span",{className:"glyphicon glyphicon-ok"}));break;case!1:b=React.createElement("button",{className:"btn btn-danger btn-lg"},React.createElement("span",{className:"glyphicon glyphicon-remove"}));break;default:a=0===this.props.selectedNumbers.length,b=React.createElement("button",{className:"btn btn-primary btn-lg",disabled:a,onClick:this.props.checkAnswer},"=")}return React.createElement("div",{id:"button-frame"},b,React.createElement("br",null)," ",React.createElement("br",null),React.createElement("botton",{className:"btn btn-warning btn-xs",disabled:0==this.props.redraws,onClick:this.props.redraw},React.createElement("span",{className:"glyphicon glyphicon-refresh"}," ",this.props.redraws)))}}),AnswerFrame=React.createClass({displayName:"AnswerFrame",render:function(){var a=this.props,b=a.selectedNumbers.map(function(b){return React.createElement("span",{onClick:a.unselectNumber.bind(null,b)},b)});return React.createElement("div",{id:"answer-frame"},React.createElement("div",{className:"well"},b))}}),NumbersFrame=React.createClass({displayName:"NumbersFrame",render:function(){for(var a,b=[],c=this.props.selectNumber,d=this.props.usedNumbers,e=this.props.selectedNumbers,f=1;10>f;f++)a="number selected-"+(e.indexOf(f)>=0),a+=" used-"+(d.indexOf(f)>=0),b.push(React.createElement("div",{className:a,onClick:c.bind(null,f)},f));return React.createElement("div",{id:"numbers-frame"},React.createElement("div",{className:"well"},b))}}),DoneFrame=React.createClass({displayName:"DoneFrame",render:function(){return React.createElement("div",{className:"well text-center"},React.createElement("h2",null,this.props.doneStatus),React.createElement("button",{className:"btn btn-default",onClick:this.props.resetGame},"Play again"))}}),Game=React.createClass({displayName:"Game",getInitialState:function(){return{numberOfStars:this.randomNumber(),selectedNumbers:[],usedNumbers:[],redraws:5,correct:null,doneStatus:null}},resetGame:function(){this.replaceState(this.getInitialState())},randomNumber:function(){return Math.floor(9*Math.random())+1},selectNumber:function(a){var b=this.state;b.selectedNumbers.push(a),b.correct=null,this.setState(b)},unselectNumber:function(a){var b=this.state.selectedNumbers,c=b.indexOf(a);b.splice(c,1),this.setState({selectedNumbers:b,correct:null})},sumOfSelectedNumbers:function(){return this.state.selectedNumbers.reduce(function(a,b){return a+b},0)},checkAnswer:function(){var a=this.state.numberOfStars===this.sumOfSelectedNumbers();this.setState({correct:a})},acceptAnswer:function(){var a=this.state.usedNumbers.concat(this.state.selectedNumbers),b=this;this.setState({selectedNumbers:[],usedNumbers:a,correct:null,numberOfStars:this.randomNumber()},function(){b.updateDoneStatus()})},redraw:function(){var a=this;this.state.redraws>0&&this.setState({selectedNumbers:[],correct:null,numberOfStars:this.randomNumber(),redraws:this.state.redraws-1},function(){a.updateDoneStatus()})},possibleSolution:function(){for(var a=this.state.numberOfStars,b=[],c=this.state.usedNumbers,d=1;9>=d;d++)c.indexOf(d)<0&&b.push(d);return possibleCombinationSum(b,a)},updateDoneStatus:function(){return 9===this.state.usedNumbers.length?void this.setState({doneStatus:"Done. Nice!"}):(0!==this.state.redraws||this.possibleSolution()||this.setState({doneStatus:"Game Over!"}),void console.log(this.state.redraws))},render:function(){var a,b=this.state.selectedNumbers,c=this.state.correct,d=this.state.usedNumbers,e=this.state.redraws,f=this.state.doneStatus;return a=f?React.createElement(DoneFrame,{doneStatus:f,resetGame:this.resetGame}):React.createElement(NumbersFrame,{selectedNumbers:b,usedNumbers:d,selectNumber:this.selectNumber}),React.createElement("div",{id:"game"},React.createElement("h2",null,"Play Nine"),React.createElement("hr",null),React.createElement("div",{className:"clearfix"},React.createElement(StarsFrame,{numberOfStars:this.state.numberOfStars}),React.createElement(ButtonFrame,{selectedNumbers:b,correct:c,checkAnswer:this.checkAnswer,acceptAnswer:this.acceptAnswer,redraw:this.redraw,redraws:e}),React.createElement(AnswerFrame,{selectedNumbers:b,unselectNumber:this.unselectNumber})),a)}});React.render(React.createElement(Game,null),document.getElementById("container"));