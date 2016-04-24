$(function() {
  //show list of to-dos if in storage
  if (localStorage.tasks) {
    var tasks = JSON.parse(localStorage.tasks);
  }else {
    var tasks = [];
  }
  
  function addDoneClickHandler(doneButton) {
    doneButton.on('click', function() {
      var taskIndex = $(this).parent('li').attr('data-task-index');
      var task = tasks[taskIndex];

      $(this).parent('li').toggleClass('done');
      if ($(this).parent('li').hasClass('done')) {
        task.done = true;
        $('.notification').fadeIn();
      } else {
        task.done = false;
        $('.notification').fadeOut();
      }
      
      localStorage.tasks = JSON.stringify(tasks);
    });
  }
  
  function addTaskToList(newTask, taskIndex) {
    var newListItem = $("<li class='listItem align-right'>" + newTask.text + "</li>");
    newListItem.attr('data-task-index', taskIndex);
    if (newTask.done === true) {
      newListItem.addClass('done');
    }

    var doneButton = $("<a href='javascript:void(0)' class='done-btn'>"+ 
    "<i class='fa fa-check-circle-o fa-2x' aria-hidden='true'></i></a>");
    addDoneClickHandler(doneButton);
    newListItem.append(doneButton);
    
    //check for empty inputs and spaces
    if(newTask.text.length>0 && newTask.text.trim()) {
      $('#list').append(newListItem);
      $('li:odd').addClass('left');
      $('li:even').addClass('right');
    } 
  }
  //iterate and add to-do value to list
  for(var i = 0; i < tasks.length; i++) {
    addTaskToList(tasks[i], i);
  }
  
  var addTask = function() {
    // get value from #todo input
    var val = $('#todo').val();
    
    // add the task to the array
    var newTask = {
      text: val,
      done: false
    };
    tasks.push(newTask);
    
    // save to local storage
    localStorage.tasks = JSON.stringify(tasks);
    
    var taskIndex = tasks.length - 1;
    // append the to-do to the list
    addTaskToList(newTask, taskIndex);
    
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