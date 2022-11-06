import { config } from "../db.js";
import sql from "mssql";
import Estudiantes_model from "../models/estudiantes_model.js";

export const mostrarInfoEstudiantes = async (req, res) => {
  try {
    const conexion = await sql.connect(config);
    const resultado = await conexion
      .request()
      .execute("SP_MOSTRAR_ESTUDIANTES");

    console.log(resultado);
    res.json(resultado.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const mostrarPorIdEstudiantes = async (req, res) => {
  try {
    let parametro = req.params.id;
    let conexion = await sql.connect(config);
    let consulta = await conexion
      .request()
      .input("ID", sql.Int, parametro)
      .execute("SP_MOSTRAR_ID_ESTUDIANTE");
    res.json(consulta.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const crearEstudiantes = async (req, res) => {
  try {
    let { CODIGO, NOMBRE, APELLIDOS, SEMESTRE, CARRERA, COD_ASIGNATURA } =
      req.body;
    let nuevoEstudiante = new Estudiantes_model(
      CODIGO,
      NOMBRE,
      APELLIDOS,
      SEMESTRE,
      CARRERA,
      COD_ASIGNATURA
    );
    let conexion = await sql.connect(config);
    let insertar = await conexion
      .request()
      .input("CODIGO", sql.NVarChar, nuevoEstudiante.CODIGO)
      .input("NOMBRE", sql.NVarChar, nuevoEstudiante.NOMBRE)
      .input("APELLIDOS", sql.NVarChar, nuevoEstudiante.APELLIDOS)
      .input("SEMESTRE", sql.NVarChar, nuevoEstudiante.SEMESTRE)
      .input("CARRERA", sql.NVarChar, nuevoEstudiante.CARRERA)
      .input("COD_ASIGNATURA", sql.NVarChar, nuevoEstudiante.COD_ASIGNATURA)
      .execute("SP_CREAR_ESTUDIANTE");
    res.json(insertar.recordset);
    res.send("Mostrando POST");
  } catch (error) {
    console.log(error);
  }
};

export const actualizarEstudiante = async (req, res) => {
  try {
    let { id } = req.params;

    let conexion = await sql.connect(config);
    let { CODIGO, NOMBRE, APELLIDOS, SEMESTRE, CARRERA, COD_ASIGNATURA } =
      req.body;
    let actualizarEstudiante = new Estudiantes_model(
      CODIGO,
      NOMBRE,
      APELLIDOS,
      SEMESTRE,
      CARRERA,
      COD_ASIGNATURA
    );
    let actualizar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .input("CODIGO", sql.NVarChar, actualizarEstudiante.CODIGO)
      .input("NOMBRE", sql.NVarChar, actualizarEstudiante.NOMBRE)
      .input("APELLIDOS", sql.NVarChar, actualizarEstudiante.APELLIDOS)
      .input("SEMESTRE", sql.NVarChar, actualizarEstudiante.SEMESTRE)
      .input("CARRERA", sql.NVarChar, actualizarEstudiante.CARRERA)
      .input(
        "COD_ASIGNATURA",
        sql.NVarChar,
        actualizarEstudiante.COD_ASIGNATURA
      )
      .execute("SP_ACTUALIZAR_ESTUDIANTE");
    res.json(actualizar.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarEstudiante = async (req, res) => {
  try {
    let { id } = req.params;
    let conexion = await sql.connect(config);
    let eliminar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM ESTUDIANTES WHERE ID = @ID");
    res.json(eliminar.recordset);
  } catch (error) {
    console.log(error);
  }
};
