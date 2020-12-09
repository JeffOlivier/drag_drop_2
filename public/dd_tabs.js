$( function() {
	var maxTabs = 5;
	var originalTabOrder = getTabOrder();
	var currentTabOrder = getTabOrder();
	
	// start off with the "update order" submit button disabled
	disableTabsUpdateOrderButton();
	
	/* *** The container that holds search form tabs that are currently being used *** */
	// (note: order for sortable() is zero-based, so we add 1 to everything we do below)
	$("#active_tabs").sortable({
		items: "li:not(.exclude)",
		revert: false,
		placeholder: "sortable-placeholder",
		tolerance: "pointer",
		opacity: 0.6,
		connectWith: "#extra_tabs",
		dropOnEmpty: true,
		update: function (event, ui) {
			// Check to see if the maximum number of tabs exist
			if (($(this).find('li').length) > maxTabs) {
				$(ui.sender).sortable('cancel');
			}
			
			// Update the colors of the tabs
			$('#active_tabs li').slice(0, 3).addClass('mobile'); // give the first three active tabs the class of "mobile"
			$('#active_tabs li').slice(3, 10).removeClass('mobile'); // remove the class "mobile" from all other active tabs
			$('#extra_tabs li').removeClass('mobile'); // remove the class "mobile" from all inactive/extra tabs
			
			// Update the data-order attributes of all used tabs
			$('#active_tabs > .single_tab').each(function (index) {
				$(this).attr('data-order', index+1); // add 1 because index is zero-based
			});
			
			// Update the data-order attribute of all unused tabs to be 0
			$('#extra_tabs > .single_tab').each(function (index) {
				$(this).attr('data-order', 0);
			});
			
			// Get the new order of the tabs
			currentTabOrder = getTabOrder(); 
	
			// Update the "update order" submit button
			checkForOrderChangesFromCurrent(originalTabOrder, currentTabOrder);
		}
	});
	
	/* *** The container that holds search form tabs that are NOT CURRENTLY USED *** */
	$("#extra_tabs").sortable({
		revert: false,
		placeholder: "sortable-placeholder",
		tolerance: "pointer",
		opacity: 0.6,
		connectWith: "#active_tabs",
		dropOnEmpty: true
	});
	
	
	/* SET EVENTS ON THE PAGE */
	$('#submitNewTabOrder').on('click', function(event) {
		/*
		$('#active_tabs > .single_tab').each(function (index) {
			var singleTabTypeId = $(this).attr('data-typeid');
			var singleTabOrder = $(this).attr('data-order');
			updateSingleTabOrder(singleTabTypeId, singleTabOrder);
		});
		
		// Set the order of all unused tabs to be zero
		$('#extra_tabs > .single_tab').each(function (index) {
			var singleTabSiteCode = $(this).attr('data-sitecode');
			var singleTabTypeId = $(this).attr('data-typeid');
			updateSingleTabOrder(singleTabSiteCode, singleTabTypeId, 0);
		});
		*/
		alert('Tab order function to update the database can be called here');
		
		// Disable the submit button
		disableTabsUpdateOrderButton();
		
		// Update the original tab order variable
		originalTabOrder = getTabOrder();
	});

});


function enableTabsUpdateOrderButton() {
	$("#submitNewTabOrder").addClass('enable').removeClass('disable');
	$("#submitNewTabOrder").attr("disabled", false);
}


function disableTabsUpdateOrderButton() {
	$("#submitNewTabOrder").addClass('disable').removeClass('enable');
	$("#submitNewTabOrder").attr("disabled", true);
}


function getTabOrder() {
	var tabOrder = '';
	var separator = '';

	$('#active_tabs > .single_tab').each(function (index) {
		separator = (index == 0) ? '' : ',';
		tabOrder = tabOrder + separator + $(this).attr("id").replace("tab_id_", "");
	});

	return (tabOrder.trim());
}


// Update the "Update Icon Order" submit button
function checkForOrderChangesFromCurrent (originalTabOrder, currentTabOrder) {
	// Check to see if the original order is different than the current order
	if (currentTabOrder == originalTabOrder) {
		disableTabsUpdateOrderButton();
	} else {
		enableTabsUpdateOrderButton();
	}
}
