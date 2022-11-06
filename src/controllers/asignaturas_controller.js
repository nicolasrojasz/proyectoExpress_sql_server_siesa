import { config } from "../db.js";
import sql from "mssql";
import Asignatura_model from "../models/asignatura_model.js";

export const mostrarInfo = async (req, res) => {
  try {
    const conexion = await sql.connect(config);
    const resultado = await conexion
      .request()
      .query("SELECT * FROM  ASIGNATURAS");

    console.log(resultado);
    res.json(resultado.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const mostrarPorId = async (req, res) => {
  try {
    let parametro = req.params.id;
    let conexion = await sql.connect(config);
    let consulta = await conexion
      .request()
      .input("ID", sql.Int, parametro)
      .execute("SP_CONSULTARINFO");
    res.json(consulta.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const crearAsignatura = async (req, res) => {
  try {
    let { CODIGO, NOMBRE, CREDITOS } = req.body;
    let nuevaAsignatura = new Asignatura_model(CODIGO, NOMBRE, CREDITOS);
    let conexion = await sql.connect(config);
    let insertar = await conexion
      .request()
      .input("CODIGO", sql.NVarChar, nuevaAsignatura.CODIGO)
      .input("NOMBRE", sql.NVarChar, nuevaAsignatura.NOMBRE)
      .input("CREDITOS", sql.TinyInt, nuevaAsignatura.CREDITOS)
      .execute("SP_CREAR_ASIGNATURA");
    res.json(insertar.recordset);
    res.send("Mostrando POST");
  } catch (error) {
    console.log(error);
  }
};

export const actualizarAsignatura = async (req, res) => {
  try {
    let { id } = req.params;
    let { CODIGO, NOMBRE, CREDITOS } = req.body;
    let actualizarAsignaturaModel = new Asignatura_model(
      CODIGO,
      NOMBRE,
      CREDITOS
    );
    let conexion = await sql.connect(config);

    let actualizar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .input("CODIGO", sql.NVarChar, actualizarAsignaturaModel.CODIGO)
      .input("NOMBRE", sql.NVarChar, actualizarAsignaturaModel.NOMBRE)
      .input("CREDITOS", sql.TinyInt, actualizarAsignaturaModel.CREDITOS)
      .execute("SP_ACTUALIZAR_ASIGNATURA");
    res.json(actualizar.recordset);
  } catch (error) {
    console.log(error);
  }
};

export const eliminarAsignatura = async (req, res) => {
  try {
    let { id } = req.params;
    let conexion = await sql.connect(config);
    let eliminar = await conexion
      .request()
      .input("ID", sql.Int, id)
      .query("DELETE FROM ASIGNATURAS WHERE ID = @ID");
    res.json(eliminar.recordset);
  } catch (error) {
    console.log(error);
  }
};
