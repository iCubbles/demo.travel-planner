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
      this._setCompoundParentClass(this._determineBgClass())
    },

    modelSelectedCategoryChanged: function(category) {
      this._setCompoundParentClass(this._determineBgClass())
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

    _setCompoundParentClass: function(cssClass) {
      var parentNode = Polymer.dom(this)

      do {
          parentNode = Polymer.dom(parentNode).parentNode
      } while (parentNode.tagName.toLowerCase() !== 'travel-planner' && parentNode.tagName.toLowerCase() !== 'body')

      if (parentNode.isCompoundComponent && parentNode.tagName.toLowerCase() === 'travel-planner') {
        //remove css bgClass if there is alreay set one
        if (this._currentBgClass) {
          parentNode.classList.remove(this._currentBgClass)
        }
        //remember added css class to remove it again when a new bgClass is set
        this._currentBgClass = cssClass
        parentNode.classList.add(cssClass)
      }
    },

    _determineBgClass: function() {
      var currentCatValue = this.getSelectedCategory().value
      var currentCat = this._getCategoryByValue(currentCatValue)

      if (!currentCat.hasOwnProperty('options')) {
        return currentCat.bgClass
      }

      for (var i = 0; i < currentCat.options.length; i++) {
        var opt = currentCat.options[i]
        if (opt.checked) {
          return opt.bgClass
        }
      }

      return currentCat.options[0].bgClass
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
              checked: false,
              bgClass: 'bg1a',
              co2Count: 10,
            },
            {
              displayValue: 'Abenteuer',
              value: 'adventure',
              checked: false,
              bgClass: 'bg1b',
              co2Count: 5
            },
            {
              displayValue: 'Pauschal',
              value: 'package',
              checked: false,
              bgClass: 'bg1c',
              co2Count: 5
            },
            {
              displayValue: 'Kurzurlaub',
              value: 'shortTrip',
              checked: false,
              bgClass: 'bg1d',
              co2Count: 5
            },
            {
              displayValue: 'Städtereise',
              value: 'cityTrip',
              checked: false,
              bgClass: 'bg1e',
              co2Count: 10
            },
            {
              displayValue: 'Strand',
              value: 'beach',
              checked: false,
              bgClass: 'bg1f',
              co2Count: 5
            },
            {
              displayValue: 'Rucksack',
              value: 'backpack',
              checked: false,
              bgClass: 'bg1g',
              co2Count: 0
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
              checked: false,
              bgClass: 'bg2a',
              co2Count: 10
            },
            {
              displayValue: 'Bus',
              value: 'bus',
              checked: false,
              bgClass: 'bg2b',
              co2Count: 15
            },
            {
              displayValue: 'ÖPNV',
              value: 'publicTransport',
              checked: false,
              bgClass: 'bg2c',
              co2Count: 10
            },
            {
              displayValue: 'PKW',
              value: 'car',
              checked: false,
              bgClass: 'bg2d',
              co2Count: 20
            },
            {
              displayValue: 'Flugzeug',
              value: 'plain',
              checked: false,
              bgClass: 'bg2e',
              co2Count: 45
            },
            {
              displayValue: 'Schiff',
              value: 'ship',
              checked: false,
              bgClass: 'bg2f',
              co2Count: 55
            },
            {
              displayValue: 'Motorrad',
              value: 'motorbike',
              checked: false,
              bgClass: 'bg2g',
              co2Count: 15
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
              checked: false,
              bgClass: 'bg3a',
              co2Count: 15
            },
            {
              displayValue: 'Gehobene Ausstattung',
              value: 'uptown',
              checked: false,
              bgClass: 'bg3b',
              co2Count: 10
            },
            {
              displayValue: 'Einfache Ausstattung',
              value: 'simple',
              checked: false,
              bgClass: 'bg3c',
              co2Count: 5
            },
            {
              displayValue: 'Puristisch',
              value: 'puristic',
              checked: false,
              bgClass: 'bg3d',
              co2Count: 0
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
              checked: false,
              bgClass: 'bg4a',
              co2Count: 5
            },
            {
              displayValue: 'Deutschland',
              value: 'germany',
              checked: false,
              bgClass: 'bg4b',
              co2Count: 10
            },
            {
              displayValue: 'Europa',
              value: 'europe',
              checked: false,
              bgClass: 'bg4c',
              co2Count: 15
            },
            {
              displayValue: 'Amerika',
              value: 'america',
              checked: false,
              bgClass: 'bg4d',
              co2Count: 25
            },
            {
              displayValue: 'Afrika',
              value: 'africa',
              checked: false,
              bgClass: 'bg4e',
              co2Count: 25
            },
            {
              displayValue: 'Asien',
              value: 'asia',
              checked: false,
              bgClass: 'bg4f',
              co2Count: 25
            },
            {
              displayValue: 'Australien',
              value: 'australia',
              checked: false,
              bgClass: 'bg4g',
              co2Count: 30
            },
            {
              displayValue: 'Weltweit',
              value: 'worldwide',
              checked: false,
              bgClass: 'bg4h',
              co2Count: 30
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
              checked: false,
              bgClass: 'bg5',
              co2Count: 5
            },
            {
              displayValue: '1 Woche',
              value: '1week',
              checked: false,
              bgClass: 'bg5',
              co2Count: 8
            },
            {
              displayValue: '2 Wochen',
              value: '2weeks',
              checked: false,
              bgClass: 'bg5',
              co2Count: 10
            },
            {
              displayValue: '3 Wochen',
              value: '3weeks',
              checked: false,
              bgClass: 'bg5',
              co2Count: 12
            },
            {
              displayValue: '4 Wochen und länger',
              value: '4+weeks',
              checked: false,
              bgClass: 'bg5',
              co2Count: 15
            }
          ]
        },
        result : {
          displayValue : 'Auswertung',
          value : 'result',
          bgClass: 'bg6'
        }
      })
    }
  });
}());
