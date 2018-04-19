const $jobRole = $("#title");
const $otherTitle = $("#other-title");
const $design = $("#design");
const $jsPuns = $(".jsPuns");
const $heartJS = $(".heartJS");
const $activities = $(".activities");
const $selectTheme = $(".selectTheme");
const $payment = $("#payment");

// gives focus to the first text field on page load
function focusName() {
    const $name = $("label[for='name']");
    $name.focus();
}

// shows text input if the user selects "other" from the Job Role dropdown
$($jobRole).change(function () {
    if ($jobRole.val() === "other") {
        $otherTitle.show().focus();
    } else {
        $otherTitle.hide();
    }
});

// shows appropriate color choices based on which design in selected
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

// looks for changes in the activities fieldset
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

    // modifies the activities section based on user selections 
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
});


$($payment).change(function() {

});

// calls function on page load
focusName();

// hides text field for 'other' job role
$otherTitle.hide();
// hides color dropdown in shirt fieldset
$jsPuns.hide();
$heartJS.hide();

// appends total div below activities
$activities.append("<div class='total'></div>");

// sets credit card as the default payment choice
$("[value='credit card']").attr("selected", "selected");
