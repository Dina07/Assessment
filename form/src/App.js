import React, {useState} from 'react';
import './App.css';

function App() {
  // To retrieve data from the user, declared a user state.
  const [user, setDetails] = useState({});
  // After submitting the form, we declare a boolean state to display the details in a table.
  const [result, setResult] = useState(false)

  // Arrow function to update user details
  const handleDetails = (key, value) => {
    setDetails(prevState => ({...prevState, [key]: value}))
  }

  const handleBack = () => {
    setResult(false)
    setDetails({})

  }
  // Submit and post data to server function.
  //  **There is a server folder for backend processes.** 
  const handleSubmit = async (e) => {
    setResult(true)
    e.preventDefault();
    fetch('http://localhost:5000/user/form', {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(res => {
      return res.json()
    }).then(data => {
      if (data.message === 'Form submitted successfully!') {
        // setDetails({})
        console.log('Form submitted successfully!');
      } else {
        // if any error occures it console will display
        console.error('Form submission failed.', data.message);
      }
    }).catch(err => {
      console.log(err)
    })

  };

  return (
    // Ui for getting user details
    <div className="App">
      <header className="appHeader">
        Assessment
      </header>
      <div className='appBody'>
        {!result ? <form onSubmit={handleSubmit} className='appForm'>
          <p><u>Please fill the details :</u></p>
          <input
            className='m10'
            type="text"
            placeholder="Name"
            value={user.name}
            onChange={(e) => handleDetails('name', e.target.value)}
          />
          <input
            className='m10'
            type="text"
            placeholder="First Name"
            value={user.firstName}
            onChange={(e) => handleDetails('firstName', e.target.value)}
          />
          <input
            className='m10'
            type="email"
            placeholder="Email"
            value={user.email}
            onChange={(e) => handleDetails('email', e.target.value)}
          />
          <input
            className='m10'
            type="number"
            placeholder="Mobile Number"
            value={user.number}
            onChange={(e) => handleDetails('number', e.target.value)}
          />
          <input
            className='m10'
            type="number"
            placeholder="Age"
            value={user.age}
            onChange={(e) => handleDetails('age', e.target.value)}
          />
          <button type="submit" disabled={Object.keys(user).length === 0}>Submit</button>
        </form>
          :
          <div>
            {Object.keys(user).length > 0 &&
              <table style={{padding: 30}}>

                {Object.keys(user).map((u, i) =>
                  <tr key={u + i}>
                    <td style={{textTransform: 'capitalize'}}>{u}</td>
                    <td>{user[u]}</td>
                  </tr>
                )
                }
              </table>}
            <button style={{position: 'absolute', bottom: 0, left: 0}} onClick={() => handleBack()}>Go Back</button>
          </div>}
      </div>


    </div>
  );
}

export default App;
