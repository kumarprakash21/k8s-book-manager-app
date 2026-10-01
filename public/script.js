var app = angular.module('myApp', []);

app.controller('myCtrl', function($scope, $http) {
    $scope.books = [];
    $scope.search = '';
    $scope.loading = true;
    $scope.saving = false;
    $scope.error = '';
    $scope.editing = false;

    function getData() {
        $scope.loading = true;
        $http.get('/book').then(function(res) {
            $scope.books = res.data;
            $scope.error = '';
        }, function(err) {
            $scope.error = err.data && err.data.message || 'Unable to load books.';
        }).finally(function() { $scope.loading = false; });
    }

    function clearForm() { $scope.book = {}; $scope.editing = false; }

    $scope.saveBook = function(form) {
        if (form.$invalid) return;
        $scope.saving = true;
        $scope.error = '';
        var body = angular.copy($scope.book);
        body.pages = Number(body.pages);
        var request = $scope.editing
            ? $http.put('/book/' + encodeURIComponent($scope.originalIsbn), body)
            : $http.post('/book', body);
        request.then(function() { clearForm(); getData(); }, function(err) {
            $scope.error = err.data && err.data.message || 'Unable to save the book.';
        }).finally(function() { $scope.saving = false; });
    };

    $scope.del_book = function(book) {
        if (!window.confirm('Delete "' + book.name + '"?')) return;
        $http.delete('/book/' + encodeURIComponent(book.isbn)).then(getData, function(err) {
            $scope.error = err.data && err.data.message || 'Unable to delete the book.';
        });
    };

    $scope.editBook = function(book) {
        $scope.book = angular.copy(book);
        $scope.originalIsbn = book.isbn;
        $scope.editing = true;
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    $scope.cancelEdit = clearForm;
    clearForm();
    getData();
});
