const $name = $("label[for='name']");
let validName = false;
let validEmail = false;
let validNum = false;
let validZip = false;
let validCVV = false;
const $color = $("#colors-js-puns");
const $activities = $(".activities");
const $ccNum = $("#cc-num");

// tests if name is valid
function validateName(name) {
    if (name === "") {
        validName = false;
        $name.focus().css("color", "red");
        errorMessage($name, "nameError", "Please enter a name");
    } else {
        validName = true;
        $name.css("color", "black");
    }
}

// tests if email is valid
function validateEmail(address) {
    const $mail = $("label[for='mail']");
    const filter = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    $("label[for='mailError']").remove();
    if (filter.test(address) === false) {
        validEmail = false;
        $mail.focus().css("color", "red");
        errorMessage($mail, "mailError", "Please enter a valid email address.");
    } else {
        validEmail = true;
        $mail.css("color", "black");
    }
}

// tests if credit card number is valid
function validateNum(num) {
    $("label[for='numError']").remove();
    if (num === "") {
        validNum = false;
        $("label[for='cc-num']").focus().css("color", "red");
        errorMessage($("label[for='cc-num']"), "numError", "Please enter a credit card number.")
    } else if (!$.isNumeric(num) && (num.length > 0)) {
        validNum = false;
        $("label[for='cc-num']").focus().css("color", "red");
        errorMessage($("label[for='cc-num']"), "numError", "Should contain only numbers.")
    } else if (($.isNumeric(num)) && (num.length < 13) || (num.length > 16)) {
        validNum = false;
        $("label[for='cc-num']").focus().css("color", "red");
        errorMessage($("label[for='cc-num']"), "numError", "Should be between 13 and 16 digits.")
    } else {
        validNum = true;
        $("label[for='cc-num']").css("color", "black");
    }
}

// tests if zip code is valid
function validateZip(zip) {
    $("label[for='zipError']").remove();
    if ((!$.isNumeric(zip)) || (zip.length !== 5)) {
        validZip = false;
        $("label[for='zip']").focus().css("color", "red");
        errorMessage($("label[for='zip']"), "zipError", "Invalid Zip Code");
    } else {
        validZip = true;
        $("label[for='zip']").css("color", "black");
    }
}

// tests if cvv number is valid
function validateCVV(cvv) {
    $("label[for='cvvError']").remove();
    if ((!$.isNumeric(cvv)) || (cvv.length !== 3)) {
        validCVV = false;
        $("label[for='cvv']").focus().css("color", "red");
        errorMessage($("label[for='cvv']"), "cvvError", "Invalid CVV Code");
    } else {
        validCVV = true;
        $("label[for='cvv']").css("color", "black");
    }
}

// creates and appends and error message for invalid submissions
function errorMessage(loc, className, msg) {
    loc.append(`<label for="${className}">${msg}</label>`);
    $(`label[for="${className}"]`).css("backgroundColor", "red").fadeOut(8000);
}

// real-time validation for name address
$("#name").keyup(function () {
    validateName($("#name").val());
});

// real-time validation for email address
$("#mail").keyup(function () {
    validateEmail($("#mail").val());
});

// real-time validation for credit card number
$("#cc-num").keyup(function () {
    validateNum($("#cc-num").val());
});

// real-time validation for zip code
$("#zip").keyup(function () {
    validateZip($("#zip").val());
});

// real-time validation for cvv number
$("#cvv").keyup(function () {
    validateCVV($("#cvv").val());
});

// shows text input if the user selects "other" from the Job Role dropdown
$("#title").change(function () {
    if ($("#title").val() === "other") {
        $("#other-title").show().focus();
    } else {
        $("#other-title").hide();
    }
});

// shows appropriate color choices based on which design in selected and hides unavailable color choices
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
            $(".total").text(`Your current total is $${totalCost}`);
        } else {
            $(".total").empty();
        }
    }

    // disables overlapping activites based on user choices and calculates cost of selected activities 
    if ($("[name='all']").is(":checked")) {
        currentCost(200);
    }
    if ($("[name='js-frameworks']").is(":checked")) {
        $("[name='express']").prop("disabled", true).parent().css("text-decoration", "line-through");
        currentCost(100);
    } else {
        $("[name='express']").prop("disabled", false).parent().css("text-decoration", "");
    }
    if ($("[name='js-libs']").is(":checked")) {
        $("[name='node']").prop("disabled", true).parent().css("text-decoration", "line-through");
        currentCost(100);
    } else {
        $("[name='node']").prop("disabled", false).parent().css("text-decoration", "");
    }
    if ($("[name='express']").is(":checked")) {
        $("[name='js-frameworks']").prop("disabled", true).parent().css("text-decoration", "line-through");
        currentCost(100);
    } else {
        $("[name='js-frameworks']").prop("disabled", false).parent().css("text-decoration", "");
    }
    if ($("[name='node']").is(":checked")) {
        $("[name='js-libs']").prop("disabled", true).parent().css("text-decoration", "line-through");
        currentCost(100);
    } else {
        $("[name='js-libs']").prop("disabled", false).parent().css("text-decoration", "");
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

// shows the appropriate payment info based on which option is selected and hides other payment info
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

// validates user inputs when register button is clicked
$($("[type='submit']")).click(function (submit) {
    if (validName === false) {
        submit.preventDefault();
        validateName($("#name").val());
    }
    if (validEmail === false) {
        submit.preventDefault();
        validateEmail($("#mail").val());
    }
    if ($("input:checked").length === 0) {
        submit.preventDefault();
        $(".error").css("color", "red").text("Please select at least one activity");
    }
    if ($("[value='select_method']").is(":selected")) {
        submit.preventDefault();
        $("label[for='payment']").css("color", "red");
        errorMessage($("label[for='payment']"), "selectError", "Please choose a method of payment.")
    } else {
        $("label[for='payment']").css("color", "black");
    }
    if ($("[value='credit card']").is(":selected")) {
        if (validNum === false) {
            submit.preventDefault();
            validateNum($("#cc-num").val());
        }
        if (validZip === false) {
            submit.preventDefault();
            validateZip($("#zip").val());
        }
        if (validCVV === false) {
            submit.preventDefault();
            validateCVV($("#cvv").val());
        }
    }
});

// puts focus on name field when page loads
$name.focus();

// hides text field for 'other' job role by default
$("#other-title").hide();
// hides color dropdown in shirt fieldset by default
$color.hide()
// hides paypal and bitcoin payment info by default
$("#paypal").hide();
$("#bitcoin").hide();

// sets credit card as the default payment
$("[value='credit card']").prop("selected", true);

// will be used to display activity total
$activities.append("<div class='total'></div>");
// will be used to display error message when no activities are selected
$activities.prepend("<p class='error'></p>");
