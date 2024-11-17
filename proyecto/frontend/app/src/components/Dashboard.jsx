import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [encuestas, setEncuestas] = useState([]);
  const [selectedEncuesta, setSelectedEncuesta] = useState(null);
  const [detallesEncuesta, setDetallesEncuesta] = useState(null);
  const [totalAsignadas, setTotalAsignadas] = useState(0);
  const [totalRespondidas, setTotalRespondidas] = useState(0);
  const [detallesUsuario, setDetallesUsuario] = useState(null);
  const navigate = useNavigate();

  const handleVerEstadisticas = (encuestaId) => {
    navigate(`/estadisticas-encuesta/${encuestaId}`);
  };

  useEffect(() => {
    const fetchEncuestas = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:4000/api/encuestas', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setEncuestas(response.data);
      } catch (error) {
        console.error('Error al obtener encuestas:', error);
        alert('Error al obtener encuestas');
      }
    };

    fetchEncuestas();
  }, []);

  const handleEncuestaSelect = async (encuestaId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(
        `http://localhost:4000/api/encuestas/${encuestaId}/detalles`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setDetallesEncuesta(response.data);
      setSelectedEncuesta(encuestaId);
      calcularPorcentajes(response.data);
    } catch (error) {
      console.error('Error al obtener detalles de la encuesta:', error);
      alert('Error al obtener detalles de la encuesta');
    }
  };

  const calcularPorcentajes = (encuestaDetalles) => {
    if (!encuestaDetalles || !encuestaDetalles.preguntas.length) {
      setTotalAsignadas(0);
      setTotalRespondidas(0);
      return;
    }

    // Usuarios únicos asignados a la encuesta
    const usuariosAsignados = new Set(
      encuestaDetalles.preguntas.flatMap((pregunta) =>
        pregunta.respuestas.map((respuesta) => respuesta.usuario.rut)
      )
    );

    // Usuarios que respondieron completamente todas las preguntas
    const usuariosQueRespondieron = new Set();
    usuariosAsignados.forEach((rut) => {
      const respondioTodo = encuestaDetalles.preguntas.every((pregunta) =>
        pregunta.respuestas.some(
          (respuesta) =>
            respuesta.usuario.rut === rut &&
            (respuesta.texto_respuesta || respuesta.opcion)
        )
      );
      if (respondioTodo) {
        usuariosQueRespondieron.add(rut);
      }
    });

    setTotalAsignadas(usuariosAsignados.size);
    setTotalRespondidas(usuariosQueRespondieron.size);
  };

  const handleVerDetallesUsuario = (rut) => {
    const usuarioRespuestas = detallesEncuesta.preguntas.map((pregunta) => {
      const respuesta = pregunta.respuestas.find(
        (resp) => resp.usuario.rut === rut
      );
      return {
        pregunta: pregunta.texto_pregunta,
        respuesta: respuesta
          ? respuesta.texto_respuesta || respuesta.opcion?.texto_opcion
          : 'Sin respuesta',
      };
    });
    setDetallesUsuario({ rut, respuestas: usuarioRespuestas });
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Dashboard de Encuestas</h2>
      <div className="mb-4">
        <label htmlFor="encuestaSelect" className="form-label">
          Selecciona una Encuesta:
        </label>
        <select
          id="encuestaSelect"
          className="form-select"
          onChange={(e) => handleEncuestaSelect(e.target.value)}
        >
          <option value="">Seleccione una encuesta</option>
          {encuestas.map((encuesta) => (
            <option key={encuesta.id_encuesta} value={encuesta.id_encuesta}>
              {encuesta.titulo}
            </option>
          ))}
        </select>
      </div>
      {detallesEncuesta && (
        <div className="mt-4">
          <h4>Detalles de la Encuesta: {detallesEncuesta.titulo}</h4>
          <p>
            <strong>Porcentaje de encuestas respondidas:</strong>{' '}
            {totalAsignadas > 0
              ? ((totalRespondidas / totalAsignadas) * 100).toFixed(1)
              : 0}
            %
          </p>
          <button
            className="btn btn-primary mb-3"
            onClick={() => handleVerEstadisticas(selectedEncuesta)}
          >
            Ver Estadísticas
          </button>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>RUT del Usuario</th>
                <th>Nombre del Usuario</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {detallesEncuesta.preguntas[0]?.respuestas.map((_, index) => {
                const usuario =
                  detallesEncuesta.preguntas[0].respuestas[index].usuario;
                return (
                  <tr key={usuario.rut}>
                    <td>{usuario.rut}</td>
                    <td>
                      {usuario.nombre} {usuario.apellido_paterno}{' '}
                      {usuario.apellido_materno}
                    </td>
                    <td>
                      <button
                        className="btn btn-info"
                        onClick={() => handleVerDetallesUsuario(usuario.rut)}
                      >
                        Ver Detalles
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
      {detallesUsuario && (
        <div className="mt-4">
          <h4>Detalles de Respuestas para Usuario: {detallesUsuario.rut}</h4>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Pregunta</th>
                <th>Respuesta</th>
              </tr>
            </thead>
            <tbody>
              {detallesUsuario.respuestas.map((detalle, index) => (
                <tr key={index}>
                  <td>{detalle.pregunta}</td>
                  <td>{detalle.respuesta}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button
            className="btn btn-secondary"
            onClick={() => setDetallesUsuario(null)}
          >
            Cerrar
          </button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
