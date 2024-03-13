import { useState } from "react";
import Axios from "axios";
import "./App.css";

const App = () => {
	const [password, setPassword] = useState();
	const [title, setTitle] = useState();

    const addPassword = () => {
        Axios.post('http://localhost:3000/add-password', {
            password: password,
            title: title
        }).then(() => {
            console.log('Success');
        });
    
    }

	return (
		<div className="app">
			<form className="form">
				<input
					type="text"
					name="pass"
					placeholder="Enter password"
					onChange={(e) => {
						setPassword(e.target.value);
					}}
				/>
				<input
					type="text"
					name="uri"
					placeholder="E.g. Google"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<button type="submit" onClick={addPassword}>Add Password</button>
			</form>
		</div>
	);
};

export default App;
