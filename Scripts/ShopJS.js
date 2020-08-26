var currentList = {};

// onclick event for create shoppingList button
function createShoppingList() {
    // Get entered list name
    currentList.name = $("#shoppingListName").val();
    currentList.items = new Array();

    // Web service call
    $.ajax({
        type: "POST",
        dataType: "json",
        url: "api/ShoppingList/",       // api/<controller name, wo 'controller'>/
        data: currentList,
        success: function (result) {
            showShoppingList();
        },
        error: function () {
            console.error("Something bad happened!");
        }
    });
}

function showShoppingList() {
    console.info("showShoppingList");

    // Set title of list and empty it
    $("#shoppingListTitle").html(currentList.name);
    $("#shoppingListItems").empty();

    // Hide Create Div and show List Div
    $("#createListDiv").hide();
    $("#shoppingListDiv").show();

    // Set focus to item name field
    $("#newItemName").focus();
    // If press return then call addItem automatically
    $("#newItemName").keyup(function (event) {
        if (event.keyCode == 13) {
            addItem();
        }
    });
}



// onclikc event of add items button
function addItem() {
    var newItem = {};
    newItem.name = $("#newItemName").val();
    currentList.items.push(newItem);
    console.info(currentList);

    // redraw the list of items
    drawItems();
    $("#newItemName").val("");

}

function drawItems() {
    var $list = $("#shoppingListItems").empty();

    for (i = 0; i < currentList.items.length; i++) {
        // Get an item and create a li for it.
        var currentItem = currentList.items[i];
        var $li = $("<li>").html(currentItem.name).attr("id", "item_" + i);
        // Add D/C buttons to item
        var $deleteBtn = $("<button onclick='deleteItem(" + i + ")'>D</button>").appendTo($li);
        var $checkBtn = $("<button onclick='checkItem(" + i + ")'>C</button>").appendTo($li);
        // Add li to list
        $li.appendTo($list);

    }
}

// Removed item at index 
function deleteItem(index) {
    currentList.items.splice(index, 1);
    drawItems();
}

function checkItem(index) {
    console.info("checkItem");
    if ($("#item_" + index).hasClass("checked")) {
        $("#item_" + index).removeClass("checked");
    }
    else {
        // add the CSS class checked
        $("#item_" + index).addClass("checked");
    }
}


function getShoppingListById(id) {
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "api/ShoppingList/" + id,
        success: function (result) {
            currentList = result;
            showShoppingList();
            drawItems();
        }
    });
}


$(document).ready(function () {
    console.info("ready");
    // Set focus to shopping list name field
    $("#shoppingListName").focus();
    // If press return then call createShoppingList automatically
    $("#shoppingListName").keyup(function (event) {
        if (event.keyCode == 13) {
            createShoppingList();
        }
    })

    // Get shoppingList ID from URL and display.
    var pageURL = window.location.href;
    var idIndex = pageURL.indexOf("?id=");
    if (idIndex != -1) {
        getShoppingListById(pageURL.substring(idIndex + 4));
    }
});

