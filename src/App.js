import React, { Fragment, useState, useEffect } from 'react';
import Formulario from './components/Formulario';
import Cita from './components/Cita';

function App() {

  // Citas en local storage, solo almacena string
    let citasIniciales = JSON.parse(localStorage.getItem('citas'));
    if(!citasIniciales) {
      citasIniciales = [];
    }
  

  // Arreglo de citas
  const [citas, guardarCitas] = useState(citasIniciales);

  // Use Effect para realizar ciertas operaciones cuando el state cambia
    useEffect( () => { //Siempre es un arrow function, similar al documentReady de jq, pero tambien escucha cuando algo cambia
                      //de igual manera es similar al usar didmount o didupdate de versiones anteriores 
        let citasIniciales = JSON.parse(localStorage.getItem('citas'));
  
        if(citasIniciales) {
          localStorage.setItem('citas', JSON.stringify(citas)) //Se guarda en localStorage
        } else {
          localStorage.setItem('citas', JSON.stringify([]));
        }
    }, [citas] );//Se le debe pasar lo que verificara para evitar un ciclo infinito

  // Función que tome las citas actuales y agregue la nueva
  const crearCita = cita => {
    guardarCitas([...citas, cita]);
  }

   // Función que elimina una cita por su id
   const eliminarCita = id => {
    const nuevasCitas = citas.filter(cita => cita.id !== id );
    guardarCitas(nuevasCitas);
 }

  // Mensaje condicional
  const titulo = citas.length === 0 ? 'No hay citas' : 'Administra tus Citas';

  return (
    <Fragment>
      <h1>Administrador de Pacientes</h1>

      <div className="container">
        <div className="row">
          <div className="one-half column">
            <Formulario
              crearCita={crearCita}
            />
          </div>
          <div className="one-half column">
            <h2>{titulo}</h2>
            {citas.map(cita => (
                <Cita
                  key={cita.id}
                  cita={cita}
                  eliminarCita={eliminarCita}
                />
              ))}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
