const Course = ({courses}) => {
  return (
    <> 
      <h1>Web development curriculum</h1>
      {
        courses.map(elem => {
          return (
            <div key={elem.id}>
            <Header courses={elem.name} />
            <Content parts={elem.parts} />
            <Total parts={elem.parts} />
            </div>
          )
        })
      } 
    </>
  )
}

const Content = ({parts}) => {
  return (
    <>
      {
        parts.map(elem => {
          return (
            <div key={elem.id}>
              <Part part={elem} />
            </div>
          )
        })
      }      
    </>
  )
}

const Part = ({ part }) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
)}

const Header = ({ courses }) => (
  <h2>
    {courses}
  </h2>
)
const Total = ({parts}) => {
  const sum = parts.reduce((acc,obj) => acc+obj.exercises,0)
  return (
    <p>
      <b>Number of total exercises {sum}</b>
    </p>
  )
}

export default Course