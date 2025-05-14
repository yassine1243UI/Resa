import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import axios from 'axios';
import { API_BASE_URL } from '../../config';

const WaitingList = () => {
  const [waitingList, setWaitingList] = useState([]);

  useEffect(() => {
    const fetchWaitingList = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/waiting-list`);
        setWaitingList(response.data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la liste d\'attente:', error);
      }
    };

    fetchWaitingList();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div className="container mt-4">
        <h2>Liste d'Attente</h2>
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Nom</th>
                <th>Email</th>
                <th>Événement</th>
                <th>Position</th>
                <th>Date d'inscription</th>
              </tr>
            </thead>
            <tbody>
              {waitingList.map((entry) => (
                <tr key={entry._id}>
                  <td>{entry._id}</td>
                  <td>{entry.name}</td>
                  <td>{entry.email}</td>
                  <td>{entry.eventName}</td>
                  <td>{entry.position}</td>
                  <td>{new Date(entry.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WaitingList;
