(function () {
    $(document).ready(function () {
        readParamsAndReplace();
    });
})();
function readParamsAndReplace() {
    var businessName = $.QueryString["cp_bus"];
    var email = $.QueryString["cp_em"];
    var amount = $.QueryString["cp_amnt"];
    var fallbackBusinessName = $('*[data-campaign-business]')[0];
    var fallbackAmount = $('*[data-campaign-amount]')[0];

    //Campaign Business Name
    replaceTokenOnPage('$$cp_bus$$', businessName, fallbackBusinessName, 'campaign-business');
    //Campaign Amount
    replaceTokenOnPage('$$cp_amnt$$', amount, fallbackAmount, 'campaign-amount');
    //Email
    if (email !== undefined) {
        var allEmailFields = $('.emailaddress');
        $(allEmailFields).each(function() {
            var emailInputOuterElem = $(this);
            if (emailInputOuterElem !== undefined) {
                replaceFormInputText(emailInputOuterElem, email);
            }
        });
    }
    //BusinessName into form
    if (businessName !== undefined) {
        var allBusinessFields = $('.businessname');
        $(allBusinessFields).each(function () {
            var businessOuterElem = $(this);
            if (businessOuterElem !== undefined) {
                replaceFormInputText(businessOuterElem, businessName);
            }
        });
    }
}
//replaces token values on page with either the query param - fallback or blank
function replaceTokenOnPage(token, query, fallback, attr) {
    if (query !== undefined) {
        findElementsWithText(token, query);
    } else if (fallback !== undefined) {
        var fallBackText = $(fallback).data(attr);
        findElementsWithText(token, fallBackText);
    } else {
        findElementsWithText(token, '');
    }
}
function findElementsWithText(textToReplace, text) {
    var elements = $("*:contains('" + textToReplace + "')").filter(
        function () {
            return $(this).find("*:contains('" + textToReplace + "')").length == 0;
        }
    );
    $(elements).each(function () {
        var eltext = $(this).text();
        var replaced = eltext.replace(textToReplace, text);
        $(this).text(replaced);
    });
}
//pre populates form that match query
function replaceFormInputText(formOuterElem, text) {
    $(formOuterElem).find('input').val(text);
}
//Get's Query Param'
(function ($) {
    $.QueryString = (function(a) {
        if (a == "") return {};
        var b = {};
        for (var i = 0; i < a.length; ++i) {
            var p = a[i].split('=', 2);
            if (p.length != 2) continue;
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
        return b;
    })(window.location.search.substr(1).split('&'));
})(jQuery);