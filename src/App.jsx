import { useState } from 'react'
import './App.css'
import { use } from 'react'

function App() {

  // Defino los elementos
  const[elementos, setElementos] = useState([
    {
      id: 1,
      nombre: "Amarillo",
      contenedor: 1,
      tipo: 2
    },
    {
      id: 2,
      nombre: "5",
      contenedor: 1,
      tipo: 2
    },
    {
      id: 3,
      nombre: "True",
      contenedor: 1,
      tipo: 2
    },
    {
      id: 4,
      nombre: "[1, 2, 3]",
      contenedor: 1,
      tipo: 3
    },
    {
      id: 5,
      nombre: "{color: rojo}",
      contenedor: 1,
      tipo: 3
    },
  ])

  const [alerta, setAlerta] = useState(false)
  const [validado, setValidado] = useState(false)

  // Acomoda cada elemento según el número de contenedor al que se asigna
  const acomodar = (conten) => {
    return elementos.filter(elem => elem.contenedor == conten)
  }

  // Cuando agarro un objeto para moverlo, guardo los datos
  const inicioArrastre = (event, elem) => {
    event.dataTransfer.setData("elemID", elem.id)
    console.log(elem)
  }

  const finArrastre = (event) => {
    event.preventDefault()
  }

  // Cuando suelto el elemento, le modifico el número de contenedor que corresponde
  const soltar = (event, conten) => {
    const elemID = event.dataTransfer.getData("elemID")
    const element = elementos.find(elemento => elemento.id == elemID)
    element.contenedor = conten

    const nuevoEstado = elementos.map(elemento => {
      if (elemento.id == elemID){
        return element
      }
      else {
        return elemento
      }
    })

    setElementos(nuevoEstado)
  }

  // Valido si cada elemento está donde corresponde
  const validacion = (e) => {
    e.preventDefault()

    elementos.map(elemento => {
      if (elemento.contenedor != elemento.tipo){
        setValidado(true)
        setAlerta(true)
      }
      else{
        setValidado(true)
      }
    })
  }

  // Reseteo al estado inicial
  const resetear = (e) => {
    e.preventDefault()

    setElementos([
      {
        id: 1,
        nombre: "Amarillo",
        contenedor: 1,
        tipo: 2
      },
      {
        id: 2,
        nombre: "5",
        contenedor: 1,
        tipo: 2
      },
      {
        id: 3,
        nombre: "True",
        contenedor: 1,
        tipo: 2
      },
      {
        id: 4,
        nombre: "[1, 2, 3]",
        contenedor: 1,
        tipo: 3
      },
      {
        id: 5,
        nombre: "{color: rojo}",
        contenedor: 1,
        tipo: 3
      },
    ])
    
    setAlerta(false)
    setValidado(false)
  }

  return (
    <div className='app'>
      <h2>Arrastrar y Soltar - Tipos de Datos</h2>
      <div className='contenedor-gral'>
        {acomodar(1).map(elemento => (
          <div className='elemento' key={elemento.id} draggable onDragStart={(event) => inicioArrastre(event, elemento)}> 
            <h4>{elemento.nombre}</h4>
          </div>
        ))}
        
      </div>
      <div className='sub-contenedor'>
        <div className='columna1'>
          <h3>Primitivos</h3>
          <div className='contenedor-2' droppable="true" onDragOver={(event => finArrastre(event))} onDrop={(event => soltar(event, 2))}>
            {acomodar(2).map(elemento => (
              <div className='elemento' key={elemento.id} draggable onDragStart={(event) => inicioArrastre(event, elemento)}> 
                <h4>{elemento.nombre}</h4>
              </div>
            ))}
          </div>
        </div>
        <div className='columna2'>
          <h3>Complejos</h3>
          <div className='contenedor-3' droppable="true" onDragOver={(event => finArrastre(event))} onDrop={(event => soltar(event, 3))}>
            {acomodar(3).map(elemento => (
              <div className='elemento' key={elemento.id} draggable onDragStart={(event) => inicioArrastre(event, elemento)}> 
                <h4>{elemento.nombre}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
      <button onClick={e => validacion(e)}>Validar</button>
      {validado & alerta ?
      <p>Inténtalo de nuevo</p>
      :
      <></>
      }
      {validado & !alerta ?
      <p>¡Muy bien!</p>
      :
      <></>
      }
      
      <button onClick={e => resetear(e)}>Resetear</button>
    </div>
  )
}

export default App
