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
    is: 'main-nav',

    categories : {},

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
      this.set('categories', {
        cat1 : {
          displayValue : 'Reiseart',
          key : 'cat1'
        },
        cat2 : {
          displayValue : 'Verkehrsmittel',
          key : 'cat2'
        },
        cat3 : {
          displayValue : 'Budget',
          key : 'cat3'
        },
        cat4 : {
          displayValue : 'Zeit',
          key : 'cat4'
        },
        cat5 : {
          displayValue : 'Dauer',
          key : 'cat5'
        },
        result : {
          displayValue : 'Auswertung',
          key : 'result'
        }
      })
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
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'selectedCategory' has changed ...
     */
    modelSelectedCategoryChanged: function (cat) {

    },

    _checkSelected: function(cat) {
      if (this.getSelectedCategory().key === cat) {
        return 'checked'
      }
    }
  });
}());
