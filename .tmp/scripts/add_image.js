(function() {
  this.Controls = (function() {
    Controls.prototype.text = null;

    Controls.prototype.input = null;

    Controls.prototype.state = "click";

    function Controls() {
      this.el = $('#Controls');
      this.text = $('#AddImageText');
      this.input = $('#AddImageInput');
      this.icon = $('#AddImageIcon');
      this.button = $('#AddImageButton');
      this.appear();
      this.setListeners();
    }

    Controls.prototype.appear = function() {
      return this.el.animate({
        opacity: "1"
      }, {
        queue: false,
        duration: 1100
      }).transition({
        y: "50",
        duration: 900,
        easing: 'easeOutQuart'
      });
    };

    Controls.prototype.setListeners = function() {
      var _this = this;
      this.button.on('click', function() {
        if (_this.state === 'remove') {
          console.log('asdf');
          app.background.setPreviousBackground();
          _this.icon.attr('state', 'click');
          $('#AddImageText').text("Use image from url");
          return _this.state = "click";
        }
      });
      this.input.on('focus', function() {
        if (_this.state === 'click') {
          _this.input.val('');
          _this.text.text("Just press Ctrl + V");
          return _this.state = "paste";
        }
      });
      this.input.on('blur', function() {
        if (_this.state === 'click') {
          $('#AddImageText').text("Use image from url");
          return _this.state = "click";
        }
      });
      return this.input.on('keydown', jwerty.event("ctrl+v/cmd+v", function() {
        return setTimeout((function() {
          var pastedText;
          pastedText = $('#AddImageInput').val();
          $('#AddImageInput').val('');
          app.background.setCustomBackground(pastedText);
          _this.text.text("Remove Image");
          _this.state = "remove";
          return _this.icon.attr('state', 'remove');
        }), 200);
      }));
    };

    return Controls;

  })();

}).call(this);
