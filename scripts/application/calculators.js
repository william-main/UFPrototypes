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
				function tooltipVal2(args) {
					return "£ " + args.value;
				}
				
				$(this).roundSlider({
					handleShape: "round",
					radius: 203,
					value: 20000,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "100000",
					step: "10000",
					width: 15,
					readOnly: true
				});
			});
			
			$root.find(site.selectors.sliderTwo).each(function () {
				function tooltipVal2(args) {
					return args.value + " days";
				}
				
				$(this).roundSlider({
					sliderType: "min-range",
					width: 22,
					radius: 100,
					value: 60,
					circleShape: "pie",
					startAngle: 270,
					handlsize: "+10",
					min: 30,
					max: 90,
					step: 30,
					tooltripFormat: tooltipVal2,
					editableTooltip: false
				});
			});
		}
	};
	
	site.enable();
	
	window.site = site;
	
})(window.jQuery, window.jQuery(document.body));