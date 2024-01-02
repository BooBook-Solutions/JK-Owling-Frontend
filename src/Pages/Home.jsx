import React from "react";
import Button from 'react-bootstrap/Button';

import Navigation from "../Components/Common/Navbar";

const Home = () => {
    return (
        <>
            <Navigation />
            <div className="centered-div">
                <Button variant="link" onClick={() => window.location.href="/catalogue"}>Inizia a svogliare i libri</Button>
                <br />
                <p style={{ fontSize: "20px" }}>Siamo sempre disponibili via mail a <b>pincopallino@gmail.com</b></p>
                <br/><br/>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <div style={{ margin: "0px 20px" }}>
                        <h4 style={{ fontSize: "20px" }}>Orari di apertura</h4>
                        <table>
                            <tr>
                                <td>Lunedì</td>
                                <td>10-12 // 15.30-17.30</td>
                            </tr>
                            <tr>
                                <td>Martedì</td>
                                <td>10-12 // 15.30-17.30</td>
                            </tr>
                            <tr>
                                <td>Mercoledì</td>
                                <td>10-12 // 15.30-17.30</td>
                            </tr>
                            <tr>
                                <td>Giovedì</td>
                                <td>10-12 // 15.30-17.30</td>
                            </tr>
                            <tr>
                                <td>Venerdì</td>
                                <td>10-12 // 15.30-17.30</td>
                            </tr>
                            <tr>
                                <td>Sabato</td>
                                <td>10-12</td>
                            </tr>
                        </table>
                    </div>

                    <div style={{ margin: "0px 20px" }}>
                        <h4 style={{ fontSize: "20px" }}>Giorni d'apertura</h4>
                        <p>Sessione di settembre</p>
                        <p><b>Raccolta libri: </b> dal 01/09 al 04/09</p>
                        <p><b>Vendita libri: </b> dal 06/09 al 09/09</p>
                        <p><b>Ritiro soldi: </b> 10/09 e 11/09</p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
