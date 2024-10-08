import React from 'react';

const EncuestaAsignada = () => {
  return (
    <div>
      {}
      <div className="header d-flex justify-content-between align-items-center p-3 text-light shadow">
        <img src="/logo.png" alt="Logo" className="logo" style={{ width: '100px' }} />
        <div>
          <button className="btn btn-outline-light me-2">ENCUESTAS</button>
          <button className="btn btn-dark">Perfil</button>
        </div>
      </div>

      {}
      <div className="container mt-5 pt-5">
        <h2 className="text-center mb-4" style={{ color: '#dc3545', fontWeight: 'bold' }}>
          Encuestas
        </h2>
        <div className="card" style={{ borderRadius: '10px', padding: '20px', backgroundColor: '#f8f9fa' }}>
          
          <div className="mb-4">
            <h5>Pregunta 1</h5>
            <p>¿Me siento cómodo/a/e/x con mi equipo de trabajo?</p>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="respuesta1" id="respuesta1_1" />
              <label className="form-check-label" htmlFor="respuesta1_1">
                Muy de acuerdo
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="respuesta1" id="respuesta1_2" />
              <label className="form-check-label" htmlFor="respuesta1_2">
                De acuerdo
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="respuesta1" id="respuesta1_3" />
              <label className="form-check-label" htmlFor="respuesta1_3">
                Ni de acuerdo ni en desacuerdo
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="radio" name="respuesta1" id="respuesta1_4" />
              <label className="form-check-label" htmlFor="respuesta1_4">
                En desacuerdo
              </label>
            </div>
          </div>

          <div className="mb-4">
            <h5>Pregunta 2</h5>
            <p>Con respecto a la respuesta anterior, ¿por qué eligió esa opción?</p>
            <textarea className="form-control" rows="3" style={{ backgroundColor: '#e9ecef', borderRadius: '10px' }} />
          </div>

          <div className="mb-4">
            <h5>Pregunta 3</h5>
            <p>¿Qué cambios o mejoras crees que podrían aumentar tu comodidad y bienestar en el trabajo?</p>
            <textarea className="form-control" rows="3" style={{ backgroundColor: '#e9ecef', borderRadius: '10px' }} />
          </div>

          <div className="d-flex justify-content-center mt-4">
            <button className="btn btn-danger" style={{ borderRadius: '20px', padding: '10px 20px' }}>
              Enviar Respuestas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EncuestaAsignada;
