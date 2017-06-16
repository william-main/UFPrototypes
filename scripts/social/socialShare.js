(function() {
    $(document).ready(function () {
        //A function to loop through all the social icons and add the correct shareable links with the correct metadata
        initSocialButtons();
    });
})();

function initSocialButtons() {
    var twitterShareUrl = "https://twitter.com/share";
    var facebookShareUrl = "https://facebook.com/sharer/sharer.php?u=";
    var linkedInShareUrl = "https://www.linkedin.com/shareArticle?mini=true&url=";

    //~Get Meta Data First~//
    //--Twitter--//
    var twitterUrl = $("meta[name='twitter:url']").attr("content");
    var twitterDescription = $("meta[name='twitter:description']").attr("content");
    var twitterComplete = twitterShareUrl + "?url=" + twitterUrl + "&text=" + twitterDescription;
    //--LinkedIn && Facebook (Using OpenGraph)--//
    var pageUrl = window.location.href;
    var facebookComplete = facebookShareUrl + pageUrl;
    var linkedInComplete = linkedInShareUrl + pageUrl;

    //Apply to all social icons on page
    $("a[data-js-share-twitter]").each(function () {
        $(this).attr("href", twitterComplete);
    });

    $("a[data-js-share-facebook]").each(function () {
        $(this).attr("href", facebookComplete);
    });

    $("a[data-js-share-linkedin]").each(function () {
        $(this).attr("href", linkedInComplete);
    });
}