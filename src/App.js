import React from 'react';
import './App.css';

const GROUP_NUMBER = 'Group 12';

const TEAM_MEMBERS = [
  'Thiego Gomes Rechi',
  'Tyler Le',
  'Imaekhai Imaekhai',
];

function App() {
  return (
    <div className="container">
      <h1>Group Number: {GROUP_NUMBER}</h1>
      <h2>Team Members:</h2>
      <ul>
        {TEAM_MEMBERS.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
