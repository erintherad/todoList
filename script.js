$(function() {
  //show list of to-dos if in storage
  if (localStorage.tasks) {
    var tasks = JSON.parse(localStorage.tasks);
  }else {
    var tasks = [];
  }
  
  function addTaskToList(val) {
    //check for empty inputs and spaces
    if(val.length>0 && val.trim()) {
      $('#list').append("<li>" + val + "  <a href='#' class='done-btn'>Done</a>" + " " + "<a href='#' class='cancel-btn'>Cancel Task</a></li>");
    } 
  }
  
  //iterate and add to-do value to list
  for(var i=0;i<tasks.length;i++) {
    addTaskToList(tasks[i]);
  }
  
  var addTask = function(){
    // get value from #todo input
    var val = $('#todo').val();
    
    // add the task to the array
    tasks.push(val);
    
    // save to local storage
    localStorage["tasks"] = JSON.stringify(tasks);
    
    // append the to-do to the list
    addTaskToList(val);
    
    // reset the input field and focus it.
    $('#todo').val("").focus();
  }
  
  $('#add-btn').on(addTask);
  $('#todo').keyup(function(e){
    if (e.keyCode === 13) {
      addTask();
    }
  });
  
  $('.done-btn').on( 'click', function() {
    $(this).parent('li').addClass('done');
  });    
  
  $('.cancel-btn').on( 'click', function() {
    $(this).parent('li').fadeOut();
  });
  
});