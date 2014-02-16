(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.App = (function() {
    App.prototype.debug = true;

    function App() {
      this.showElements = __bind(this.showElements, this);
      this.background = new Background();
      this.db = new Database();
    }

    App.prototype.init = function() {
      this.setListeners();
      if (this.debug) {
        localStorage.clear();
      }
      this.db.checkIfThereIsIntentionAndGetIt();
      return setTimeout(this.showElements, 1500);
    };

    App.prototype.showElements = function() {
      this.question = new Question();
      this.controls = new Controls();
      return this.intention = new Intention();
    };

    App.prototype.setIntention = function(intention) {
      return this.intention.setIntention(intention);
    };

    App.prototype.setListeners = function() {
      var _this = this;
      return $('#More').on('click', function() {
        if ($('#More').attr('state') === 'open') {
          $('#More').attr('state', 'close');
          return $('#Credits').animate({
            opacity: 0
          }, function() {
            return $('#Credits').css({
              'display': 'none'
            });
          });
        } else {
          $('#More').attr('state', 'open');
          $('#Credits').css({
            'display': 'block'
          });
          return $('#Credits').animate({
            opacity: 1
          });
        }
      });
    };

    return App;

  })();

}).call(this);
