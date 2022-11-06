import { Router } from "express";
import {
  mostrarInfoRecordAcademico,
  mostrarPorIdRecordAcademico,
  crearRecordAcademico,
  actualizarRecordAcademico,
  eliminarRecordAcademico,
} from "../controllers/recordAcademico_controller.js";
const router = Router();

router.get("/recordAcademico", mostrarInfoRecordAcademico);
router.get("/recordAcademico/:id", mostrarPorIdRecordAcademico);
router.post("/recordAcademico", crearRecordAcademico);
router.put("/recordAcademico/:id", actualizarRecordAcademico);
router.delete("/recordAcademico/:id", eliminarRecordAcademico);

export default router;
