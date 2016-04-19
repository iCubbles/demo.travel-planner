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
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'selectedCategory' has changed ...
     */
    modelSelectedCategoryChanged: function (cat) {
      this._checkSelected()
    },

    changeSelectedOption : function(event) {
      var value = event.target.getAttribute('id')
      this.setSelectedCategory(this._getCategoryByValue(value))
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


    _initCategories : function() {
      this.set('categories', {
        cat1 : {
          displayValue : 'Reiseart',
          value : 'typeOfTravel',
          checked : false,
          options: [
            {
              displayValue: 'Wellness',
              value: 'wellness'
            },
            {
              displayValue: 'Abenteuer',
              value: 'adventure'
            },
            {
              displayValue: 'Pauschal',
              value: 'package'
            },
            {
              displayValue: 'Kurzurlaub',
              value: 'shortTrip'
            },
            {
              displayValue: 'Städtereise',
              value: 'cityTrip'
            },
            {
              displayValue: 'Strand',
              value: 'beach'
            },
            {
              displayValue: 'Rucksack',
              value: 'backpack'
            }
          ]
        },
        cat2 : {
          displayValue : 'Verkehrsmittel',
          value : 'typeOfTransport',
          checked : false,
          options : [
            {
              displayValue: 'Bahn',
              value: 'train'
            },
            {
              displayValue: 'Bus',
              value: 'bus'
            },
            {
              displayValue: 'ÖPNV',
              value: 'publicTransport'
            },
            {
              displayValue: 'PKW',
              value: 'car'
            },
            {
              displayValue: 'Flugzeug',
              value: 'plain'
            },
            {
              displayValue: 'Schiff',
              value: 'ship'
            },
            {
              displayValue: 'Motorrad',
              value: 'motorbike'
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
              value: 'luxury'
            },
            {
              displayValue: 'Gehobene Ausstattung',
              value: 'uptown'
            },
            {
              displayValue: 'Einfache Ausstattung',
              value: 'simple'
            },
            {
              displayValue: 'Puristisch',
              value: 'puristic'
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
              value: 'nearby'
            },
            {
              displayValue: 'Deutschland',
              value: 'germany'
            },
            {
              displayValue: 'Europa',
              value: 'europe'
            },
            {
              displayValue: 'Amerika',
              value: 'america'
            },
            {
              displayValue: 'Afrika',
              value: 'africa'
            },
            {
              displayValue: 'Asien',
              value: 'asia'
            },
            {
              displayValue: 'Australien',
              value: 'australia'
            },
            {
              displayValue: 'Weltweit',
              value: 'worldwide'
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
              value: '5daysMac'
            },
            {
              displayValue: '1 Woche',
              value: '1week'
            },
            {
              displayValue: '2 Wochen',
              value: '2weeks'
            },
            {
              displayValue: '3 Wochen',
              value: '3weeks'
            },
            {
              displayValue: '4 Wochen und länger',
              value: '4+weeks'
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
