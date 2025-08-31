const Header = ({name}) => 
    (
        <h1>
            {name}
        </h1>
    )

const Part = ({ name, id, exercises }) => 
    (
        <li>
            {name} {exercises}
        </li>
    )

const Content = ({ parts, id }) => 
  (   
    <ul>
        {
            parts.map(
                p => 
                    <Part key={p.id} id={p.id} name={p.name} exercises={p.exercises}/>
            )
        }
    </ul>
  )

const Total = ({ parts }) => {
  const totalCount = parts.reduce((accum, v) => accum += v.exercises, 0)
  
  return <h4>total of {totalCount} exercises</h4>
}

const Course = (props) => {
  const { id, name, parts } = props.course

  return (
    <div>
      <Header name={name} />
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default Course