function init(eventName) {
  if (!window.tuntu) {
    window.tuntu = {};
  }

  window.tuntu[eventName] = window.tuntu[eventName] || [];

  return hash();
};

function hash() {
  return Math.random().toString(36).substr(2, 5);
};

module.exports = {
  _gas: [],

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

    this._gas.push(id);

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
  },

  componentWillUnmount() {
    for (var i = this._gas.length; i--;) {
      this.silence(this._gas[i]);
    }
  },
};