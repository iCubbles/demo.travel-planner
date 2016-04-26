/**
 * Contains hookFunctions for component travel-planner
 */
(function(){
  'use strict'

  //set namespace containing travel-planner functions (i.e. hook functions)
  window.com_incowia_demo_travel_planner = {

    //hook function for connection from mainNav to footprint component
    determineCO2Value : function(selections, next) {
      var intValue = 0

      for (var key in selections) {
        var optionSelected = selections[key].optionSelected
        if (optionSelected && optionSelected.co2Count) {
          intValue += optionSelected.co2Count
        }
      }

      next(intValue)
    },

    //toggle footprint visibility
    toggleFootprontVisibility: function() {
      var toggleButton = Polymer.dom(document).querySelector('travel-planner .toggle-footprint')
      var footprintComp = Polymer.dom(document).querySelector('travel-planner co2-footprint')

      if (footprintComp.style.visibility === 'visible' || footprintComp.style.visibility === '') {
        Polymer.dom(toggleButton).classList.remove('active')
        footprintComp.style.visibility = 'hidden'
      } else if (footprintComp.style.visibility = 'hiddden') {
        Polymer.dom(toggleButton).classList.add('active')
        footprintComp.style.visibility = 'visible'
      }
    }
  }
})()
