const $name = $("label[for='name']");
let validEmail = false;
const $color = $("#colors-js-puns");
const $activities = $(".activities");
const $ccNum = $("#cc-num");

// tests if email is valid
function validateEmail(address) {
    const $mail = $("label[for='mail']");
    const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (filter.test(address) === false) {
        $mail.focus().css("color", "red");
        errorMessage($mail, "mailError", "Please enter a valid email address.");
    } else {
        validEmail = true;
        $mail.css("color", "black");
    }
}

// real-time validation for email address
$("#mail").keyup(function () {
    $("label[for='mailError']").remove();
    validateEmail($("#mail").val());
});

// shows text input if the user selects "other" from the Job Role dropdown
$("#title").change(function () {
    if ($("#title").val() === "other") {
        $("#other-title").show().focus();
    } else {
        $("#other-title").hide();
    }
});

// shows appropriate color choices based on which design in selected
// hides unavailable color choices
$($("#design")).change(function () {
    const $jsPuns = $(".jsPuns");
    const $heartJS = $(".heartJS");
    const $selectColor = $(".selectColor");

    $color.hide()
    $jsPuns.hide();
    $heartJS.hide();
    $selectColor.prop("selected", true);

    if ($("#design").val() === "js puns") {
        $color.show();
        $jsPuns.show();
    }
    if ($("#design").val() === "heart js") {
        $color.show();
        $heartJS.show();
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
$($("#payment")).change(function () {
    $("#credit-card").hide();
    $("#paypal").hide();
    $("#bitcoin").hide();

    if ($("[value='credit card']").is(":selected")) {
        $("#credit-card").show();
        $ccNum.focus();
    }
    if ($("[value='paypal']").is(":selected")) {
        $("#paypal").show();
    }
    if ($("[value='bitcoin']").is(":selected")) {
        $("#bitcoin").show();
    }
});

// creates and appends and error message for invalid submissions
function errorMessage(loc, className, msg) {
    loc.append("<label for=" + className + ">" + msg + "</label>");
    $("label[for=" + className + "]").css("backgroundColor", "red").fadeOut(8000);
}

// validates user input when register button is clicked
// prompts users if fields are not filled out or fill out incorrectly
$($("[type='submit']")).click(function (submit) {
    if ($("#name").val() === "") {
        submit.preventDefault();
        $name.focus().css("color", "red");
        errorMessage($name, "nameError", "Please enter a name");
    }
    if (validEmail === false) {
        submit.preventDefault();
        validateEmail($("#mail").val());
    }
    if ($("input:checked").length === 0) {
        submit.preventDefault();
        $(".error").css("color", "red").text("Please select at least one activity");
    }
    if ($("[value='credit card']").is(":selected")) {
        if ((!$.isNumeric($ccNum.val())) || ($ccNum.val().length < 13) || ($ccNum.val().length > 16)) {
            submit.preventDefault();
            $("label[for='cc-num']").focus().css("color", "red");
            if (!$.isNumeric($ccNum.val())) {
                errorMessage($("label[for='cc-num']"), "numError", "Should contain only numbers.")
            }
            if (($.isNumeric($ccNum.val())) && ($ccNum.val().length < 13) || ($ccNum.val().length > 16)) {
                errorMessage($("label[for='cc-num']"), "lengthError", "Should be between 13 and 16 digits.")
            }
        }
        if ((!$.isNumeric($("#zip").val())) || ($("#zip").val().length !== 5)) {
            submit.preventDefault();
            $("label[for='zip']").focus().css("color", "red");
            errorMessage($("label[for='zip']"), "zipError", "Invalid Zip Code");
        }
        if ((!$.isNumeric($("#cvv").val())) || ($("#cvv").val().length !== 3)) {
            submit.preventDefault();
            $("label[for='cvv']").focus().css("color", "red");
            errorMessage($("label[for='cvv']"), "cvvError", "Invalid CVV Code");
        }
    }
});

// puts focus on name field when page loads
$name.focus();

// hides text field for 'other' job role by default
$("#other-title").hide();
// hides color dropdown in shirt fieldset by default
$color.hide()
// hides paypall and bitcoin payment info by default
$("#paypal").hide();
$("#bitcoin").hide();

// sets credit card as the default payment & puts focus on card number field
$("[value='credit card']").prop("selected", true);

// will be used to display activity total
$activities.append("<div class='total'></div>");
// will be used to display error message when no activities are selected
$activities.prepend("<div class='error'></div>");
