var doc = app.activeDocument;
var leftParent = doc.masterSpreads.itemByName("A-Left");
var rightParent = doc.masterSpreads.itemByName("B-Right");

for (var i = 0; i < doc.pages.length; i++) {
    var page = doc.pages[i];
    var textFrames = page.textFrames;

    // Look for the "PageSide" text field
    var pageSide = "";
    for (var j = 0; j < textFrames.length; j++) {
        var textContent = textFrames[j].contents;
        if (textContent == "Left") {
            pageSide = "Left";
            break;
        } else if (textContent == "Right") {
            pageSide = "Right";
            break;
        }
    }

    // Apply Parent Pages based on CSV data
    if (pageSide == "Left") {
        page.appliedMaster = leftParent;
    } else if (pageSide == "Right") {
        page.appliedMaster = rightParent;
    }
}

alert("Parent pages assigned based on CSV data!");