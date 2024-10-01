$(document).ready(function(){
    loadTasks();

    $('#add-button').click(function(){
        $(this).addClass('active');
        setTimeout(() => {
            $(this).removeClass('active');
        }, 125);

        let task = $("#new-entry").val();
        if (task) {
            let taskHtml = createTaskHTML(task, false); 
            $("#ul-1").append(taskHtml);
            saveTasks();
            $("#new-entry").val('');
        }
    });

    $(document).on('click', '.complete-task', function(){
        let parentLi = $(this).closest('li');
        parentLi.find('.complete-task').remove();
        parentLi.find('.edit-task').remove();
        parentLi.find('.ul1-li-buttons').prepend('<button class="restore-task"><img src="./restore.svg" alt="Restore Task"></button>'); // Add restore button
        $("#ul-2").append(parentLi);
        saveTasks(); 
    });

    $(document).on('click', '.restore-task', function() {
        let parentLi = $(this).closest('li');
        parentLi.find('.restore-task').remove(); 

        let buttonHtml = ` <button class="complete-task"><img src="./completed.svg" alt="Complete Task"></button>
                            <button class="edit-task"><img src="./edit.svg" alt="Edit Task"></button>
                            <button class="delete-task"><img src="./delete.svg" alt="Delete Task"></button>`;

        parentLi.find('.ul1-li-buttons').html(buttonHtml); 
        $("#ul-1").append(parentLi); 

        saveTasks(); 
    });


    $(document).on('click', '.delete-task', function(){
        $(this).closest('li').remove();
        saveTasks(); 
    });

    $(document).on('click', '.edit-task', function(){
        let parentLi = $(this).closest('li');
        let taskNameSpan = parentLi.find('.task-name');
        let currentTaskName = taskNameSpan.text();
        let newTaskName = prompt("Edit Task:", currentTaskName);

        if (newTaskName) {
            taskNameSpan.text(newTaskName);
            saveTasks();
        }
    });

    function saveTasks() {
        let uncompletedTasks = [];
        let completedTasks = [];

        $("#ul-1 li").each(function(){
            uncompletedTasks.push($(this).find('.task-name').text());
        });

        $("#ul-2 li").each(function(){
            completedTasks.push($(this).find('.task-name').text());
        });

        localStorage.setItem('uncompletedTasks', JSON.stringify(uncompletedTasks));
        localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    }

    function loadTasks() {
        let uncompletedTasks = JSON.parse(localStorage.getItem('uncompletedTasks')) || [];
        let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];

        uncompletedTasks.forEach(function(task){
            let taskHtml = createTaskHTML(task, false); 
            $("#ul-1").append(taskHtml);
        });

        completedTasks.forEach(function(task){
            let taskHtml = createTaskHTML(task, true); 
            $("#ul-2").append(taskHtml);
        });
    }

    function createTaskHTML(task, isCompleted) {
    let taskHtml = `<li class="ul1-li">
                    <span class="task-name">${task}</span>
                    <div class="ul1-li-buttons">
                        ${isCompleted ? '<button class="restore-task"><img src="./restore.svg" alt="Restore Task"></button>' : 
                                        '<button class="complete-task"><img src="./completed.svg" alt="Complete Task"></button>'}
                        ${!isCompleted ? '<button class="edit-task"><img src="./edit.svg" alt="Edit Task"></button>' : ''}
                        <button class="delete-task"><img src="./delete.svg" alt="Delete Task"></button>
                    </div>
                </li>`;
    return taskHtml;
}
});