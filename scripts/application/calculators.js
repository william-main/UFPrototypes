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
				
				$(this).find(site.selectors.ultimateLoan.monthsSlider).roundSlider({
					radius: 163,
					value: 150,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "360",
					width: 10,
					readOnly: true,
					handleShape: "square"
				});
				
				$(this).find(site.selectors.cashAdvance.amountSlider).roundSlider({
					handleShape: "square",
					value: 10000,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "50000",
					width: 20,
					radius: 203,
					readOnly: true
				});
				
				$(this).find(site.selectors.cashAdvance.monthsSlider).roundSlider({
					radius: 163,
					value: 60,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "90",
					width: 10,
					readOnly: true,
					handleShape: "square"
				});
				
				function applyAmounts(slider, overlay) {
					if (slider.find("input").val !== "") {
						var amount = slider.find("input").val();
						
						overlay.val("£" + amount);
					}
				}
				
				function applyMonths(slider, overlay) {
					if (slider.find("input").val !== "") {
						var months = slider.find("input").val();
						
						overlay.val(months + " DAYS");
					}
				}
				
				applyAmounts($(this).find(site.selectors.ultimateLoan.amountSlider), $root.find(site.selectors.ultimateLoan.overlay.amountInput));
				applyAmounts($(this).find(site.selectors.cashAdvance.amountSlider), $root.find(site.selectors.cashAdvance.overlay.amountInput));
				
				applyMonths($(this).find(site.selectors.ultimateLoan.monthsSlider), $root.find(site.selectors.ultimateLoan.overlay.monthsInput));
				applyMonths($(this).find(site.selectors.cashAdvance.monthsSlider), $root.find(site.selectors.cashAdvance.overlay.monthsInput));
		
				
				$(this).find(site.selectors.ultimateLoan.interactions.amount).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.ultimateLoan.overlay.amountInput).val("£" + interactionValue);
					
					$(site.selectors.ultimateLoan.amountSlider).roundSlider({
						value: interactionValue
					});
				});
				
				$(this).find(site.selectors.ultimateLoan.interactions.duration).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.ultimateLoan.overlay.monthsInput).val(interactionValue + " DAYS");
					
					$(site.selectors.ultimateLoan.monthsSlider).roundSlider({
						value: interactionValue
					});
				});
				
				$(this).find(site.selectors.cashAdvance.interactions.amount).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.cashAdvance.overlay.amountInput).val("£" + interactionValue);
					
					$(site.selectors.cashAdvance.amountSlider).roundSlider({
						value: interactionValue
					});
				});
				
				$(this).find(site.selectors.cashAdvance.interactions.duration).on("input", function () {
					var interactionValue = $(this).val();
					
					$root.find(site.selectors.cashAdvance.overlay.monthsInput).val(interactionValue + " DAYS");
					
					$(site.selectors.cashAdvance.monthsSlider).roundSlider({
						value: interactionValue
					});
				});
			});
		}
	};
	
	site.enable();
	
	window.site = site;
	
})(window.jQuery, window.jQuery(document.body));