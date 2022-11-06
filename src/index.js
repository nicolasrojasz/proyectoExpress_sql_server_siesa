import express from "express";
import asignaturasRoutes from "./routes/asignaturas_routes.js";
import docentesRoutes from "./routes/docentes_routes.js";
import estudiantesRoutes from "./routes/estudiantes_routes.js";
import recordAcademicoRoutes from "./routes/recordAcademico_routes.js";
const app = express();
app.use(express.json());

app.use(asignaturasRoutes);
app.use(docentesRoutes);
app.use(estudiantesRoutes);
app.use(recordAcademicoRoutes);

app.listen(3000);
console.log("Servidor montando en el puerto 3000");
