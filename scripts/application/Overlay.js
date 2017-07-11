(function ($, $doc) {
    "use strict";

    var site;

    site = {
        $window: $(window),
        loaded: false,

        enable: function() {
            site.selectors = {
                'overlayArea': '.js-quote-tool-area',
                'overlay': '.js-quote-tool-overlay',
                'overlayContent': '.content-overlay',
                'limitedCompanyBtn': '.limited-company-btn'
            }

            site.parse();
        },

        parse: function($root) {
            $root = $root || $doc;

            $root.first().each(function() {
                site.displayOverlay.apply(this);

                $(window).on('resize',
                    function(e) {
                        var toolHeight = $(site.selectors.overlayArea).height();
                        $(site.selectors.overlay).height(toolHeight);
                    });
            });
        },

        displayOverlay: function () {
            if (Cookies.get('quoteOverlaySession') !== "true") {
                setTimeout(function () {
                    $(site.selectors.overlay).fadeIn("slow");
                    $(site.selectors.overlayContent).fadeIn("slow");

                    var toolHeight = $(site.selectors.overlayArea).height();
                    $(site.selectors.overlay).height(toolHeight);
                }, 500);
            }

            $(site.selectors.limitedCompanyBtn).on('click', function (e) {
                e.preventDefault();

                Cookies.set('quoteOverlaySession', 'true', { expires: 30 });
                $(site.selectors.overlay).fadeOut('fast');
                $(site.selectors.overlayContent).fadeOut('fast');
            });
        }
    };

    site.enable();

    window.site = site;


})(window.jQuery, window.jQuery(document.body));
