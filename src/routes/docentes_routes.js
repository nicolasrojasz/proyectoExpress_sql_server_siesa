import { Router } from "express";
import {
  mostrarInfoDocente,
  mostrarPorIdDocente,
  crearDocente,
  actualizarDocente,
  eliminarDocente,
} from "../controllers/docentes_controller.js";
const router = Router();

router.get("/docentes", mostrarInfoDocente);
router.get("/docentes/:id", mostrarPorIdDocente);
router.post("/docentes", crearDocente);
router.put("/docentes/:id", actualizarDocente);
router.delete("/docentes/:id", eliminarDocente);

export default router;
