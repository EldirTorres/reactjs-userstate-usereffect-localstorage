import React, { Fragment, useState } from 'react';
import uuid from 'uuid/dist/v4'
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    // Crear State de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    });
    const [ error, actualizarError ] = useState(false)

    // Función que se ejecuta cada que el usuario escribe en un input
    const actualizarState = e => {
        actualizarCita({
            ...cita, /* copíamos el objeto, sirve para objetos y arreglos */
            [e.target.name]: e.target.value
        })
    }
    // Extraer los valores
    const { mascota, propietario, fecha, hora, sintomas } = cita;

        // Cuando el usuario presiona agregar cita
        const submitCita = e => {
            e.preventDefault();
    
            // Validar
            if(mascota.trim() === '' || propietario.trim() === ''  || fecha.trim() === ''  || hora.trim() === ''  || sintomas.trim() === '' ){
                actualizarError(true); //para controlar el error
                return;
            }
            // Eliminar el mensaje previo 
            actualizarError(false);
    
            // Asignar un ID para generar uno unico ya que no tenemos db
            cita.id = uuid();
    
            // Crear la cita
            crearCita(cita);
    
            // Reiniciar el form
             actualizarCita({
                mascota: '',
                propietario: '',
                fecha: '',
                hora: '',
                sintomas: ''
            }) 
        }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

             {error ? <p className="alerta-error">Todos los campos son obligatorios</p> : null}

            <form
             onSubmit={submitCita}
            >
                <label>Nombre Mascota</label>
                <input
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={actualizarState}
                 value={mascota} /* Para poder hacer reset al formulario */
                />

                <label>Nombre Dueño</label>
                <input
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre  Dueño de la mascota"
                    onChange={actualizarState}
                value={propietario}
                />

                <label>Fecha</label>
                <input
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                 value={fecha}
                />

                <label>Hora</label>
                <input
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                value={hora}
                />

                <label>Síntomas</label>
                <textarea
                    className="u-full-width"
                    name="sintomas"
                    onChange={actualizarState}
                 value={sintomas}
                ></textarea>

                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </Fragment>
    );
}

//Documentacion del componente
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
            //Se le dice que es el componente en este caso es una funcion "func"
            //y que es obligatoria "isRequired"
}

export default Formulario;