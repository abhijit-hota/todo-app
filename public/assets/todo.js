// TODO: Make a vanilla JS version of this.

$(document).ready(function(){
    $('form').on('submit', function(){
  
        var inputTask = $('form input');
        var todo = {task: inputTask.val()};

        //The AJAX request for handling the submit of tasks
        $.ajax({
          type: 'POST',
          url: '/todo',
          data: todo,
          success: function(data){ location.reload(); }
        });
        
        //clear input after task is cleared
        inputTask.val('');
        return false;
    });

    $('li').on('click', function(){
        var task = $(this).text().replace(/ /g, "-");

        //For marking tasks as done
        $.ajax({
          type: 'DELETE',
          url: '/todo/' + task,
          success: function(data){ location.reload(); }
        });
    });
  });