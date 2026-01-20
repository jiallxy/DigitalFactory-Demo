// sorttables.js
//$(document).ready(function() {

document.addEventListener("DOMContentLoaded", function () {
// ============================================================
    // 1. TABLE CONFIGURATION (Define your specific rules here)
    // ============================================================
    var tableConfigs = {
        '.PartTable': { 
            // 9 Columns
            order: [[6, "asc"]], 
            noSortTargets: [0, 7, 8],
            pageLength:5
        },
        '.MainIndexTable': { 
            // 10 Columns (Adjust '0' to whichever column you want sorted)
            order: [[1, "asc"]], 
            noSortTargets: [7,8,9], // Add indices here to disable sorting on specific columns,
            pageLength:5
        },
        '.StandardIndexTable': { 
            // 4 Columns
            order: [[0, "asc"]], 
            noSortTargets: [] , // Add indices here to disable sorting on specific columns,
            pageLength:5
        },
        '.YearlyIndexTable': { 
            // 1 Column
            order: [[0, "asc"]], 
            noSortTargets: [] , // Add indices here to disable sorting on specific columns,
            pageLength:5
        },
        '.sortable-table': { 
            // 1 Column
            order: [[0, "asc"]], 
            noSortTargets: [] , // Add indices here to disable sorting on specific columns,
            pageLength:5
        }
    };

    // ============================================================
    // 2. SHARED INITIALIZATION LOGIC
    // ============================================================
    var dataTables = []; // Repository for Global Search

    // Loop through each class defined in the config above
    for (var selector in tableConfigs) {
        var config = tableConfigs[selector];
        var $tables = $(selector);

        if ($tables.length > 0) {
            $tables.each(function() {
                var tableElement = $(this);
                
                // --- Shared Dynamic Paging Logic ---
                var rowCount = tableElement.find('tbody tr').length;
                var usePaging = (rowCount > config.pageLength);

                if (usePaging) {
                    tableElement.addClass('paging-enabled');
                } else {
                    tableElement.addClass('paging-disabled');
                }

                // --- Initialize DataTable with Specific Config ---
                var dt = tableElement.DataTable({
                    "paging": usePaging, 
                    "info": usePaging, 
                    "responsive": true,
                    "drawCallback": function(settings) {updateRowColors();},
                    "pageLength": config.pageLength,
                    "lengthMenu": [5,10, 25, 50, 100,150],
                    // Apply the SPECIFIC order from config
                    "order": config.order, 
                    "columnDefs": [
                        // Apply the SPECIFIC no-sort targets from config
                        { "orderable": false, "targets": config.noSortTargets }
                    ],
                    "stateSave": true,
                    "dom": 'lrtip' // Hide default search
                });
                
                // Add to global array for the search bar
                dataTables.push(dt);
            });
        }
    }



    // ============================================================
    // 3. GLOBAL SEARCH & CLEAR LOGIC
    // ============================================================
    var $globalSearch = $('#globalSearch');
    var $clearButton = $('#clearSearch');

    if ($globalSearch.length > 0) {
        $globalSearch.on('keyup', function() {
            var searchTerm = this.value;
            $.each(dataTables, function(index, table) {
                table.search(searchTerm).draw();
            });
        });
    }

    if ($clearButton.length > 0) {
        $clearButton.on('click', function() {
            if ($globalSearch.length > 0) {
                $globalSearch.val('').focus();
            }
            $.each(dataTables, function(index, table) {
                table.search('').draw();
            });
        });
    }

// 1. Function to update colors
function updateRowColors() {
    $('.done-checkbox').each(function () {
        // .toggleClass(className, state) is excellent and clean
        $(this).closest('tr').toggleClass('row-done', $(this).is(':checked'));
    });
}

// 2. Initial run for page load
updateRowColors();

// 3. IMPROVED: Event Delegation
// This ensures checkboxes on Page 2, 3, etc., still trigger the color change
$(document).on('change', '.done-checkbox', function () {
    updateRowColors();
});

});

