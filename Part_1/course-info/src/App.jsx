const Header = (props) => {

  return (
    <h1>
      {props.courseName}
    </h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.val.name} {props.val.exercises}
    </p>
  )
}

const Content = (props) => {
  return props.valueArray.map(el => 
      <Part val={el} />
    )
}

const Total = (props) => {
  
  const totalCount = props.valueArray.reduce((acc, val) => acc+= val.exercises, 0)
  
  return (
    <p>Number of exercises {totalCount}</p>
  ) 
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    contentArray: [
        {
          name: 'Fundamentals of React',
          exercises: 10
        },
        {
          name: 'Using props to pass data',
          exercises: 7
        },
        {
          name: 'State of a component',
          exercises: 14
        }
    ]
  }

  return (
    <div>
      <Header courseName={course.name} />
      <Content valueArray={course.contentArray} />
      <Total valueArray={course.contentArray} />
    </div>
  )
}

export default App
