$(document).ready(function () {
  // Load items on page load

  // Create or Update Item
  $("#formtask").submit(function (event) {
    event.preventDefault();

    $.ajax({
      url: "/create/",
      method: "POST",
      data: $(this).serialize(),
      success: function (response) {
        // Agrega la nueva tarea a la lista de tareas sin recargar la página
        $("#tasklist").append(`
          <div id="task-${response.id}">
          <h3>${response.title}</h3>
          <h4>False</h4>
          <button class="delete-btn bg-red-500" data-id="${response.id}">Delete</button>
          <a href="{% url 'update' ${response.id} %}" class="update-btn">Update</a>
          <a href="#" class="complete-btn" data-id="${response.id}">Complete</a>
          </div>
          `);
        $("#formtask")[0].reset();
      },
      error: function () {
        alert("Error creating task.");
      },
    });
  });
  $("#tasklist").on("click", ".delete-btn", function (e) {
    e.preventDefault();
    const taskId = $(this).data("id");
    $.ajax({
      url: `/delete/${taskId}/`,
      method: "POST",
      headers: {
        "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val(),
      },
      success: function () {
        // Elimina el elemento de la tarea de la lista
        $(`#task-${taskId}`).remove();
      },
      error: function () {
        alert("Error deleting task.");
      },
    });
  });

  // AJAX para completar una tarea
  $("#tasklist").on("click", ".complete-btn", function (e) {
    e.preventDefault();
    const taskId = $(this).data("id");
    $.ajax({
      url: `/complete/${taskId}/`,
      method: "POST",
      headers: {
        "X-CSRFToken": $('input[name="csrfmiddlewaretoken"]').val(),
      },
      success: function () {
        // Actualiza el estado de la tarea a completado
        $(`#task-${taskId}`).remove();
      },
      error: function () {
        alert("Error completing task.");
      },
    });
  });
  // Other CRUD operations (update, delete) to be implemented similarly
});
