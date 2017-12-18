//listen for form submission
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save a bookmark
function saveBookmark(e) {
    //get form values
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    //make sure both a url and a site name were entered
    if (!siteName || !siteUrl) {
        alert('Please complete the form.');
        return false;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    }

    //validate the url entered is in correct format
    var expression =
        /^(?:(?:https?|ftp):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,}))\.?)(?::\d{2,5})?(?:[/?#]\S*)?$/i;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please enter a valid URL.');
        return false;
    }
    /*
    //local storage test
    //set an item, get an item, delete an item
    localStorage.setItem('test', 'hello');
    console.log(localStorage.getItem('test'));
    localStorage.removeItem('test');
    console.log(localStorage.getItem('test'));
    */

    //test if bookmarks is null if so create an array
    if (localStorage.getItem('bookmarks')===null) {
        var bookmarks = [];
        bookmarks.push(bookmark);
        //set to localstorage and it is a JSON array so have to turn it into an array before storing
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //if something is stored then get the item from localstorage
        //use JSON.stringify to turn into string(use when setting)
        //use JSON.parse to turn string into JSON (use when getting)
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add the bookmark to array
        bookmarks.push(bookmark);
        //back to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }
    //re-fetch bookmarks, so the updates will display
    fetchBookmarks();

    //prevent form from submitting
    e.preventDefault();
}
//delete bookmarks
//get the bookmarks from localstorage and loop through them, if 1 matches the url
//get that one out and remove it
function deleteBookmark(url) {
    //get from localstorage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //loop through the bookmarks
    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].url == url) {
            bookmarks.splice(i, 1);
        }
    }
    //after deletion, reset the local storage to update with the change
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    //re-fetch bookmarks, so the updates will display
    fetchBookmarks();
}


//Get the bookmarks
function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //get output ID
    var bookmarksResults = document.getElementById('bookmarksResults');
    //use the innerHTML to set the html of bookmarksResults
    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        bookmarksResults.innerHTML += '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="'+url+'">Visit</a> ' +
            ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a> ' +

            '</h3>'+
            '</div>';
    }

}