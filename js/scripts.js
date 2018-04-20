const $name = $("label[for='name']");
// const $mail = $("#mail").val();
const $jobRole = $("#title");
const $otherTitle = $("#other-title");
const $design = $("#design");
const $jsPuns = $(".jsPuns");
const $heartJS = $(".heartJS");
const $activities = $(".activities");
const $selectTheme = $(".selectTheme");
const $payment = $("#payment");
const $creditCard = $("#credit-card");
const $ccNum = $("#cc-num");
const $zip = $("#zip");
const $cvv = $("#cvv");
const $paypal = $("#paypal");
const $bitcoin = $("#bitcoin");

// shows text input if the user selects "other" from the Job Role dropdown
$($jobRole).change(function () {
    if ($jobRole.val() === "other") {
        $otherTitle.show().focus();
    } else {
        $otherTitle.hide();
    }
});

// shows appropriate color choices based on which design in selected
// hides unavailable color choices
$($design).change(function () {
    $jsPuns.hide();
    $heartJS.hide();
    $selectTheme.text("Please Select a T-shirt Theme");

    if ($design.val() === "js puns") {
        $jsPuns.show();
        $selectTheme.text("Select Color");
    }
    if ($design.val() === "heart js") {
        $heartJS.show();
        $selectTheme.text("Select Color");
    }
});

// listens for changes in the activities fieldset
$($activities).change(function () {
    let totalCost = 0;

    // calculates current user total and adds it to a div
    function currentCost(cost) {
        totalCost += cost;

        if (totalCost > 0) {
            $(".total").text("Your current total is $" + totalCost);
        } else {
            $(".total").empty();
        }
    }

    // disables overlapping activites based on user choices
    // and calculates cost of selected activities 
    if ($("[name='all']").is(":checked")) {
        currentCost(200);
    }
    if ($("[name='js-frameworks']").is(":checked")) {
        $("[name='express']").prop("disabled", true);
        currentCost(100);
    } else {
        $("[name='express']").prop("disabled", false);
    }
    if ($("[name='js-libs']").is(":checked")) {
        $("[name='node']").prop("disabled", true);
        currentCost(100);
    } else {
        $("[name='node']").prop("disabled", false);
    }
    if ($("[name='express']").is(":checked")) {
        $("[name='js-frameworks']").prop("disabled", true);
        currentCost(100);
    } else {
        $("[name='js-frameworks']").prop("disabled", false);
    }
    if ($("[name='node']").is(":checked")) {
        $("[name='js-libs']").prop("disabled", true);
        currentCost(100);
    } else {
        $("[name='js-libs']").prop("disabled", false);
    }
    if ($("[name='build-tools']").is(":checked")) {
        currentCost(100);
    }
    if ($("[name='npm']").is(":checked")) {
        currentCost(100);
    }
    if ($("input:checked").length === 0) {
        $(".total").empty();
    }

    // removes error message when activity is selected
    $(".error").empty();
});

// shows the appropriate payment info based on which option is selected
// hides other payment info
$($payment).change(function () {
    $creditCard.hide();
    $paypal.hide();
    $bitcoin.hide();

    if ($("[value='credit card']").is(":selected")) {
        $creditCard.show();
        $("#cc-num").focus();
    }
    if ($("[value='paypal']").is(":selected")) {
        $paypal.show();
    }
    if ($("[value='bitcoin']").is(":selected")) {
        $bitcoin.show();
    }
});

// validates user input when register button is clicked
// prompts users if fields are not filled out or fill out incorrectly
$($("[type='submit']")).click(function (submit) {
    if ($("#name").val() === "") {
        submit.preventDefault();
        $name.focus().css("color", "red");
    }

    function validateEmail(address) {
        const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (filter.test(address) === false) {
            submit.preventDefault();
            $("#mail").focus();
            $("label[for='mail']").css("color", "red");
        }
    }
    validateEmail($("#mail").val());

    if ($("input:checked").length === 0) {
        submit.preventDefault();
        $(".error").css("color", "red").text("Please select at least one activity");
    }

    if ($("[value='credit card']").is(":selected") && (!$.isNumeric($ccNum.val())) || ($ccNum.val().length < 13) || ($ccNum.val().length > 16)) {
        submit.preventDefault();
        $ccNum.focus();
        $("label[for='cc-num']").css("color", "red");
    }
    if ($("[value='credit card']").is(":selected") && (!$.isNumeric($zip.val())) || ($zip.val().length !== 5)) {
        submit.preventDefault();
        $zip.focus();
        $("label[for='zip']").css("color", "red");
    }
    if ($("[value='credit card']").is(":selected") && (!$.isNumeric($cvv.val())) || ($cvv.val().length !== 3)) {
        submit.preventDefault();
        $cvv.focus();
        $("label[for='cvv']").css("color", "red");
        console.log("cvv error");
    }

});

// puts focus on name field when page loads
$name.focus();

// hides text field for 'other' job role by default
$otherTitle.hide();
// hides color dropdown in shirt fieldset by default
$jsPuns.hide();
$heartJS.hide();
// hides paypall and bitcoin payment info by default
$paypal.hide();
$bitcoin.hide();

// sets credit card as the default payment & puts focus on card number field
$("[value='credit card']").attr("selected", true);

// will be used to display activity total
$activities.append("<div class='total'></div>");
// will be used to display error message when no activities are selected
$activities.prepend("<div class='error'></div>");



    //     function validateCC(cardNumber) {
    //         const filter = /^\d+$/;

    //         if (!$.isNumeric($("#cc-num").val())) {
    //             submit.preventDefault();
    //             $("#cc-num").focus();
    //             $("label[for='cc-num']").css("color", "red");
    //             console.log("cc error");
    //         }

    //         // if (filter.test(cardNumber) === false) {
    //         //     submit.preventDefault();
    //         //     $("#cc-num").focus();
    //         //     $("label[for='cc-num']").css("color", "red");
    //         //     console.log("cc error");
    //         // }

    //     //     // if ($("[value='credit card']").is(":selected") && (filter.test(cardNumber) === false) && ($ccNum.length < 13) || ($ccNum.length > 16)) {
    //     //     //     submit.preventDefault();
    //     //     //     $("#cc-num").focus();
    //     //     //     $("label[for='cc-num']").css("color", "red");
    //     //     //     console.log("cc error");
    //     //     // }
    //     }
    //     validateCC($ccNum);
