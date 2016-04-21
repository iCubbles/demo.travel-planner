(function () {
  'use strict';
  /**
   * Get help:
   * > Lifecycle callbacks:
   * https://www.polymer-project.org/1.0/docs/devguide/registering-elements.html#lifecycle-callbacks
   *
   * Access the Cubbles-Component-Model:
   * > Access slot values:
   * slot 'a': this.getA(); | this.setA(value)
   */
  CubxPolymer({
    is: 'co2-footprint',

    _cubxReady : false,
    _cYmin : 42, //min value for circle value cY in scale
    _cYmax: 242, //max value for circle value cY in scale


    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {

    },

    /**
     * Manipulate an element’s local DOM when the element is attached to the document.
     */
    attached: function () {
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
      this._cubxReady = true
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'a' has changed ...
     */
    modelValueChanged: function (newValue) {
      if (this._cubxReady) {
        this._setValue(newValue)
      }
    },

    _setValue : function(value) {
      var circle = Polymer.dom(this.root).querySelector('#circle')
      var range = this._cYmax - this._cYmin
      //check if value is between 0 and 100 (including 0 and 100)
      if (value < 0) {
        //set value to zero
        value = 0
      }
      if (value > 100) {
        //set value to 100
        value = 100
      }

      var newCy = this._cYmax - (range * value / 100)
      Polymer.dom(circle).setAttribute('cy', newCy)
    }
  });
}());
