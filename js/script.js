$(document).ready(function(){
var token = localStorage.getItem('token');
$(".btn.btn-success").on("click", function(event){
  event.preventDefault();
  let fName = $("#firstname").val();
  let lName = $("#lastname").val();
  let email = $("#email").val();
  let password = $("#password").val();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/register",
    method: "POST",
    data:{
      fName: fName,
      lName: lName,
      email: email,
      password: password
    },
    success: function(event){
   localStorage.setItem("token", event.token)
    window.location.href="../html/login.html"
  },
  })
});
$("#LoginButton").on("click", function(event){
  window.location.href="../html/login.html";
});
$(".btn.btn-lg.btn-primary.btn-block").on("click", function(event){
  event.preventDefault();
  let email = $("#inputEmail").val();
  let password = $("#inputPassword").val();
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/users/login",
    type: "POST",
    data:{
      email: email,
      password: password
    },
    success: function(event){
      console.log('its working');
      localStorage.setItem('token', event.response.token);
      window.location.href="../html/newsfeed.html";
  },
    error: function(event){
      console.log("error", event)}
  });
});
$("#submitPost").on("click", function(event){
  event.preventDefault();
  let submitVal = $("#newPost").val();
  console.log(submitVal);
  $.ajax({
    url: "https://horizons-facebook.herokuapp.com/api/1.0/posts",
    method: "POST",
    data:{
      token: token,
      content: submitVal
    },
    success: function(event){
      console.log("its workiing for posting");
    }

  })
});
$("#mainBody").on("click","#submitReply",function(event){
  event.preventDefault();
  let commentVal = $("#newReply").val();
  let thisVal = $(this).closest("strong").attr("id");
  console.log(thisVal);
  console.log(event)
  $.ajax({
    url:`https://horizons-facebook.herokuapp.com/api/1.0/posts/comments/$()`,
    type:"POST",
    data:{
      token:token,
      content:commentVal
    },
    success: function(event){
      console.log("its working");
    },
    error: console.log("erorr",event)
  })
});
$("#mainBody").on("click","#likeButton", function(event){
  console.log("this works");
});
$.ajax({
  url: "https://horizons-facebook.herokuapp.com/api/1.0/posts/",
  method: "GET",
  data:{
    token:token
  },
  success: function(event){
    console.log(event.response);
    for(let i = 0; i < event.response.length; i++){
    let myHTML = `<div class="media text-muted pt-3">
              <img data-src="holder.js/32x32?theme=thumb&bg=007bff&fg=007bff&size=1" alt="" class="mr-2 rounded">
              <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                <strong class="d-block text-gray-dark" id=${event.response[i]["_id"]}>${event.response[i]["poster"]["name"]}</strong>
                ${event.response[i]["content"]}
              </p><button type="button" class="btn btn-primary likebutton" id="likeButton" >Like</button>
              <p</p>
              <div class="input-group mb-3">
          <input type="text" id="newReply" class="form-control" placeholder="Reply Here" aria-label="Recipient's username" aria-describedby="basic-addon2">
          <div class="input-group-append">
            <button class="btn btn-outline-secondary" type="button" id="submitReply">Reply</button>
          </div>
        </div>
            </div>`;
    $("#recentUpdate").append(myHTML);
    }
  }
});
});
