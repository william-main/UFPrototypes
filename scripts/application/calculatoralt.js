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
				compareSwitch: '.slider',
				container: '.calculator-container',
				currencyOverlay: '.currency-overlay',
				monthOverlay: '.month-overlay',
				sliderContainer: '.slider-container',
				amountSlider: '.amount-slider',
				monthsSlider: '.months-slider',
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
					radius: 133,
					value: 5000,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "100000",
					min: "0",
					width: 20,
					readOnly: true
				});
				
				$(this).find(site.selectors.ultimateLoan.monthsSlider).roundSlider({
					radius: 103,
					value: 1,
					sliderType: "min-range",
					circleShape: "half-top",
					max: "12",
					min: "0",
					width: 10,
					readOnly: true,
					handleShape: "square"
				});
				
				$(this).find(site.selectors.cashAdvance.amountSlider).roundSlider({
					handleShape: "square",
					value: 5000,
					sliderType: "min-range",
					circleShape: "half-bottom",
					max: "50000",
					min: "0",
					width: 20,
					radius: 133,
					startAngle: 0,
					readOnly: true
				});
				
				$(this).find(site.selectors.cashAdvance.amountSlider).roundSlider("option", {"endAngle": "+140"});
				
				$(this).find(site.selectors.cashAdvance.monthsSlider).roundSlider({
					radius: 103,
					value: 30,
					sliderType: "min-range",
					circleShape: "half-bottom",
					max: "90",
					min: "0",
					width: 10,
					startAngle: 0,
					readOnly: true,
					handleShape: "square"
				});
				
				$(this).find(site.selectors.cashAdvance.monthsSlider).roundSlider("option", {"endAngle": "+120"});
				
				function applyAmounts(slider, overlay) {
					if (slider.find("input").val !== "") {
						var amount = slider.find("input").val();
						
						overlay.val(amount);
					}
				}
				
				function applyDays(slider, overlay) {
					if (slider.find("input").val !== "") {
						var months = slider.find("input").val();
						
						overlay.val(months);
					}
				}
				
				function applyMonths(slider, overlay) {
					if (slider.find("input").val !== "") {
						var months = slider.find("input").val();
						
						overlay.val(months);
					}
				}
				
				applyAmounts($(this).find(site.selectors.ultimateLoan.amountSlider), $root.find(site.selectors.ultimateLoan.overlay.amountInput));
				applyAmounts($(this).find(site.selectors.cashAdvance.amountSlider), $root.find(site.selectors.cashAdvance.overlay.amountInput));
				
				applyMonths($(this).find(site.selectors.ultimateLoan.monthsSlider), $root.find(site.selectors.ultimateLoan.overlay.monthsInput));
                applyDays($(this).find(site.selectors.cashAdvance.monthsSlider), $root.find(site.selectors.cashAdvance.overlay.monthsInput));

                var ulAmount = $(this).find(site.selectors.ultimateLoan.interactions.amount).val(),
                    ulDuration = $(this).find("#ul-duration-slider").val(),
                    ulRate = "0.015",
                    ulTotalInterest = (ulRate * ulDuration) * parseInt(ulAmount),
                    ulTotalRepayable = ulTotalInterest + parseInt(ulAmount),
                    ulMonthlyRepayment = ulTotalRepayable / ulDuration;

			        $(".ul-interest h1 span").text(ulTotalInterest.toFixed(0));
                    $(".ul-payments h1 span").text(ulMonthlyRepayment.toFixed(2));
                    $(".ul-total-repayments h1 span").text(ulTotalRepayable);

			    var caAmount = $(this).find(site.selectors.cashAdvance.interactions.amount).val(),
			        caDuration = $(this).find("#ca-duration-slider").val(),
			        caRate = "0.045",
			        caTotalInterest = parseInt(caAmount) * caRate,
                    caTotalRepayable = caTotalInterest + parseInt(caAmount);

			        $(".ca-rate p span").text(caDuration);
			        $(".ca-rate h1 span").text(caRate * 100);
			        $(".ca-interest h1 span").text(caTotalInterest);
			        $(".ca-payments h1 span").text("0");
			        $(".ca-total-repayments h1 span").text(caTotalRepayable);
				
				$(this).find(site.selectors.ultimateLoan.interactions.amount).on("input", function () {
					var interactionValue = $(this).val(),
					    duration = $(this).parent().find('#ul-duration-slider').val(),
                        rate = "0.015",
                        totalInterest = (rate * duration) * parseInt(interactionValue),
                        totalRepayable = totalInterest + parseInt(interactionValue),
                        monthlyRepayment = totalRepayable / duration;

				        $(".ul-interest h1 span").text(totalInterest.toFixed(0));
                        $(".ul-payments h1 span").text(monthlyRepayment.toFixed(2));
				        $(".ul-total-repayments h1 span").text(totalRepayable);
					
					$root.find(site.selectors.ultimateLoan.overlay.amountInput).val(interactionValue);
					
					if ($(site.selectors.compareSwitch).hasClass("active")) {
						$(site.selectors.ultimateLoan.amountSlider).roundSlider({
							value: interactionValue
                        });
						
						$(site.selectors.cashAdvance.interactions.amount).val(interactionValue);
						
						if ($root.find(site.selectors.ultimateLoan.overlay.amountInput).val() <= 50000) {
                            $root.find(site.selectors.cashAdvance.overlay.amountInput).val(interactionValue);

						    var caComparisonAmount = $root.find(site.selectors.cashAdvance.interactions.amount).val(),
						        caComparisonRate = "0.030",
                                caCompTotalInterest = parseInt(caComparisonAmount) * caComparisonRate,
                                caCompTotalRepayable = caCompTotalInterest + parseInt(caComparisonAmount);

                            $(".ca-interest h1 span").text(caCompTotalInterest);
						    $(".ca-payments h1 span").text("0");
						    $(".ca-total-repayments h1 span").text(caCompTotalRepayable);
						}
						
						$(site.selectors.cashAdvance.amountSlider).roundSlider({
							value: interactionValue
						});
					} else {
						$(site.selectors.ultimateLoan.amountSlider).roundSlider({
							value: interactionValue
						});
					}
				});
				
				$(this).find(site.selectors.ultimateLoan.interactions.duration).on("input", function () {
                    var interactionValue = $(this).val(),
				        amount = $(this).parent().find('#ul-amount-slider').val(),
				        rate = "0.015",
				        totalInterest = (rate * interactionValue) * parseInt(amount),
				        totalRepayable = totalInterest + parseInt(amount),
				        monthlyRepayment = totalRepayable / interactionValue;

                    $(".ul-interest h1 span").text(totalInterest.toFixed(0));
                    $(".ul-payments h1 span").text(monthlyRepayment.toFixed(2));
                    $(".ul-payments p").text(interactionValue == 1 ? interactionValue + " MONTHLY PAYMENT OF" : interactionValue + " MONTHLY PAYMENTS OF");
				    $(".ul-total-repayments h1 span").text(totalRepayable);
					
					$root.find(site.selectors.ultimateLoan.overlay.monthsInput).val(interactionValue);
					
					if ($(site.selectors.compareSwitch).hasClass("active")) {
						$(site.selectors.ultimateLoan.monthsSlider).roundSlider({
							value: interactionValue
						});
						
						// This is a horrendously bad idea and needs refactored,
						// but basically this accounts for the fact that the left side is in months,
						// and the right side is in days. Applying a multiplier of 30 to the month count corrects
						// the day count on the right side....
						$(site.selectors.cashAdvance.interactions.duration).val(interactionValue * 30);
						
						if ($root.find(site.selectors.ultimateLoan.overlay.monthsInput).val() * 30 <= 90) {
                            $root.find(site.selectors.cashAdvance.overlay.monthsInput).val(interactionValue * 30);

						    var caAmount = $root.find(site.selectors.cashAdvance.interactions.amount).val(),
						        caDuration = $root.find("#ca-duration-slider").val(),
						        caRate;

                                if (caDuration == 90) {
                                    caRate = "0.045"
                                } else if (caDuration == 60) {
                                    caRate = "0.030"
                                } else {
                                    caRate = "0.015"
                                }

						        caTotalInterest = parseInt(caAmount) * caRate,
						        caTotalRepayable = caTotalInterest + parseInt(caAmount);

						    $(".ca-rate p span").text(caDuration);
						    $(".ca-rate h1 span").text(caRate * 100);
						    $(".ca-interest h1 span").text(caTotalInterest);
						    $(".ca-payments h1 span").text("0");
						    $(".ca-total-repayments h1 span").text(caTotalRepayable);

                            $(".ca-rate p span").text(interactionValue * 30);
                            if (interactionValue * 30 == 30) {
                                $(".ca-rate h1 span").text("1.5");
                            } else if (interactionValue * 30 == 60) {
                                $(".ca-rate h1 span").text("3");
                            } else {
                                $(".ca-rate h1 span").text("4.5");
                            }
						}
						
						$(site.selectors.cashAdvance.monthsSlider).roundSlider({
							value: interactionValue * 30
						});
					} else {
						$(site.selectors.ultimateLoan.monthsSlider).roundSlider({
							value: interactionValue
						});
					}
				});
				
				$(this).find(site.selectors.cashAdvance.interactions.amount).on("input", function () {
				    var interactionValue = $(this).val(),
				        rate,
                        duration = $(this).parent().find('#ca-duration-slider').val();

				        if (duration == "30") {
				            rate = "0.015";
				        } else if (duration == "60") {
				            rate = "0.030";
				        } else {
				            rate = "0.045";
                        }

				    var totalInterest = parseInt(interactionValue) * rate,
                            totalRepayable = totalInterest + parseInt(interactionValue);

				    $(".ca-interest h1 span").text(totalInterest);
				    $(".ca-payments h1 span").text("0");
				    $(".ca-total-repayments h1 span").text(totalRepayable);

					$root.find(site.selectors.cashAdvance.overlay.amountInput).val(interactionValue);
					
					if ($(site.selectors.compareSwitch).hasClass("active")) {
						$(site.selectors.cashAdvance.amountSlider).roundSlider({
							value: interactionValue
						});
						
						$(site.selectors.ultimateLoan.interactions.amount).val(interactionValue);
						
						if ($root.find(site.selectors.cashAdvance.overlay.amountInput).val() <= 50000) {
                            $root.find(site.selectors.ultimateLoan.overlay.amountInput).val(interactionValue);

						    var ulCompAmount = $root.find(site.selectors.ultimateLoan.interactions.amount).val(),
						        ulCompDuration = $root.find("#ul-duration-slider").val(),
						        ulCompRate = "0.015",
						        ulCompTotalInterest = (ulCompRate * ulCompDuration) * parseInt(ulCompAmount),
						        ulCompTotalRepayable = ulCompTotalInterest + parseInt(ulCompAmount),
						        ulCompMonthlyRepayment = ulCompTotalRepayable / ulCompDuration;

						    $(".ul-interest h1 span").text(ulCompTotalInterest.toFixed(0));
						    $(".ul-payments h1 span").text(ulCompMonthlyRepayment.toFixed(2));
						    $(".ul-total-repayments h1 span").text(ulCompTotalRepayable);
						}
						
						$(site.selectors.ultimateLoan.amountSlider).roundSlider({
							value: interactionValue
						});
					} else {
						$(site.selectors.cashAdvance.amountSlider).roundSlider({
							value: interactionValue
						});
					}
				});
				
				$(this).find(site.selectors.cashAdvance.interactions.duration).on("input", function () {
                    var interactionValue = $(this).val(),
                        amount = $(this).parent().find('#ca-amount-slider').val(),
				        rate;

				    if (interactionValue == "30") {
				        rate = "0.015";
				    } else if (interactionValue == "60") {
				        rate = "0.030";
				    } else {
				        rate = "0.045";
				    }

				    var totalInterest = parseInt(amount) * rate,
				        totalRepayable = totalInterest + parseInt(amount);


                    $(".ca-rate p span").text(interactionValue);
				    $(".ca-rate h1 span").text(rate * 100);
				    $(".ca-interest h1 span").text(totalInterest);
				    $(".ca-payments h1 span").text("0");
				    $(".ca-total-repayments h1 span").text(totalRepayable);
					$root.find(site.selectors.cashAdvance.overlay.monthsInput).val(interactionValue);
					
					if ($(site.selectors.compareSwitch).hasClass("active")) {
						$(site.selectors.cashAdvance.monthsSlider).roundSlider({
							value: interactionValue
						});
						
						// This is a horrendously bad idea and needs refactored,
						// but basically this accounts for the fact that the left side is in months,
						// and the right side is in days. Applying a multiplier of 30 to the month count corrects
						// the day count on the right side....
						$(site.selectors.ultimateLoan.interactions.duration).val(interactionValue / 30);
						
						if ($root.find(site.selectors.cashAdvance.overlay.monthsInput).val() / 30 <= 12) {
                            $root.find(site.selectors.ultimateLoan.overlay.monthsInput).val(interactionValue / 30);

						    var ulCompAmount = $root.find(site.selectors.ultimateLoan.interactions.amount).val(),
						        ulCompDuration = parseInt($root.find("#ca-duration-slider").val()) / 30,
						        ulCompRate = "0.015",
						        ulCompTotalInterest = (ulCompRate * ulCompDuration) * parseInt(ulCompAmount),
						        ulCompTotalRepayable = ulCompTotalInterest + parseInt(ulCompAmount),
						        ulCompMonthlyRepayment = ulCompTotalRepayable / ulCompDuration;

						    $(".ul-interest h1 span").text(ulCompTotalInterest.toFixed(0));
                            $(".ul-payments h1 span").text(ulCompMonthlyRepayment.toFixed(2));
						    $(".ul-payments p").text(ulCompDuration == 1 ? ulCompDuration + " MONTHLY PAYMENT OF" : ulCompDuration + " MONTHLY PAYMENTS OF");
						    $(".ul-total-repayments h1 span").text(ulCompTotalRepayable);
						}
						
						$(site.selectors.ultimateLoan.monthsSlider).roundSlider({
							value: interactionValue / 30
						});
					} else {
						$(site.selectors.cashAdvance.monthsSlider).roundSlider({
							value: interactionValue
						});
					}
				});
			});
			
			$root.find(site.selectors.currencyOverlay).each(function () {
				$(this).on("keyup", function (event) {
					var selection = window.getSelection().toString(),
						$this = $(this),
						input = $this.val().replace(/[\D\s\._\-]+/g, "");
						
					if (selection !== '') {
						return;
					}

					// When the arrow keys are pressed, abort.
					if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
						return;
					}
					
					input = input ? parseInt(input, 10) : 0;

					$this.val(function () {
						return (input === 0) ? "" : input.toLocaleString("en-US");
					});
					
					$(this).closest(site.selectors.sliderContainer).find(site.selectors.amountSlider).roundSlider({
						value: input
					});
				});
			});
			
			$root.find(site.selectors.monthOverlay).each(function () {
				$(this).on("keyup", function (event) {
					var selection = window.getSelection().toString(),
						$this = $(this),
						input = $this.val();
					
					if (selection !== '') {
						return;
					}
					
					// When the arrow keys are pressed, abort.
					if ($.inArray(event.keyCode, [38, 40, 37, 39]) !== -1) {
						return;
					}
					
					input = input ? parseInt(input, 10) : 0;
					
					$(this).closest(site.selectors.sliderContainer).find(site.selectors.monthsSlider).roundSlider({
						value: input
					});
				});
			});
			
			$root.find(site.selectors.compareSwitch).each(function () {
				$(this).on("click", function () {
					$(this).toggleClass("active");
				});
            });

            $("#ul-instant-quote-cta").on("click", function(e) {
                e.preventDefault();
                var params = {
                    interest: $(".ul-interest h1 span").text(),
                    payments: $(".ul-payments h1 span").text(),
                    total: $(".ul-total-repayments h1 span").text(),
                    amount: $("#ul-amount-slider").val(),
                    duration: $("#ul-duration-slider").val()
                }
                var str = jQuery.param(params);

                location.href = "results.html?" + str;

            });

            $("#ca-instant-quote-cta").on("click", function (e) {
                e.preventDefault();
                var params = {
                    rate: $(".ca-rate h1 span").text(),
                    interest: $(".ca-interest h1 span").text(),
                    payments: $(".ca-payments h1 span").text(),
                    total: $(".ca-total-repayments h1 span").text(),
                    amount: $("#ca-amount-slider").val(),
                    dayduration: $("#ca-duration-slider").val()
                }
                var str = jQuery.param(params);

                location.href = "results.html?" + str;
            });
		}
	};
	
	site.enable();
	
	window.site = site;
	
})(window.jQuery, window.jQuery(document.body));