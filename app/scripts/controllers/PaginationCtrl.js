/****************************
 ***** Pagination Controller *****
 ****************************/

(function() {
    'use strict';



    //http://blog.mongodirector.com/fast-paging-with-mongodb/ - to update
    //https://sammaye.wordpress.com/2012/05/25/mongodb-paging-using-ranged-queries-avoiding-skip/


    function paginationCtrl($scope, itemCount, items, ContentService) {
        console.log('Pagination  Controller');
        console.log('itemCount',itemCount);
        console.log('items',items);
        $scope.myItems = items.data;
        $scope.message = 'hi!';
         //Pagination definition.
        $scope.currentPage = 1;
        $scope.totalItems = itemCount.data;
        $scope.pageSize = itemCount.data / 3;
        $scope.pagination = {
            current: 1
        };

        $scope.pageChangeHandler = function(num) {
            console.log('change to page ' + num);
            ContentService.getItems($scope.pageSize, num).success(function(data) {
            	console.log('pageChange success data',data);
            	$scope.myItems = data;
            });
        };
    }

    angular
        .module('sampleApp')
        .controller('PaginationController',  ['$scope', 'itemCount', 'items', 'ContentService', paginationCtrl]);

}());