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

    _cubxReady : false,

    /**
     * Manipulate an element’s local DOM when the element is created.
     */
    created: function () {
    },

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
      this._initCategories()
      this._back = 'cat1'
      //setup listener
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
      this.setSelectedCategory(this.get('categories').cat1)
      this._checkSelected()
    },

    modelUpdateCategoryChanged: function(category) {
      //update category in internal _categories property
      this._updateCategory(category)
    },

    changeSelectedOption : function(event) {
      var value = event.target.getAttribute('id')
      this._changeSelectedCatByValue(value)
    },

    back : function() {
      var activeBtn = Polymer.dom(this.root).querySelector('.main-nav-btn.active')
      var dataBack = activeBtn.dataBack
      if (dataBack) {
        this._changeSelectedCatByValue(dataBack)
      }
    },

    next : function() {
      var activeBtn = Polymer.dom(this.root).querySelector('.main-nav-btn.active')
      var dataNext = activeBtn.dataNext
      if (dataNext) {
        this._changeSelectedCatByValue(dataNext)
      }
    },

    _changeSelectedCatByValue : function(value) {
      var cat = this._getCategoryByValue(value)
      this._setVisibility(cat);
      this.setSelectedCategory(cat)
      this._checkSelected()
    },

    _checkSelected: function() {
      if (this._cubxReady) {
        var selectedCat = this.getSelectedCategory()
        var buttons = Polymer.dom(this.root).querySelectorAll('.main-nav-btn')
        for (var i = 0; i < buttons.length; i++) {
          var btn = buttons[i]
          if (btn.getAttribute('id') === selectedCat.value) {
            Polymer.dom(btn).classList.add('active')
          } else {
            Polymer.dom(btn).classList.remove('active')
          }
        }
      }
    },

    _getCategoryByValue : function(value) {
      var categories = this.get('categories')
      for (var key in categories) {
        if (categories[key].value === value) {
          return categories[key]
        }
      }
      return null
    },

    _updateCategory: function(cat) {
      var categories = this.get('categories')
      for (var key in categories) {
        if (categories[key].value === cat.value) {
          this.set('categories.' + key, cat)
          break
        }
      }
      this._updateSelections(categories)
      return
    },

    _updateSelections: function(categories) {
      var selections = {}
      for (var key in categories) {
        if (categories[key].hasOwnProperty('options')) {
          selections[key] = {
            value : categories[key].value,
            displayValue: categories[key].displayValue,
            optionSelected: this._getSelectedOption(categories[key].options)
          }
        }
      }
      this.setSelections(selections)
    },

    _getSelectedOption: function(options) {
      // iterate over all given options and return the first one for which property 'checked' is true
      // if no one is find return null
      for (var i = 0; i < options.length; i++) {
        if (options[i].checked) {
          return options[i]
        }
      }
      return null
    },

    _setVisibility: function(cat) {
      if (cat.value === this.get('categories').result.value) {
        this.setEvaluationVisible(true)
        this.setCatSelectVisible(false)
      } else {
        this.setEvaluationVisible(false)
        this.setCatSelectVisible(true)
      }
    },

    _initCategories : function() {
      this.set('categories', {
        cat1 : {
          displayValue : 'Reiseart',
          value : 'typeOfTravel',
          checked : false,
          options: [
            {
              displayValue: 'Wellness',
              value: 'wellness',
              checked: false
            },
            {
              displayValue: 'Abenteuer',
              value: 'adventure',
              checked: false
            },
            {
              displayValue: 'Pauschal',
              value: 'package',
              checked: false
            },
            {
              displayValue: 'Kurzurlaub',
              value: 'shortTrip',
              checked: false
            },
            {
              displayValue: 'Städtereise',
              value: 'cityTrip',
              checked: false
            },
            {
              displayValue: 'Strand',
              value: 'beach',
              checked: false
            },
            {
              displayValue: 'Rucksack',
              value: 'backpack',
              checked: false
            }
          ]
        },
        cat2 : {
          displayValue : 'Reisemittel',
          value : 'typeOfTransport',
          checked : false,
          options : [
            {
              displayValue: 'Bahn',
              value: 'train',
              checked: false
            },
            {
              displayValue: 'Bus',
              value: 'bus',
              checked: false
            },
            {
              displayValue: 'ÖPNV',
              value: 'publicTransport',
              checked: false
            },
            {
              displayValue: 'PKW',
              value: 'car',
              checked: false
            },
            {
              displayValue: 'Flugzeug',
              value: 'plain',
              checked: false
            },
            {
              displayValue: 'Schiff',
              value: 'ship',
              checked: false
            },
            {
              displayValue: 'Motorrad',
              value: 'motorbike',
              checked: false
            }
          ]
        },
        cat3 : {
          displayValue : 'Budget',
          value : 'budget',
          checked : false,
          options : [
            {
              displayValue: 'Luxus',
              value: 'luxury',
              checked: false
            },
            {
              displayValue: 'Gehobene Ausstattung',
              value: 'uptown',
              checked: false
            },
            {
              displayValue: 'Einfache Ausstattung',
              value: 'simple',
              checked: false
            },
            {
              displayValue: 'Puristisch',
              value: 'puristic',
              checked: false
            }
          ]
        },
        cat4 : {
          displayValue : 'Region',
          value : 'region',
          checked : false,
          options : [
            {
              displayValue: 'Regional',
              value: 'nearby',
              checked: false
            },
            {
              displayValue: 'Deutschland',
              value: 'germany',
              checked: false
            },
            {
              displayValue: 'Europa',
              value: 'europe',
              checked: false
            },
            {
              displayValue: 'Amerika',
              value: 'america',
              checked: false
            },
            {
              displayValue: 'Afrika',
              value: 'africa',
              checked: false
            },
            {
              displayValue: 'Asien',
              value: 'asia',
              checked: false
            },
            {
              displayValue: 'Australien',
              value: 'australia',
              checked: false
            },
            {
              displayValue: 'Weltweit',
              value: 'worldwide',
              checked: false
            }
          ]
        },
        cat5 : {
          displayValue : 'Dauer',
          value : 'duration',
          checked : false,
          options : [
            {
              displayValue: 'Max. 5 Tage',
              value: '5daysMac',
              checked: false
            },
            {
              displayValue: '1 Woche',
              value: '1week',
              checked: false
            },
            {
              displayValue: '2 Wochen',
              value: '2weeks',
              checked: false
            },
            {
              displayValue: '3 Wochen',
              value: '3weeks',
              checked: false
            },
            {
              displayValue: '4 Wochen und länger',
              value: '4+weeks',
              checked: false
            }
          ]
        },
        result : {
          displayValue : 'Auswertung',
          value : 'result'
        }
      })
    }
  });
}());
