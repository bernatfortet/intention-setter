(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.App = (function() {
    App.prototype.debug = false;

    function App() {
      this.showElements = __bind(this.showElements, this);
      this.background = new Background();
      this.db = new Database();
      this.question = new Question();
      this.controls = new Controls();
      this.intention = new Intention();
    }

    App.prototype.init = function() {
      this.setListeners();
      if (this.debug) {
        localStorage.clear();
      }
      this.db.checkIfThereIsIntentionAndGetIt();
      return setTimeout(this.showElements, 0);
    };

    App.prototype.showElements = function() {
      this.question.appear();
      this.controls.appear();
      return this.intention.appear();
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
