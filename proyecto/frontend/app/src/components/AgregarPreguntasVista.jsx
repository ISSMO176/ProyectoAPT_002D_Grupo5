import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const AgregarPreguntasVista = () => {
  const { id } = useParams();
  const [encuesta, setEncuesta] = useState(null);
  const [preguntas, setPreguntas] = useState([]);
  const [textoPregunta, setTextoPregunta] = useState('');
  const [tipoRespuesta, setTipoRespuesta] = useState('texto'); // 'texto' o 'multiple'
  const [opciones, setOpciones] = useState([]);
  const [editando, setEditando] = useState(null); // Estado para indicar si estamos editando una pregunta

  const fetchEncuesta = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/encuestas/${id}`);
      setEncuesta(response.data);
      
      const preguntasResponse = await axios.get(`http://localhost:4000/api/preguntas/${id}`);
      setPreguntas(preguntasResponse.data);
    } catch (error) {
      console.error('Error al obtener la encuesta:', error);
    }
  };

  useEffect(() => {
    fetchEncuesta();
  }, [id]);

  const handleAddOption = () => {
    setOpciones([...opciones, '']);
  };

  const handleOptionChange = (index, value) => {
    const nuevasOpciones = [...opciones];
    nuevasOpciones[index] = value;
    setOpciones(nuevasOpciones);
  };

  const handleAgregarPregunta = async (e) => {
    e.preventDefault();
    const nuevaPregunta = {
      texto_pregunta: textoPregunta,
      tipo_respuesta: tipoRespuesta,
      encuestaId: id,
      opciones: tipoRespuesta === 'multiple' ? opciones : []
    };

    try {
      if (editando) {
        // Actualizar pregunta existente
        await axios.put(`http://localhost:4000/api/preguntas/${editando}`, nuevaPregunta);
        setEditando(null);
      } else {
        // Crear nueva pregunta
        await axios.post('http://localhost:4000/api/preguntas', nuevaPregunta);
      }
      
      setTextoPregunta('');
      setTipoRespuesta('texto');
      setOpciones([]);
      fetchEncuesta(); // Recargar preguntas después de agregar o editar una pregunta
    } catch (error) {
      console.error('Error al agregar o editar la pregunta:', error);
    }
  };

  const handleEliminarPregunta = async (idPregunta) => {
    try {
      await axios.delete(`http://localhost:4000/api/preguntas/${idPregunta}`);
      fetchEncuesta(); // Recargar preguntas después de eliminar
    } catch (error) {
      console.error('Error al eliminar la pregunta:', error);
    }
  };

  const handleEditarPregunta = (pregunta) => {
    setTextoPregunta(pregunta.texto_pregunta);
    setTipoRespuesta(pregunta.tipo_respuesta);
    setOpciones(pregunta.opciones.map(opcion => opcion.texto_opcion));
    setEditando(pregunta.id_pregunta);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Agregar Preguntas a {encuesta?.titulo}</h2>

      <form onSubmit={handleAgregarPregunta} className="mb-4 p-4 border rounded shadow-sm">
        <div className="mb-3">
          <label className="form-label">Texto de la Pregunta</label>
          <input
            type="text"
            className="form-control"
            value={textoPregunta}
            onChange={(e) => setTextoPregunta(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Tipo de Respuesta</label>
          <select
            className="form-select"
            value={tipoRespuesta}
            onChange={(e) => setTipoRespuesta(e.target.value)}
          >
            <option value="texto">Texto libre</option>
            <option value="multiple">Opción múltiple</option>
          </select>
        </div>

        {tipoRespuesta === 'multiple' && (
          <div className="mb-3">
            <label className="form-label">Opciones</label>
            {opciones.map((opcion, index) => (
              <input
                key={index}
                type="text"
                className="form-control mb-2"
                value={opcion}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                placeholder={`Opción ${index + 1}`}
              />
            ))}
            <button type="button" className="btn btn-secondary mt-2" onClick={handleAddOption}>
              Agregar Opción
            </button>
          </div>
        )}

        <button type="submit" className="btn btn-primary w-100">
          {editando ? 'Actualizar Pregunta' : 'Agregar Pregunta'}
        </button>
      </form>

      <h4 className="mb-4">Vista Previa de las Preguntas</h4>
      <div className="list-group">
        {preguntas.length > 0 ? (
          preguntas.map((pregunta, index) => (
            <div key={pregunta.id_pregunta} className="mb-3 list-group-item shadow-sm">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-3">{index + 1}. {pregunta.texto_pregunta}</h5>
                <div>
                  <button 
                    className="btn btn-warning btn-sm me-2" 
                    onClick={() => handleEditarPregunta(pregunta)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger btn-sm" 
                    onClick={() => handleEliminarPregunta(pregunta.id_pregunta)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
              {pregunta.tipo_respuesta === 'multiple' ? (
                <ul className="list-unstyled ps-3">
                  {pregunta.opciones.map(opcion => (
                    <li key={opcion.id_opcion} className="mb-1">
                      <i className="bi bi-dot me-2"></i>{opcion.texto_opcion}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="border p-3 bg-light rounded">
                  <p className="mb-0 text-muted">Tipo de respuesta: Texto libre</p>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-muted">No hay preguntas agregadas todavía.</p>
        )}
      </div>
    </div>
  );
};

export default AgregarPreguntasVista;
