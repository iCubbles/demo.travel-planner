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
    is: 'travel-evaluation',

    _cubxReady : false,

    /**
     * Manipulate an element’s local DOM when the element is created and initialized.
     */
    ready: function () {
      this._initOperators()
      this.set('options', [])
      this.set('noOptions', true)
    },

    /**
     * Manipulate an element’s local DOM when the cubbles framework is initialized and ready to work.
     */
    cubxReady: function () {
      this._cubxReady = true
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'visible' has changed ...
     */
    modelVisibleChanged: function(value) {
      if (value === true) {
        this.style.display = 'inline'
      } else if(value === false) {
        this.style.display = 'none'
      }
    },

    /**
     *  Observe the Cubbles-Component-Model: If value for slot 'selections' has changed ...
     */
    modelSelectionsChanged: function (selections) {
      if (this._cubxReady) {
        this._setOptions()
      }
    },

    _setOptions : function() {
      var selections = this.getSelections()
      var operators = this.get('operators')
      var typeOfTravel = selections.cat1.optionSelected ? selections.cat1.optionSelected.value : null
      var region = selections.cat4.optionSelected ? selections.cat4.optionSelected.value : null

      this._emptyOptions()

      if (region && region!== 'germany' && region !== 'worldwide') {
        region = 'worldwide'
      }

      if (typeOfTravel && !region) {
        var options = operators['typeOfTravel_' + typeOfTravel]
        for (var key in options) {
          this.push('options', options[key])
        }
        this.set('noOptions', false)
      } else if (!typeOfTravel && region) {
        for (var key in operators) {
          this.push('options', operators[key]['region_' + region])
        }
        this.set('noOptions', false)
      } else if (typeOfTravel && region) {
        this.push('options', operators['typeOfTravel_' + typeOfTravel]['region_' + region])
        this.set('noOptions', false)
      } else {
        this.set('noOptions', true)
      }
    },

    _emptyOptions : function() {
      var options = this.get('options')

      while (options.length > 0) {
        this.pop('options')
      }
    },

    _initOperators: function() {
      var operators = {
        typeOfTravel_wellness : {
          region_germany : {
            href : 'http://www.kurz-mal-weg.de/wellnessurlaub',
            displayValue : 'kurz-mal-weg.de'
          },
          region_europe : {
            href : 'http://www.mypremiumeurope.com/de/spa-hotels.htm',
            displayValue : 'mypremiumeurope.com'
          },
          region_worldwide : {
            href : 'https://www.fitreisen.de/wellnessurlaub.html',
            displayValue : 'fitreisen.de'}
        },
        typeOfTravel_adventure : {
          region_germany : {
            href : 'http://www.off-the-path.com/de/abenteuerurlaub-deutschland/',
            displayValue : 'off-the-path.com'
          },
          region_europe : {
            href : 'http://www.reise-abenteuer.eu/europa.html',
            displayValue : 'reise-abenteuer.eu'
          },
          region_worldwide : {
            href : 'http://www.erlebnisreisen-weltweit.de/',
            displayValue : 'erlebnisreisen-weltweit.de'}
        },
        typeOfTravel_package : {
          region_germany : {
            href : 'http://www.tui.com/pauschalreisen/deutschland/',
            displayValue : 'tui.com'
          },
          region_europe : {
            href : 'http://www.alltours.de/pauschalreisen',
            displayValue : 'alltours.de'
          },
          region_worldwide : {
            href : 'http://www.pauschalreisen-welt.de/',
            displayValue : 'pauschalreisen-welt.de'}
        },
        typeOfTravel_shortTrip : {
          region_germany : {
            href : 'http://www.kurzurlaub.de/land-wochenendurlaub-deutschland.html',
            displayValue : 'kurzurlaub.de'
          },
          region_europe : {
            href : 'http://www.studiosus.com/?pk_campaign=161713&pk_kwd=de_top_staedtereisen',
            displayValue : 'studiosus.com'
          },
          region_worldwide : {
            href : 'http://www.staedtereisen-weltweit.de/',
            displayValue : 'staedtereisen-weltweit.de'}
        },
        typeOfTravel_cityTrip : {
          region_germany : {
            href : 'http://www.dertour.de/staedtereisen/europa/deutschland/',
            displayValue : 'dertour.de'
          },
          region_europe : {
            href : 'http://www.studiosus.com/?pk_campaign=161713&pk_kwd=de_top_staedtereisen',
            displayValue : 'studiosus.com'
          },
          region_worldwide : {
            href : 'http://www.staedtereisen-weltweit.de/',
            displayValue : 'staedtereisen-weltweit.de'}
        },
        typeOfTravel_beach : {
          region_germany : {
            href : 'https://www.traum-ferienwohnungen.de/urlaubsideen/strandurlaub/europa/deutschland/',
            displayValue : 'traum-ferienwohnungen.de'
          },
          region_europe : {
            href : 'http://www.clubmed.de/cm/europa_p-5-l-DE-pa-UEBERSICHT_EUROPA_5DE-ac-at.html?CMCID=PS93340884853',
            displayValue : 'clubmed.de'
          },
          region_worldwide : {
            href : 'https://urlaub.check24.de/',
            displayValue : 'check24.de'}
        },
        typeOfTravel_backpack : {
          region_germany : {
            href : 'http://www.reisen-mit-rucksack.de/rucksackreise-planen/deutschland-top-10-rucksack-reiseziele/',
            displayValue : 'reisen-mit-rucksack.de'
          },
          region_europe : {
            href : 'http://www.rucksack-reisen.de/277-0-Uebriges-Europa.html',
            displayValue : 'rucksack-reisen.de'
          },
          region_worldwide : {
            href : 'http://www.aktiv-rucksackreisen.de/',
            displayValue : 'aktiv-rucksackreisen.de'}
        }
      }

      this.set('operators', operators)
    }
  });
}());
