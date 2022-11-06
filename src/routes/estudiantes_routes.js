import { Router } from "express";
import {
  mostrarInfoEstudiantes,
  mostrarPorIdEstudiantes,
  crearEstudiantes,
  actualizarEstudiante,
  eliminarEstudiante,
} from "../controllers/estudiantes_controller.js";
const router = Router();

router.get("/estudiantes", mostrarInfoEstudiantes);
router.get("/estudiantes/:id", mostrarPorIdEstudiantes);
router.post("/estudiantes", crearEstudiantes);
router.put("/estudiantes/:id", actualizarEstudiante);
router.delete("/estudiantes/:id", eliminarEstudiante);

export default router;
