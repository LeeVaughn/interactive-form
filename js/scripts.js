const $jobRole = $("#title");
const $otherTitle = $("#other-title");
const $design = $("#design");
const $jsPuns = $(".jsPuns");
const $heartJS = $(".heartJS");
const $activities = $(".activities");

// hides text field for 'other' job role
$otherTitle.hide();
// hides color dropdown in shirt fieldset
$jsPuns.hide();
$heartJS.hide();

// gives focus to the first text field on page load
function focusName() {
    const $name = $("label[for='name']");
    $name.focus();
}

// shows text input if the user selects "other" from the Job Role dropdown
$($jobRole).change(function() {
    if ($jobRole.val() === "other") {
        $otherTitle.show().focus();
    } else {
        $otherTitle.hide();
    }
});

// shows colors appropriate to which design is selected
$($design).change(function () {
    $jsPuns.hide();
    $heartJS.hide();

    if ($design.val() === "js puns") {
        $jsPuns.show();
    }
    if ($design.val() === "heart js") {
        $heartJS.show();
    }
});

$($activities).change(function() {
    console.log("change");

});

// calls function on page load
focusName();
