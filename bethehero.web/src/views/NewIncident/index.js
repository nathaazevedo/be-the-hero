import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api'
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function NewIncident() {
    const [ title, setTitle ] = useState('');
    const [ description, setDescription ] = useState('');
    const [ value, setValue ] = useState('');
    const userId = localStorage.getItem('userId');

    const history = useHistory();

    async function handleNewIncident(){
        e.prevent.default();

        const data = {
            title,
            description,
            value,
        }

        try{
            await api.post('incident', data, {
                headers: {
                    Authorization: userId,
                } 
            });

            history.push('/profile');
        } catch (error){
            alert('Erro ao cadastrar caso, tente novamente.');
        }
    }
    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar novo caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                    Voltar para home
                </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input placeholder="Título do caso" value={title} setTitle={e => e.target.value}/>
                    <textarea placeholder="Descrição"  value={description} setDescription={e => e.target.value} />
                    <input placeholder="Valor em reais"  value={value} setValue={e => e.target.value}/>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}