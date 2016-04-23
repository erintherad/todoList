$(function() {
  var tasks;
  //show list of to-dos if in storage
  if (localStorage.tasks) {
    tasks = JSON.parse(localStorage.tasks);
  }else {
    tasks = [];
  }
  
  function addTaskToList(val) {
    //check for empty inputs and spaces
    if(val.length>0 && val.trim()) {
      $('#list').append("<li class='listItem align-right'>" + val +  
      "<a href='#' class='cancel-btn'>Cancel Task</a>" +
      "<a href='#' class='done-btn'><i class='fa fa-check-circle-o fa-2x' aria-hidden='true'></i></a></li>");
      $('li:odd').css('float', 'right');
      $('li:even').css('float', 'left');
    } 
  }
  //iterate and add to-do value to list
  for(var i=0;i<tasks.length;i++) {
    addTaskToList(tasks[i]);
  }
  
  var addTask = function() {
    // get value from #todo input
    var val = $('#todo').val();
    
    // add the task to the array
    tasks.push(val);
    
    // save to local storage
    localStorage.tasks = JSON.stringify(tasks);
    
    // append the to-do to the list
    addTaskToList(val);
    
    // reset the input field and focus it.
    $('#todo').val("").focus();
  };
  
  $('#add-btn').on(addTask);
  $('#todo').keyup(function(event) {
    if (event.keyCode === 13) {
      addTask();
    }
  });
  
  $('.done-btn').on( 'click', function() {
    $(this).parent('li').toggleClass('done');
  });    
  
  $('.cancel-btn').on( 'click', function() {
    $(this).parent('li').fadeOut();
  });
  
  $('#plusBtn').on('click', function() {
    $('#todo').fadeIn();
  });
  
});