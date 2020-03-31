import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Profile() {
    const history = useHistory();
    const [incidents, setIncidents] = useState([]);
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName");

    useEffect(() => {
        api.get('myIncidents', {
            headers: {
                Authorization: userId,
            }
        }).then(response => {
            setIncidents(response.data);
        });
    }, [userId]);

    function ListIncidents() {
        if (incidents.length > 0) {
            return (
                <ul>
                    {incidents.map(incidents => (
                        <li key={incidents.id}>
                            <strong>CASO:</strong>
                            <p>{incidents.title}</p>
                            <strong>DESCRIÇÃO:</strong>
                            <p>{incidents.description}</p>
                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incidents.value)}</p>

                            <button onClick={() => handleDeleteIncident(incidents.id)} type="button" style={{ background: "transparent" }}>
                                <FiTrash2 size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            );
        }
        return (<p>Nenhum caso cadastrado neste usuário.</p>);
    }

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incident/${id}`, {
                headers: {
                    Authorization: userId,
                }
            });

            setIncidents(incidents.filter(x => x.id !== id));
        } catch (error){
            alert('Erro ao deletar caso, tente novamente.');
        }
    };

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem vinda, {userName}</span>

                <Link className="button" to="/incidents/new">
                    Cadastrar novo caso
                </Link>

                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#e02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ListIncidents />
        </div>

    );
}