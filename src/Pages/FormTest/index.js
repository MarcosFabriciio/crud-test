import React, { useState } from 'react';
import axios from 'axios';
import { Form, Col, Row, Button } from 'react-bootstrap';

const FormTest = () => {
    const [formData, updateFormData] = useState({});

    const handleChange = (e) => {
        updateFormData({...formData, [e.target.id]: e.target.value.trim()})
    };

    const handleSubmit = async (e) => {
        try {
            e.preventDefault()
            const response = await axios({
                method: 'post',
                url: 'http://localhost:4803/clientes/cadastrar',
                data: formData,
                headers: 'Access-Control-Allow-Origin': "*"
            })

            console.log(response)
        } catch (error) {
            console.log(error)
        }


    };

    return ( 
        <Col md={{span: 6}}>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col>
                        <Form.Group controlId="cpfCnpj">
                            <Form.Label>CPF/CNPJ</Form.Label>
                            <Form.Control type="text" placeholder="Digite o CPF/CNPJ" onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="dataCadastro">
                            <Form.Label>Data Cadastro</Form.Label>
                            <Form.Control type="date" onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <Form.Group controlId="tipoPessoa">
                            <Form.Label>Tipo de Pessoa</Form.Label>
                            <Form.Control as="select" onChange={handleChange}>
                                <option>Pessoa Fisica</option>
                                <option>Pessoa Jurídica</option>
                            </Form.Control>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="codigoSap">
                            <Form.Label>Código SAP</Form.Label>
                            <Form.Control type="text" onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="nome">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="webSite">
                    <Form.Label>Web Site</Form.Label>
                    <Form.Control type="text" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="email">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" onChange={handleChange}/>
                </Form.Group>
                <Row>
                    <Col>
                        <Form.Group controlId="inscricaoEstadual">
                            <Form.Label>Inscrição Estadual</Form.Label>
                            <Form.Control type="text" onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group controlId="cmc">
                            <Form.Label>CMC</Form.Label>
                            <Form.Control type="text" onChange={handleChange}/>
                        </Form.Group>
                    </Col>
                </Row>
                <Form.Group controlId="emailNfe">
                    <Form.Label>Email NF-e</Form.Label>
                    <Form.Control type="email" onChange={handleChange}/>
                </Form.Group>
                <Form.Group controlId="nomeRepresentante">
                    <Form.Label>Nome Representante</Form.Label>
                    <Form.Control type="text" onChange={handleChange}/>
                </Form.Group>
                <Row>
                    <Col md={{ span: 1, offset: 10}}>
                        <Button variant="primary" type="submit">
                            Cadastrar
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Col>
     );
}
 
export default FormTest;
