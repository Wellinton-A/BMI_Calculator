  import { useEffect, useState } from 'react'
  import './App.css'

  function App() {
    const [ height, setHeight ] = useState('');
    const [ weight, setWeight ] = useState('');
    const [ bmi, setBmi ] = useState('');
    const [ bmiTable, setBmiTable ] = useState([
      {
        bmiResult: 'Bellow 18.5',
        classification: 'Underweight',
        Range: [0.1, 18.5],
        result: false
      },
      {
        bmiResult: '18.5 to 24.9',
        classification: 'Healthy weight',
        Range: [18.5, 25.0],
        result: false
      },
      {
        bmiResult: '25.0 to 29.9',
        classification: 'Overweight',
        Range: [25.0, 30.0],
        result: false
      },
      {
        bmiResult: '30.0 or higher',
        classification: 'Obesity',
        Range: [30.0, 1000],
        result: false
      },
  ]);

    
    const handleHeight = (e) => setHeight(e.target.value);
    const handleWeight = (e) => setWeight(e.target.value);
    
    const handleBmi = () => {
      setBmi((parseFloat(weight) / (parseFloat(height)*parseFloat(height))).toFixed(1))
      console.log('render')
    }

    useEffect(() => {
      if (bmi !== '' && !isNaN(bmi)) {
        const newBmiTable = bmiTable.map((item) => {
          const minBmi = parseFloat(item.Range[0]);
          const maxBmi = parseFloat(item.Range[1]);
          const result = bmi >= minBmi && bmi < maxBmi;
          return {
            ...item,
            result,
          };
        });
        setBmiTable(newBmiTable);
      }
    }, [bmi]);
    
    return (
      <>
        <div className="header container">
          <h1>BMI Calculator</h1>
          <p>
            The classification of body mass index (BMI) can help identify problems of obesity or malnutrition in children, teenagers, adults, and the elderly.
          </p>
        </div>
        <div className="calculator container">
          <div className="form">
            <input onChange={ handleHeight } type="text" maxLength={ 4 } placeholder='height ex: 1.74 (meters)'/>
            <input onChange={ handleWeight } type="text" maxLength={ 4 } placeholder='weight ex: 75.8 (kgs)'/>
            <button onClick={ handleBmi } className="btn">Calculate</button>
          </div>
          <div className="table">
          </div>
        </div>
        <div className="bmi-result container">
          <div className="bmi">
            
            { bmi !== '' && !isNaN(bmi) && (
              <div className="result">
                <h3>Result:</h3>
                <span> Your BMI is  <strong>{ bmi } kg/m<sup>2</sup>.</strong></span>
                <hr />
              </div>
            )}
          </div>
          <table>
            <tbody>
            <tr>
              <th>BMI</th>
              <th>Classification</th>
            </tr>
            { bmiTable.map((bmi, indexBmi) => {
              return (
                <tr key={ indexBmi }> 
              <td className={bmi.result ? 'selected' : ''}>
                <strong>{ bmi.bmiResult  }</strong>
              </td>
              <td className={bmi.result ? 'selected' : ''}>
                { bmi.classification }
              </td>
            </tr>
            )
            })}
            </tbody>
          </table>
        </div>
      </>
    )
  }

  export default App
