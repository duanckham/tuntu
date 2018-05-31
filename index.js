var init = function(eventName) {
  if (!window.tuntu) {
    window.tuntu = {};
  }

  window.tuntu[eventName] = window.tuntu[eventName] || [];

  return guid();
};

var guid = function() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }

  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

module.exports = {
  spit: function(eventName, data) {
    if (window.tuntu) {
      var listeners = window.tuntu[eventName] || [];

      for (var i = 0; i < listeners.length; i++) {
        listeners[i].callback(data);
      }
    }
  },

  suck: function(eventName, callback) {
    var that = this;
    var id = init(eventName);

    if (callback) {
      window.tuntu[eventName].push({
        id: id,
        callback: callback
      });
    } else {
      window.tuntu[eventName].push({
        id: id,
        callback: function(data) {
          that.setState(data);
        }
      });
    }

    return id;
  },

  silence: function(id) {
    var did = false;

    if (window.tuntu) {
      for (var eventName in window.tuntu) {
        var listeners = window.tuntu[eventName];

        for (var i = listeners.length; i--;) {
          if (listeners[i].id === id) {
            window.tuntu[eventName].splice(i, 1);
            did = true;
            break;
          }
        }

        if (did) {
          break;
        }
      }
    }
  }
};