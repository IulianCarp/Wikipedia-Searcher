$(document).ready(function(){
  $("#form_id").submit(function(){
  return false;
});
  
  var input = document.getElementById("searchTerm");
input.addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === 13) {
        document.getElementById("search").click();
    }
});
  
  $("#search").click(function(){
    var searchTerm = $("#searchTerm").val();
    var newSearchTerm = searchTerm.replace(/ /g, "%20");
    var url = "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + newSearchTerm + "&callback=?&utf8=1&ascii=1&formatversion=1";
    
    $.ajax({
        type: "GET",
        url: url,
        async: false,
        dataType: "json",
        success: function (data){
          $("#results").html("");
           for (i = 0; i < data[1].length; i++) {
             var title = data[1][i];
             var description = data[2][i];
             var link = data[3][i];
             $("#results").append("<h3><a target='_blank' href=" + link + ">" + title + "</a><blockquote><p>" + description + "</p></blockquote></h3>");
           }
        },
        error: function (errorMessage) {
         alert("There was an Error! Please reload the page.")
        }
    });
    return false;
  });
});