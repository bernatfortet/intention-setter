(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Intention = (function() {
    Intention.prototype.intentionSetDivMarginTop = 140;

    Intention.prototype.string = null;

    Intention.prototype.input = null;

    Intention.prototype.text = null;

    function Intention() {
      this.captureIntention = __bind(this.captureIntention, this);
      this.el = $('#Intention');
      this.input = $('#IntentionInput');
      this.text = $('#IntentionText');
      this.setListeners();
    }

    Intention.prototype.appear = function() {
      return this.el.animate({
        opacity: "1"
      }, {
        queue: false,
        duration: 1100
      }).transition({
        y: "-50",
        duration: 900,
        easing: 'easeOutQuart'
      });
    };

    Intention.prototype.setListeners = function() {
      var _this = this;
      this.input.bind('keydown', jwerty.event('enter', function() {
        console.log('User Presses Enter');
        return _this.captureIntention();
      }));
      return this.input.on('keyup', function() {
        if (_this.input.val().length > 0) {
          app.question.onStartWriting();
        }
        if (_this.input.val() === '') {
          return app.question.onNoTextOnIntention();
        }
      });
    };

    Intention.prototype.setIntention = function(intention) {
      var intentionSetDivPosition;
      this.input.val(intention.string);
      this.input.hide();
      this.text.text(intention.string);
      this.text.show();
      app.question.onIntentionSet();
      intentionSetDivPosition = $('#IntentionText').offset().top - this.intentionSetDivMarginTop;
      $('#IntentionText').transition({
        y: -intentionSetDivPosition,
        duration: 2500,
        easing: 'easeOutQuart'
      });
      return app.background.setBackground(intention.image_url);
    };

    Intention.prototype.captureIntention = function() {
      var intention, intentionString;
      intentionString = $('#IntentionInput').val();
      if (intentionString === '') {
        return;
      }
      intention = {
        string: intentionString,
        time: moment().unix(),
        image_url: app.background.currentImageUrl
      };
      app.db.addIntention(intention);
      return this.setIntention(intention);
    };

    return Intention;

  })();

}).call(this);
