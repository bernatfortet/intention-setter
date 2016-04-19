(function() {
  this.Database = (function() {
    Database.prototype.listLoaded = false;

    Database.prototype.currentIntention = null;

    Database.prototype.intentionsList = {};

    Database.prototype.today = null;

    Database.prototype.dayStartSleepHour = 2;

    Database.prototype.dayEndSleepHour = 5;

    function Database() {
      this.mongoDB = new MongoLab('50b9ed0fe4b0afba6ecc5836');
      this.today = moment();
    }

    Database.prototype.checkIfThereIsIntentionAndGetIt = function() {
      var storedIntentions;
      storedIntentions = localStorage.getItem('intentions');
      if ((storedIntentions != null)) {
        return this.parseLocalStorageIntentions(storedIntentions);
      }
    };

    Database.prototype.parseLocalStorageIntentions = function(storedIntentions) {
      var lastIntention;
      this.intentionsList = JSON.parse(storedIntentions);
      lastIntention = this.getLatestIntention(this.intentionsList);
      return this.parseIntention(lastIntention);
    };

    Database.prototype.getMongoIntentions = function() {
      var _this = this;
      return this.mongoDB.listDocuments("intentions", "intentions", {
        s: '{"_id": -1}'
      }, function(intentions) {
        var intention, key, _results;
        _this.intentionsList = intentions;
        _this.listLoaded = true;
        _results = [];
        for (key in intentions) {
          intention = intentions[key];
          if (key === 0) {
            _results.push(_this.parseIntention(intention));
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      });
    };

    Database.prototype.parseIntention = function(intention) {
      if (this.dateIsBetweenTodaysAwakeHours(intention.time)) {
        return this.setIntention(intention);
      }
    };

    Database.prototype.setIntention = function(intention) {
      app.intention.setIntention(intention);
      return this.currentIntention = intention;
    };

    Database.prototype.dateIsBetweenTodaysAwakeHours = function(date) {
      var isBetweenAwakeHours, isInToday;
      date = moment.unix(date);
      isBetweenAwakeHours = !(date.hour() >= this.dayStartSleepHour && date.hour() <= this.dayEndSleepHour);
      isInToday = date.dayOfYear() === this.today.dayOfYear();
      return isBetweenAwakeHours && isInToday;
    };

    Database.prototype.addIntention = function(intention) {
      this.intentionsList[intention.time] = intention;
      return localStorage.setItem('intentions', JSON.stringify(this.intentionsList));
    };

    Database.prototype.getLatestIntention = function(intentions) {
      var intention, key, latest;
      latest = null;
      for (key in intentions) {
        intention = intentions[key];
        if (key > latest) {
          latest = key;
        }
      }
      return intentions[latest];
    };

    return Database;

  })();

}).call(this);
