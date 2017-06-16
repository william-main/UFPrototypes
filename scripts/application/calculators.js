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
				'ulMonthsSlider': '#slider-ul-months',
				'caMonthsSlider': '#slider-ca-months',
				'ulAmountInput': '#overlay-ul-amount',
				'ulMonthsInput': '#overlay-ul-months',
				'caMonthsInput': '#overlay-ca-months',
				'caAmountInput': '#overlay-ca-amount',
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
						$(this).val("£" + ulAmount);
					});
				}
			});
			
			$root.find(site.selectors.ulMonthsSlider).each(function () {
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
				
				if ($(this).find('input').val !== "") {
					var ulMonths = $(this).find('input').val();
					
					$root.find(site.selectors.ulMonthsInput).each(function () {
						$(this).val(ulMonths + " DAYS");
					});
				}
			});
			
			$root.find(site.selectors.caMonthsSlider).each(function () {
				$(this).roundSlider({
					radius: 163,
					value: 60,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "90",
					step: "30",
					width: 10,
					readOnly: true,
					handleShape: "square"
				});
				
				if ($(this).find('input').val !== "") {
					var caMonths = $(this).find('input').val();
					
					$root.find(site.selectors.caMonthsInput).each(function () {
						$(this).val(caMonths + " DAYS");
					});
				}
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
				
				if ($(this).find('input').val !== "") {
					var caAmount = $(this).find('input').val();
					
					$root.find(site.selectors.caAmountInput).each(function () {
						$(this).val("£" + caAmount);
					});
				}
			});
		}
	};
	
	site.enable();
	
	window.site = site;
	
})(window.jQuery, window.jQuery(document.body));