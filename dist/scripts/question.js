(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Question = (function() {
    Question.prototype.state = 'init';

    Question.prototype.el = null;

    Question.prototype.text = null;

    function Question() {
      this.onIntentionSet = __bind(this.onIntentionSet, this);
      this.onStartWriting = __bind(this.onStartWriting, this);
      this.onNoTextOnIntention = __bind(this.onNoTextOnIntention, this);
      this.el = $('#Question');
      this.text = $('#QuestionText');
      this.setListeners();
    }

    Question.prototype.setListeners = function() {
      $('body').on('IntentionSet', this.onIntentionSet);
      $('body').on('NoTextOnIntention', this.onNoTextOnIntention);
      return $('body').on('StartWriting', this.onStartWriting);
    };

    Question.prototype.appear = function() {
      /*
      		this.el.animate(
      			opacity: "1"
      		,
      			queue: false
      			duration: 1100
      		).transition
      			y: "50", duration: 900, easing: 'easeOutQuart'
      */

    };

    Question.prototype.onNoTextOnIntention = function() {
      this.text.text("What's your intention for today?");
      return this.el.animate({
        opacity: "1"
      }, {
        duration: 800
      });
    };

    Question.prototype.onStartWriting = function() {
      this.text.text('My intention for today is...');
      return this.el.animate({
        opacity: "0.3"
      }, {
        duration: 300
      });
    };

    Question.prototype.onIntentionSet = function() {
      this.text.text('My intention for today is...');
      return move('#Question').set('opacity', 1).scale(0.5).translate(0, -180).duration(1100).end();
      /*
      		this.el.animate(
      			opacity: "1"
      		,
      			queue: false
      			duration: 1100
      		).transition(
      			scale: 0.5
      		,
      			duration: 1100
      			queue: false
      		).transition
      			y: "-180", duration: 900, easing: 'easeOutQuart'
      */

    };

    return Question;

  })();

}).call(this);
