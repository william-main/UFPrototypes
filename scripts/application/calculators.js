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
				container: '.calculator-container',
				ultimateLoan: {
					'amountSlider': '#slider-ul-amount',
					'monthsSlider': '#slider-ul-months',
					overlay: {
						amountInput: '#overlay-ul-amount',
						monthsInput: '#overlay-ul-months'
					},
					interactions: {
						amount: '#ul-amount-slider',
						duration: '#ul-duration-slider'
					}
				},
				cashAdvance: {
					'amountSlider': '#slider-ca-amount',
					'monthsSlider': '#slider-ca-months',
					overlay: {
						amountInput: '#overlay-ca-amount',
						monthsInput: '#overlay-ca-months'
					},
					interactions: {
						amount: '#ca-amount-slider',
						duration: '#ca-duration-slider'
					}
				},
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
			
			$root.find(site.selectors.container).each(function () {
				$(this).find(site.selectors.ultimateLoan.amountSlider).roundSlider({
					handleShape: "square",
					radius: 203,
					value: 50000,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "100000",
					width: 20,
					readOnly: true
				});
				
				if ($(this).find(site.selectors.ultimateLoan.amountSlider).find("input").val !== "") {
					var ulAmount = $(this).find(site.selectors.ultimateLoan.amountSlider).find("input").val();
					
					$root.find(site.selectors.ultimateLoan.overlay.amountInput).val("£" + ulAmount);
				}
			});
			
			$root.find(site.selectors.container).each(function () {
				$(this).find(site.selectors.ultimateLoan.interactions.amount).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.ultimateLoan.overlay.amountInput).val("£" + interactionValue);
					
					$(site.selectors.ultimateLoan.amountSlider).roundSlider({
						value: interactionValue
					});
				});
			});
			

			
			$root.find(site.selectors.durationInteractionSlider).each(function () {
				$(this).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.ulMonthsSlider).each(function () {
						$(this).roundSlider({
							value: interactionValue
						});
					});
				});
			});
			
			$root.find(site.selectors.caAmountInteractionSlider).each(function () {
				$(this).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.caAmountInput).each(function () {
						$(this).val("£" + interactionValue);
					});
					
					$root.find(site.selectors.sliderTwo).each(function () {
						$(this).roundSlider({
							value: interactionValue
						});
					});
				});
			});
			
			$root.find(site.selectors.caDurationInteractionSlider).each(function () {
				$(this).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.caMonthsInput).each(function () {
						$(this).val(interactionValue + " DAYS");
					});
					
					$root.find(site.selectors.caMonthsSlider).each(function () {
						$(this).roundSlider({
							value: interactionValue
						});
					});
				});
			});
			
			$root.find(site.selectors.ulMonthsSlider).each(function () {
				$(this).roundSlider({
					radius: 163,
					value: 150,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "360",
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