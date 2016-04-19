(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  this.Background = (function() {
    Background.prototype.debug = true;

    Background.prototype.totalLocalPhotos = 77;

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
      this.getImageCallback = __bind(this.getImageCallback, this);
      this.getImage = __bind(this.getImage, this);
      this.setRandomBackground = __bind(this.setRandomBackground, this);
      this.getImage();
      this.setListeners();
    }

    Background.prototype.setListeners = function() {
      var _this = this;
      $('body').on('IntentionSet', function() {
        return $('#Overlay').delay(2000).animate({
          opacity: 0.2
        }, 4000);
      });
      return $('body').on('RandomizeBackground', this.setRandomBackground);
    };

    Background.prototype.setRandomBackground = function() {
      this.currentImageUrl = null;
      return this.getImage();
    };

    Background.prototype.getImage = function() {
      return $.ajax({
        dataType: "jsonp",
        url: this.getTumblrUrl(),
        success: this.getImageCallback
      });
    };

    Background.prototype.getImageCallback = function(data) {
      var imageUrl;
      console.log('Tumblr', data);
      imageUrl = data.response.posts[0].photos[0].original_size.url;
      if (this.currentImageUrl === null) {
        return this.setBackground(imageUrl);
      }
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
      var randNumber, url;
      randNumber = Math.round(Math.random(0, 180) * 180);
      url = "https://api.tumblr.com/v2/blog/" + this.config.tumblr.baseHostname + "/posts/photo?api_key=" + this.config.tumblr.apiKey + "&offset=" + randNumber;
      return url;
      return {
        "1392919244": {
          "string": "Focus on what matters at the moment.",
          "time": 1392919244,
          "image_url": "http://24.media.tumblr.com/517307e7e38640827087e5d71b6f4694/tumblr_mzgz2dmpvq1st5lhmo1_1280.jpg"
        },
        "1393002717": {
          "string": "Execution excellence.",
          "time": 1393002717,
          "image_url": "http://farm4.staticflickr.com/3080/2775233719_53bee7b79d_o.jpg"
        }
      };
    };

    return Background;

  })();

}).call(this);
