var companyLookupJson;
var ajaxCall;
var loadingGifActive = false;

// run company lookup on every change
$('.businessLookup').on('input', function () {
    lookupCompany();
});

// run payment calculation on every change
$('.loan-amount').on('input', function () {
    getPayments();
});

// run payment calculation on every change
$('.loan-term').on('input', function () {
    getPayments();
});

// look up the company
function lookupCompany() {
    
    $('*[data-js="loading-gif"]').show();
    $('*[data-js-results-box] ul').html('');
    if ($.trim($(".businessLookup").val()).length > 2) {
        
        if (!!ajaxCall) {

            ajaxCall.abort();
        }

            $('*[data-js-results-box-input]').addClass('results-box-input__loading');
            var gifUrl = '/assets/img/UltimateFinance_logo_icon_blue.gif';

            
            if (!loadingGifActive) {

                $('*[data-js="loading-gif"]').attr('src', gifUrl);
                
                setInterval(function () {
                    $('*[data-js="loading-gif"]').attr('src', gifUrl);
                }, 2500);
               
                loadingGifActive = true;
            } else if ($('*[data-js-results-box-input]').length === 3) {
                $('*[data-js="loading-gif"]').attr('src', gifUrl);
            }

            //clear out current values
            $('.business-regno').val("");
            $('.business-name').val("");
            $('.location-1').val("");
            $('.location-2').val("");
            $('.location-3').val("");
            $('.location-4').val("");
            $('.location-5').val("");
            $('.postcode').val("");

             ajaxCall = $.ajax({
                url: "/api/CompanyLookup/GetCompanies",
                data: "q=" + $(".businessLookup").val(),
                //error: function() {
                //    $('*[data-js-results-box]').html('');
                //    $('*[data-js-results-box]').html('<ul><li class="results-box--item" tabindex="0">Sorry, we are experiencing technical difficulties. Please call 0800 121 7757 or try again later.</li></ul>').slideDown(500);
                //},
                success: function (json) {
                    $('.error').hide();
                    $('*[data-js="loading-gif"]').hide();
                   
                    $('*[data-js-results-box-input]').removeClass('results-box-input__loading');

                    var companyData = "";
                    var obj = jQuery.parseJSON(json);

                    $.each(obj, function (key, value) {
                        companyData += "<div class=\"business-result\"";
                        companyData += "data-business-regno=\"" + value.BusinessReferenceNumber + "\"";
                        companyData += "data-business-name=\"" + value.BusinessName + "\"";
                        companyData += "data-location-1=\"" + value.LocationLine1 + "\"";
                        companyData += "data-location-2=\"" + value.LocationLine2 + "\"";
                        companyData += "data-location-3=\"" + value.LocationLine3 + "\"";
                        companyData += "data-location-4=\"" + value.LocationLine4 + "\"";
                        companyData += "data-location-5=\"" + value.LocationLine5 + "\"";
                        companyData += "data-postcode=\"" + value.Postcode + "\"";
                        companyData += ">" + value.BusinessName + "</div>"

                        $('*[data-js-results-box] ul').append("<li class='results-box--item' tabindex='0'>" + value.BusinessName + "</li>");
                    });

                    if (obj.length === 0) {
                        //$('*[data-js-results-box-input] input').val("Sorry, there were no matches").attr('data-no-results','');
                        //get the results from the hidden field
                        var resultsMessage =
                            'Sorry, there were no results. Please ensure you enter your full LLP or limited company name.';
                        var umbracoMessage = $("#noResultsMessage").val();
                        if (umbracoMessage) {
                            resultsMessage = umbracoMessage;
                        }
                        setTimeout(function() {
                                $('*[data-js-results-box]').html('');
                                $('*[data-js-results-box]')
                                    .html('<ul><li class="results-box--item" tabindex="0">' +
                                        resultsMessage +
                                        '</li></ul>')
                                    .slideDown(500);
                            },
                            3000);


                    } else {
                        $('*[data-js-results-holder]').html(obj);

                        $('*[data-js-results-box] ul').append("<a class='no-results-box' href='/contact-us'><li class='no-results-text results-box--item' tabindex='0'>Can't see your business?</li></a>");
                        $('*[data-js-results-box]').slideDown(500); 


                        $('.results').html(companyData);

                        $('.results-box--item').click(function () {
                            populateCompanyDetails($(this));
                        });
                    }

                    
                    $('.results-box--item').keydown(function (e) {
                        if (e.keyCode === 13) {
                            populateCompanyDetails($(this));

                            return false;
                        }

                        if (e.keyCode === 40) {
                            $(this).next('.results-box--item').focus();

                            return false;
                        }

                        if (e.keyCode === 38) {
                            if ($(this).is(':first-child')) {
                                $('*[data-js-results-box-input]').find('input').focus();
                            } else {
                                $(this).prev('.results-box--item').focus();
                            }

                            return false;
                        }
                    });

                    $('*[data-js-results-box-input]').find('input').keydown(function (e) {
                        if (e.keyCode === 40) {
                            if ($('.results-box--item').length > 0) {
                                $('.results-box--item')[0].focus();
                            }
                        }
                    });
                    

                    companyLookupJson = obj;
                }


            });
    }
    else {
        $('.results').html("");
        $('.results-box').hide();
        $('*[data-js="loading-gif"]').hide();
    }

    return false;
}

// get payments
function getPayments() {
    $.ajax({
        //TODO: don't do and clear results if values aren't valid - run clientside validation and check values are valid?
        url: "/api/PaymentCalculator/GetPayments",
        data: "amount=" + $(".loan-amount").val() + "&term=" + $(".loan-term").val(),
        success: function (json) {
            var repaymentDetails = "";
            if (json != null) {
                repaymentDetails += "Borrowing <strong>£" + json.amount + "</strong> + Interest <strong>£" + json.totalInterest.toFixed(2) + "</strong> = Total to repay <strong>£" + json.totalPayable.toFixed(2) + "</strong><br />";
                repaymentDetails += json.term + " weekly repayments of <strong>£" + json.weeklyRepayment.toFixed(2) + "</strong>";
            }
            companyLookupJson = json;

            $('.payment-calculation').html(repaymentDetails);

        }
    });
    return false;
}

function populateCompanyDetails(el) {
    $('*[data-js-results-box]').slideUp(500);
    var selectedName = el.text();

    var selectedDetails = $('*[data-business-name = "' + selectedName + '"]')

    $('.businessLookup').val(selectedName);

    $('.results').html("");
    $('.business-regno').val(selectedDetails.attr("data-business-regno"));
    $('.business-name').val(selectedDetails.attr("data-business-name"));
    $('.location-1').val(selectedDetails.attr("data-location-1"));
    $('.location-2').val(selectedDetails.attr("data-location-2"));
    $('.location-3').val(selectedDetails.attr("data-location-3"));
    $('.location-4').val(selectedDetails.attr("data-location-4"));
    $('.location-5').val(selectedDetails.attr("data-location-5"));
    $('.postcode').val(selectedDetails.attr("data-postcode"));
}