import { Router } from "express";
import {
  mostrarInfo,
  mostrarPorId,
  crearAsignatura,
  actualizarAsignatura,
  eliminarAsignatura,
} from "../controllers/asignaturas_controller.js";
const router = Router();

router.get("/conexion", mostrarInfo);
router.get("/conexion/:id", mostrarPorId);
router.post("/conexion", crearAsignatura);
router.put("/conexion/:id", actualizarAsignatura);
router.delete("/conexion/:id", eliminarAsignatura);

export default router;
