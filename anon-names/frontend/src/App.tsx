import { useEffect, useState, type FormEvent } from 'react';
import './App.css'; // ⬅️ Import the CSS file

const baseUrl = import.meta.env.VITE_API_BASE_URL;

function App() {
  const [name, setName] = useState<string>('');
  const [names, setNames] = useState<string[]>([]);

  useEffect(() => {
    fetch(`${baseUrl}/names`)
      .then(res => res.json())
      .then((data: string[]) => setNames(data))
      .catch(err => console.error('Error fetching names:', err));
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    await fetch(`${baseUrl}/names`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    setName('');
    const res = await fetch(`${baseUrl}/names`);
    const updatedNames: string[] = await res.json();
    setNames(updatedNames);
  };

  return (
    <div className="container">
      <h1>✨ Name List ✨</h1>

      <form onSubmit={handleSubmit} className="form">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter a name"
          className="input"
        />
        <button type="submit" className="button">Add</button>
      </form>

      <table className="table">
        <thead>
          <tr><th>Names</th></tr>
        </thead>
        <tbody>
          {names.map((n, i) => (
            <tr key={i}><td>{n}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
