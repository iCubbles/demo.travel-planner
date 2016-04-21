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
    is: 'category-value-select',

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
      this.set('options', [])
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
     *  Observe the Cubbles-Component-Model: If value for slot 'category' has changed ...
     */
    modelCategoryChanged: function (category) {
      this._setOptions(category)
    },

    modelVisibleChanged: function(value) {
      if (value === true) {
        this.style.display = 'inline'
      } else if(value === false) {
        this.style.display = 'none'
      }
    },

    setOption: function(event) {
      var value = event.target.getAttribute('id') //get option value
      var category = this.getCategory()

      for (var key in category.options) {
        if (category.options[key].value === value) {
          category.options[key].checked = true
        } else {
          category.options[key].checked = false
        }
      }

      //set category to checked (means this category has an option selected)
      category.checked = true

      this.setCategory(category)
    },

    _setOptions : function(category) {
      // use internal polymer array mutation methods so dom-repeat template is rerendered each time the category slot
      // updates.
      var _options = this.get('options')

      // empty existing options array
      while (_options.length > 0) {
        this.pop('options')
      }

      // refill options array
      if (category.options && category.options.length > 0) {
        for (var i = 0; i < category.options.length; i++) {
          this.push('options', category.options[i])
        }
      }
    },

    _determineActive: function(checked) {
      if (checked) {
        return 'active'
      } else {
        return ''
      }
    }

  });
}());
