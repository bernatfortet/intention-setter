(function() {
  this.Background = (function() {
    Background.prototype.debug = true;

    Background.prototype.totalPosts = null;

    Background.prototype.config = {
      tumblr: {
        baseHostname: 'unsplash.com',
        apiKey: 'HkbfV4z6wZdiMtmPu8Xo3ejkUoxHUXwKpMfcywPukVSUGw4UJq'
      }
    };

    Background.prototype.totalPosts = null;

    Background.prototype.previousImageUrl = null;

    Background.prototype.currentImageUrl = null;

    function Background() {
      this.getImage();
    }

    Background.prototype.getImage = function() {
      var _this = this;
      return $.ajax({
        dataType: "jsonp",
        url: this.getTumblrUrl(),
        success: function(data) {
          var imageUrl;
          console.log('Tumblr', data);
          imageUrl = data.response.posts[0].photos[0].original_size.url;
          if (_this.currentImageUrl === null) {
            return _this.setBackground(imageUrl);
          }
        }
      });
    };

    Background.prototype.setBackground = function(imageUrl) {
      if (this.previousImageUrl === null) {
        this.previousImageUrl = imageUrl;
      }
      this.currentImageUrl = imageUrl;
      $('#Background').css("background-image", "url(" + imageUrl + ")");
      return $('#Background').animate({
        opacity: 1
      }, 700);
    };

    Background.prototype.setCustomBackground = function(imageUrl) {
      var _this = this;
      return $('#Background').animate({
        opacity: 0
      }, 700, function() {
        return _this.setBackground(imageUrl);
      });
    };

    Background.prototype.setPreviousBackground = function() {
      return this.setBackground(this.previousImageUrl);
    };

    Background.prototype.getTumblrUrl = function() {
      var url;
      url = "https://api.tumblr.com/v2/blog/" + this.config.tumblr.baseHostname + "/posts/photo?api_key=" + this.config.tumblr.apiKey + "&offset=30";
      return url;
    };

    return Background;

  })();

}).call(this);
