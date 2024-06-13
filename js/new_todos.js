$(document).ready(function() {
    // Fetch users and populate the dropdown
    $.getJSON("http://localhost:8083/api/users", function(users) {
        users.forEach(function(user) {
            $("#userSelect").append(new Option(user.name, user.id));
        });
    });

    // Fetch categories and populate the dropdown
    $.getJSON("http://localhost:8083/api/categories", function(categories) {
        categories.forEach(function(category) {
            $("#categorySelect").append(new Option(category.name, category.name));
        });
    });

    // Handle form submission
    $("#newTodoForm").submit(function(event) {
        event.preventDefault();
        var newTodo = {
            userid: $("#userSelect").val(),
            category: $("#categorySelect").val(),
            description: $("#description").val(),
            deadline: $("#deadline").val(),
            priority: $("#prioritySelect").val()
        };

        $.ajax({
            url: "http://localhost:8083/api/todos",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(newTodo),
            success: function() {
                alert("ToDo added successfully!");
                $("#newTodoForm")[0].reset();
            },
            error: function() {
                alert("Error adding ToDo.");
            }
        });
    });
});
