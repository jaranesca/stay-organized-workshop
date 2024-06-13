$(document).ready(function() {
    // Fetch users and populate the dropdown
    $.getJSON("http://localhost:8083/api/users", function(users) {
        users.forEach(function(user) {
            $("#userSelect").append(new Option(user.name, user.id));
        });
    });

    // Fetch and display ToDos when a user is selected
    $("#userSelect").change(function() {
        var userId = $(this).val();
        $.getJSON("http://localhost:8083/api/todos/byuser/" + userId, function(todos) {
            var tbody = $("#todoTable tbody");
            tbody.empty();
            todos.forEach(function(todo) {
                tbody.append(`
                    <tr>
                        <td>${todo.description}</td>
                        <td>${todo.category}</td>
                        <td>${todo.deadline}</td>
                        <td>${todo.priority}</td>
                        <td>${todo.completed ? '<img src="images/check.png">' : '<img src="images/x.png">'}</td>
                    </tr>
                `);
            });
        });
    });
});