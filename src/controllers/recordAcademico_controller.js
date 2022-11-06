import { config } from "../db.js";
import sql from "mssql";
import recordAcademico_model from "../models/recordAcademico_model.js";

export const mostrarInfoRecordAcademico = async (req, res) => {
  try {
    const conexion = await sql.connect(config);
    const resultado = await conexion
      .request()
      .execute("SP_MOSTRAR_RECORDS_ACADEMICOS");

    console.log(resultado);
    res.json(resultado.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const mostrarPorIdRecordAcademico = async (req, res) => {
  try {
    let parametro = req.params.id;
    let conexion = await sql.connect(config);
    let consulta = await conexion
      .request()
      .input("ID", sql.Int, parametro)
      .execute("SP_MOSTRAR_ID_RECORD_ACADEMICO");
    res.json(consulta.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const crearRecordAcademico = async (req, res) => {
  try {
    let { CODIGO, FECHA, PERIODO, COD_ESTUDIANTE, COD_DOCENTE, NOTA1, NOTA2 } =
      req.body;
    let nuevoRecordAcadmeico = new recordAcademico_model(
      CODIGO,
      FECHA,
      PERIODO,
      COD_ESTUDIANTE,
      COD_DOCENTE,
      NOTA1,
      NOTA2
    );
    let conexion = await sql.connect(config);
    let insertar = await conexion
      .request()
      .input("CODIGO", sql.NVarChar, nuevoRecordAcadmeico.CODIGO)
      .input("FECHA", sql.Date, nuevoRecordAcadmeico.FECHA)
      .input("PERIODO", sql.NVarChar, nuevoRecordAcadmeico.PERIODO)
      .input(
        "COD_ESTUDIANTE",
        sql.NVarChar,
        nuevoRecordAcadmeico.COD_ESTUDIANTE
      )
      .input("COD_DOCENTE", sql.NVarChar, nuevoRecordAcadmeico.COD_DOCENTE)
      .input("NOTA1", sql.Decimal, nuevoRecordAcadmeico.NOTA1)
      .input("NOTA2", sql.Decimal, nuevoRecordAcadmeico.NOTA2)
      .execute("SP_CREAR_RECORD_ACADEMICO");
    res.json(insertar.recordset);
    res.send("Mostrando POST");
  } catch (error) {
    console.log(error);
  }
};

export const actualizarRecordAcademico = async (req, res) => {
  try {
    let { id } = req.params;

    let conexion = await sql.connect(config);
    let { CODIGO, FECHA, PERIODO, COD_ESTUDIANTE, COD_DOCENTE, NOTA1, NOTA2 } =
      req.body;
    let actualizarRecordAcadmeico = new recordAcademico_model(
      CODIGO,
      FECHA,
      PERIODO,
      COD_ESTUDIANTE,
      COD_DOCENTE,
      NOTA1,
      NOTA2
    );
    let actualizar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .input("CODIGO", sql.NVarChar, actualizarRecordAcadmeico.CODIGO)
      .input("FECHA", sql.Date, actualizarRecordAcadmeico.FECHA)
      .input("PERIODO", sql.NVarChar, actualizarRecordAcadmeico.PERIODO)
      .input(
        "COD_ESTUDIANTE",
        sql.NVarChar,
        actualizarRecordAcadmeico.COD_ESTUDIANTE
      )
      .input("COD_DOCENTE", sql.NVarChar, actualizarRecordAcadmeico.COD_DOCENTE)
      .input("NOTA1", sql.Decimal, actualizarRecordAcadmeico.NOTA1)
      .input("NOTA2", sql.Decimal, actualizarRecordAcadmeico.NOTA2)
      .execute("SP_ACTUALIZAR_RECORD_ACADEMICO");
    res.json(actualizar.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarRecordAcademico = async (req, res) => {
  try {
    let { id } = req.params;
    let conexion = await sql.connect(config);
    let eliminar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM RECORD_ACADEMICO  WHERE ID = @ID");
    res.json(eliminar.recordset);
  } catch (error) {
    console.log(error);
  }
};
