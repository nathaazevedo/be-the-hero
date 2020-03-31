import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';

import logoImg from '../../assets/logo.svg';

export default function Register() {
    const userId = localStorage.getItem("userId");
    const history = useHistory();

    if(userId != null){
        history.push('/profile');
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [city, setCity] = useState('');
    const [uf, setUf] = useState('');
    const [country, setCountry] = useState('');

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            phoneNumber,
            city,
            uf,
            country,
        };

        try {
            const response = await api.post('users', data);

            alert(`Seu Id de acesso: ${response.data.id}`);
            history.push('/');
        } catch (error) {
            alert('Erro no cadastro, tente novamente.');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajuda pessoa a encontrarem os casos da sua ONG.</p>

                    <Link to="/" className="back-link">
                        <FiArrowLeft size={16} color="#E02041" />
                        Voltar
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG" value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} />
                    <input placeholder="WhatsApp" value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} />
                    <div className="input-group">
                        <input placeholder="Cidade" value={city} onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF" maxLength="2" style={{ width: 80 }} value={uf} onChange={e => setUf(e.target.value)} />
                        <input placeholder="Pais" value={country} onChange={e => setCountry(e.target.value)} />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}