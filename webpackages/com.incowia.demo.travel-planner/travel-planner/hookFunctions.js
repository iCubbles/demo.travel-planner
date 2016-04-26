/**
 * Contains hookFunctions for component travel-planner
 */
(function(){
  'use strict'

  //set namespace containing hook functions
  window.com_incowia_demo_travel_planner = {

    determineCO2Value : function(selections, next) {
      var intValue = 0

      for (var key in selections) {
        var optionSelected = selections[key].optionSelected
        if (optionSelected && optionSelected.co2Count) {
          intValue += optionSelected.co2Count
        }
      }

      next(intValue)
    }
  }
})()
