import { config } from "../db.js";
import sql from "mssql";
import Docentes_model from "../models/docentes_model.js";

export const mostrarInfoDocente = async (req, res) => {
  try {
    const conexion = await sql.connect(config);
    const resultado = await conexion.request().execute("SP_MOSTRAR_DOCENTES");

    console.log(resultado);
    res.json(resultado.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const mostrarPorIdDocente = async (req, res) => {
  try {
    let parametro = req.params.id;
    let conexion = await sql.connect(config);
    let consulta = await conexion
      .request()
      .input("ID", sql.Int, parametro)
      .execute("SP_MOSTRAR_ID_DOCENTE");
    res.json(consulta.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const crearDocente = async (req, res) => {
  try {
    let { CODIGO, NOMBRE, APELLIDOS, COD_ASIGNATURA } = req.body;
    let nuevoDocente = new Docentes_model(
      CODIGO,
      NOMBRE,
      APELLIDOS,
      COD_ASIGNATURA
    );
    let conexion = await sql.connect(config);
    let insertar = await conexion
      .request()
      .input("CODIGO", sql.NVarChar, nuevoDocente.CODIGO)
      .input("NOMBRE", sql.NVarChar, nuevoDocente.NOMBRE)
      .input("APELLIDOS", sql.NVarChar, nuevoDocente.APELLIDOS)
      .input("COD_ASIGNATURA", sql.NVarChar, nuevoDocente.COD_ASIGNATURA)
      .execute("SP_CREAR_DOCENTE");
    res.json(insertar.recordset);
    res.send("Mostrando POST");
  } catch (error) {
    console.log(error);
  }
};

export const actualizarDocente = async (req, res) => {
  try {
    let { id } = req.params;

    let conexion = await sql.connect(config);
    let { CODIGO, NOMBRE, APELLIDOS, COD_ASIGNATURA } = req.body;
    let actualizarDocente = new Docentes_model(
      CODIGO,
      NOMBRE,
      APELLIDOS,
      COD_ASIGNATURA
    );
    let actualizar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .input("CODIGO", sql.NVarChar, actualizarDocente.CODIGO)
      .input("NOMBRE", sql.NVarChar, actualizarDocente.NOMBRE)
      .input("APELLIDOS", sql.NVarChar, actualizarDocente.APELLIDOS)
      .input("COD_ASIGNATURA", sql.NVarChar, actualizarDocente.COD_ASIGNATURA)
      .execute("SP_ACTUALIZAR_DOCENTE");
    res.json(actualizar.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarDocente = async (req, res) => {
  try {
    let { id } = req.params;
    let conexion = await sql.connect(config);
    let eliminar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM DOCENTES WHERE ID = @ID");
    res.json(eliminar.recordset);
  } catch (error) {
    console.log(error);
  }
};
