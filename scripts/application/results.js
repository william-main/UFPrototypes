(function ($, $doc) {

    "use strict";

    var site;

    site = {
        $window: $(window),
        loaded: false,

        enable: function() {
            site.parse();
        },

        parse: function($root) {
            $root = $root || $doc;

            $root.first().each(function() {
                site.settings.apply(this);
				site.testData.apply(this);
            });
        },

        settings: function() {
            var $root = $(this);

            var urlParams = new URLSearchParams(window.location.search);

            var entries = urlParams.entries();
            for (var pair of entries) {
                switch (pair[0]) {
                    case "interest":
                        $("td.quote-section .total-interest span").text(pair[1]);
                        break;
                    case "payments":
                        $("td.quote-section .monthly-payments span").text(pair[1]);
                        break;
                    case "total":
                        $("td.quote-section .total-repayment span").text(pair[1]);
                        break;
                    case "amount":
                        $(".request-quote h1.amount span").text("£" + pair[1]);
                        break;
                    case "duration":
                        $(".request-quote h1.duration span").text(pair[1] == "1" ? pair[1] + " MONTH" : pair[1] + " MONTHS");
                        break;
                    case "dayduration":
                        $(".request-quote h1.duration span").text(pair[1] + " DAYS");
                        break;
                }
            }
        },
		
		testData: function() {
			var $root = $(this);
			
			var originalQuote = $(".original-quote, .compare-section");
			
			$(".box-input input#businessName").on("keyup", function (e) {
				switch($(this).val()) {
					case "sky":
						//Creating fake nonsense here...
						var interestCalc = parseFloat($("td.quote-section .interest-rate span").text()) - 0.4;
						var amountCalc = parseFloat($("td.quote-section .total-interest span").text()) < 100 ? parseFloat($("td.quote-section .total-interest span").text())  - 50: parseFloat($("td.quote-section .total-interest span").text()) - 150;
						var monthlyPaymentsCalc = parseFloat($("td.quote-section .monthly-payments span").text()) - 150;
						var totalRepaymentCalc = parseFloat($("td.quote-section .total-repayment span").text()) - 200;
						
						$("td.compare-section .interest-rate span").text(0.4);
						$("td.compare-section .total-interest span").text(parseFloat($("td.quote-section .total-interest span").text()) < 100 ? 50 : 150);
						$("td.compare-section .monthly-payments span").text(150);
						$("td.compare-section .total-repayment span").text(200);
						
						$("td.original-quote .interest-rate span").text(interestCalc);
						$("td.original-quote .total-interest span").text(amountCalc);
						$("td.original-quote .monthly-payments span").text(monthlyPaymentsCalc);
						$("td.original-quote .total-repayment span").text(totalRepaymentCalc);
									
						originalQuote.fadeIn();
						break;
					case "tesco":
						//Creating fake nonsense here...
						var interestCalc = parseFloat($("td.quote-section .interest-rate span").text()) - 0.2;
						var amountCalc = parseFloat($("td.quote-section .total-interest span").text()) < 100 ? parseFloat($("td.quote-section .total-interest span").text())  - 25: parseFloat($("td.quote-section .total-interest span").text()) - 70;
						var monthlyPaymentsCalc = parseFloat($("td.quote-section .monthly-payments span").text()) - 60;
						var totalRepaymentCalc = parseFloat($("td.quote-section .total-repayment span").text()) - 100;
						
						$("td.compare-section .interest-rate span").text(0.2);
						$("td.compare-section .total-interest span").text(parseFloat($("td.quote-section .total-interest span").text()) < 100 ? 25 : 70);
						$("td.compare-section .monthly-payments span").text(60);
						$("td.compare-section .total-repayment span").text(100);
						
						$("td.original-quote .interest-rate span").text(interestCalc);
						$("td.original-quote .total-interest span").text(amountCalc);
						$("td.original-quote .monthly-payments span").text(monthlyPaymentsCalc);
						$("td.original-quote .total-repayment span").text(totalRepaymentCalc);
						
						originalQuote.fadeIn();
						break;
					case "test business":
						//Creating fake nonsense here...
						var interestCalc = parseFloat($("td.quote-section .interest-rate span").text()) - 0.2;
						var amountCalc = parseFloat($("td.quote-section .total-interest span").text()) < 100 ? parseFloat($("td.quote-section .total-interest span").text())  - 40: parseFloat($("td.quote-section .total-interest span").text()) - 100;
						var monthlyPaymentsCalc = parseFloat($("td.quote-section .monthly-payments span").text()) - 75;
						var totalRepaymentCalc = parseFloat($("td.quote-section .total-repayment span").text()) - 30;
						
						$("td.compare-section .interest-rate span").text(0.2);
						$("td.compare-section .total-interest span").text(parseFloat($("td.quote-section .total-interest span").text()) < 100 ? 40 : 100);
						$("td.compare-section .monthly-payments span").text(75);
						$("td.compare-section .total-repayment span").text(30);
						
						$("td.original-quote .interest-rate span").text(interestCalc);
						$("td.original-quote .total-interest span").text(amountCalc);
						$("td.original-quote .monthly-payments span").text(monthlyPaymentsCalc);
						$("td.original-quote .total-repayment span").text(totalRepaymentCalc);
						
						originalQuote.fadeIn();
						break;
					case "another business":
						//Creating fake nonsense here...
						var interestCalc = parseFloat($("td.quote-section .interest-rate span").text()) - 0.4;
						var amountCalc = parseFloat($("td.quote-section .total-interest span").text()) < 100 ? parseFloat($("td.quote-section .total-interest span").text())  - 50: parseFloat($("td.quote-section .total-interest span").text()) - 150;
						var monthlyPaymentsCalc = parseFloat($("td.quote-section .monthly-payments span").text()) - 150;
						var totalRepaymentCalc = parseFloat($("td.quote-section .total-repayment span").text()) - 200;
						
						$("td.compare-section .interest-rate span").text(0.4);
						$("td.compare-section .total-interest span").text(parseFloat($("td.quote-section .total-interest span").text()) < 100 ? 50 : 150);
						$("td.compare-section .monthly-payments span").text(150);
						$("td.compare-section .total-repayment span").text(200);
						
						$("td.original-quote .interest-rate span").text(interestCalc);
						$("td.original-quote .total-interest span").text(amountCalc);
						$("td.original-quote .monthly-payments span").text(monthlyPaymentsCalc);
						$("td.original-quote .total-repayment span").text(totalRepaymentCalc);
						
						originalQuote.fadeIn();
						break;
					default: 
						originalQuote.fadeOut();
				}
			});
		}
    }

    site.enable();

    window.site = site;

})(window.jQuery, window.jQuery(document.body));