let tareas = JSON.parse(localStorage.getItem("tareas")) || [];
let idEditar = null;

// Mostrar tareas al cargar -- Christhoper Sosa
window.addEventListener("DOMContentLoaded", mostrarTareas);

// Agregar o modificar -- Christhoper Sosa
document.getElementById("agregar-btn").addEventListener("click", () => {
  const nombre = document.getElementById("nombre").value.trim();
  const descripcion = document.getElementById("descripcion").value.trim();
  const fecha = document.getElementById("fecha").value;

  if (nombre === "" || descripcion === "" || fecha === "") return alert("Completa todos los campos");

  if (idEditar) {
    // Modificar -- Christhoper Sosa
    tareas = tareas.map(t =>
      t.id === idEditar ? { id: t.id, nombre, descripcion, fecha } : t
    );
    idEditar = null;
  } else {
    // Agregar -- Christhoper Sosa
    const nueva = {
      id: Date.now(),
      nombre,
      descripcion,
      fecha,
    };
    tareas.push(nueva);
  }

  guardarTareas();
  mostrarTareas();
  limpiarFormulario();
});

// Mostrar tareas -- Christhoper Sosa
function mostrarTareas(filtro = "") {
  const cuerpo = document.getElementById("tabla-tareas");
  cuerpo.innerHTML = "";

  tareas
    .filter(t => t.nombre.toLowerCase().includes(filtro.toLowerCase()))
    .forEach(t => {
      const fila = document.createElement("tr");

      fila.innerHTML = `
        <td>${t.nombre}</td>
        <td>${t.descripcion}</td>
        <td>${t.fecha}</td>
        <td>
          <button onclick="editarTarea(${t.id})">✏️ Editar</button>
          <button onclick="eliminarTarea(${t.id})">🗑️ Eliminar</button>
        </td>
      `;

      cuerpo.appendChild(fila);
    });
}

// Guardar -- Christhoper Sosa
function guardarTareas() {
  localStorage.setItem("tareas", JSON.stringify(tareas));
}

// Eliminar -- Edson Rojas
function eliminarTarea(id) {
  if (confirm("¿Estás seguro de eliminar esta tarea?")) {
    tareas = tareas.filter(t => t.id !== id);
    guardarTareas();
    mostrarTareas();
  }
}

// Editar -- Edson Rojas
function editarTarea(id) {
  const tarea = tareas.find(t => t.id === id);
  document.getElementById("nombre").value = tarea.nombre;
  document.getElementById("descripcion").value = tarea.descripcion;
  document.getElementById("fecha").value = tarea.fecha;
  idEditar = id;
}

// Limpiar inputs -- Edson Rojas
function limpiarFormulario() {
  document.getElementById("nombre").value = "";
  document.getElementById("descripcion").value = "";
  document.getElementById("fecha").value = "";
}

// Buscar -- Edson Rojas
document.getElementById("buscar").addEventListener("input", (e) => {
  mostrarTareas(e.target.value);
});
