(function ($, $doc) {
	"use strict";
	
	var site;
	
	site = {
		$window: $(window),
		loaded: false,
		
		enable: function () {
			site.ui = {
				body: $("html, body")
			};
			
			site.selectors = {
				'slider': '#slider',
				'sliderTwo': '#slider-two',
				'ulAmountSlider': '#slider-ul-amount',
				'ulAmountInput': '#overlay-ul-amount',
				'tooltip': '.rs-tooltip-text'
			};
			
			site.parse();
		},
		
		parse: function ($root) {
			$root = $root || $doc;
			
			$root.first().each(function () {
				site.sliders.apply(this);
			});
		},
		
		sliders: function () {
			var $root = $(this);
			
			$root.find(site.selectors.slider).each(function () {
				$(this).roundSlider({
					handleShape: "square",
					radius: 203,
					value: 50000,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "100000",
					step: "20000",
					width: 20,
					readOnly: true
				});
				
				if ($(this).find('input').val !== "") {
					var ulAmount = $(this).find('input').val();
					
					$root.find(site.selectors.ulAmountInput).each(function () {
						$(this).val(ulAmount);
					});
				}
			});
			
			$root.find(site.selectors.ulAmountSlider).each(function () {
				$(this).roundSlider({
					radius: 163,
					value: 150,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "360",
					step: "30",
					width: 10,
					readOnly: true,
					handleShape: "square"
				});
			});
			
			$root.find(site.selectors.sliderTwo).each(function () {
				$(this).roundSlider({
					handleShape: "square",
					value: 10000,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "50000",
					step: "10000",
					width: 20,
					radius: 203,
					readOnly: true
				});
			});
		}
	};
	
	site.enable();
	
	window.site = site;
	
})(window.jQuery, window.jQuery(document.body));