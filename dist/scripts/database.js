(function() {
  this.Database = (function() {
    Database.prototype.listLoaded = false;

    Database.prototype.currentIntention = null;

    Database.prototype.today = null;

    Database.prototype.dayStartSleepHour = 3;

    Database.prototype.dayEndSleepHour = 5;

    function Database() {
      this.mongoDB = new MongoLab('50b9ed0fe4b0afba6ecc5836');
      this.today = moment();
    }

    Database.prototype.checkIfThereIsIntentionAndGetIt = function() {
      var storedIntention;
      storedIntention = localStorage.getItem('current_intention');
      if ((storedIntention != null)) {
        return this.setIntention(JSON.parse(storedIntention));
      } else {
        return this.getIntentions();
      }
    };

    Database.prototype.getIntentions = function() {
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
      var _this = this;
      this.mongoDB.insertDocuments("intentions", "intentions", intention, function(data) {
        return console.log("Insert Documents : ", data);
      });
      return localStorage.setItem('current_intention', JSON.stringify(intention));
    };

    return Database;

  })();

}).call(this);
