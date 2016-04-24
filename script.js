$(function() {
  //show list of to-dos if in storage
  if (localStorage.tasks) {
    var tasks = JSON.parse(localStorage.tasks);
  }else {
    var tasks = [];
  }
  
  function addDoneClickHandler(doneButton) {
    doneButton.on('click', function() {
      $(this).parent('li').toggleClass('done');
      if ($(this).parent('li').hasClass('done')) {
        $('.notification').fadeIn();
      } else {
        $('.notification').fadeOut();
      }
    });
  }
  
  function addTaskToList(val) {
    var newListItem = $("<li class='listItem align-right'>" + val + "</li>");
    var doneButton = $("<a href='javascript:void(0)' class='done-btn'><i class='fa fa-check-circle-o fa-2x' aria-hidden='true'></i></a>");
    addDoneClickHandler(doneButton);
    newListItem.append(doneButton);
    
    //check for empty inputs and spaces
    if(val.length>0 && val.trim()) {
      $('#list').append(newListItem);
      $('li:odd').addClass('left');
      $('li:even').addClass('right');
    } 
  }
  //iterate and add to-do value to list
  for(var i = 0; i < tasks.length; i++) {
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
    //event = return key up
    if (event.keyCode === 13) {
      addTask();
    }
  });   
  
  $('.cancel-btn').on( 'click', function() {
    $(this).parent('li').fadeOut();
  });
  
  $('#plusBtn').on('click', function() {
    $('#todo').fadeToggle();
  });
  
  $('.markAll').on('click', function() {
    $( "li" ).each(function( index ) {
      $( "li" ).addClass('done');
      $('.notification').fadeIn();
    });
  });
  $('.closeNotification').on('click', function () {
    $('.notification').fadeOut(400);
  });
});