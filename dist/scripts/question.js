(function() {
  this.Question = (function() {
    Question.prototype.state = 'init';

    Question.prototype.el = null;

    Question.prototype.text = null;

    function Question() {
      this.el = $('#Question');
      this.text = $('#QuestionText');
    }

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

    Question.prototype.onIntentionSet = function() {
      this.text.text('My intention for today is...');
      return this.el.animate({
        opacity: "1"
      }, {
        queue: false,
        duration: 1100
      }).transition({
        scale: 0.5
      }, {
        duration: 1100,
        queue: false
      }).transition({
        y: "-180",
        duration: 900,
        easing: 'easeOutQuart'
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

    return Question;

  })();

}).call(this);
