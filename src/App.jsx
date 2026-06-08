import { useState } from 'react';
import MenuPrincipal from './components/MenuPrincipal';
import Mapa from './components/Mapa';
import Sobre from './components/Sobre';
import Tour360 from './components/Tour360';
import styles from './App.module.css';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('menu');
  const [fotoAtual, setFotoAtual] = useState(1);
  const totalFotos = 10;

  // ESTADOS GLOBAIS DE CONFIGURAÇÃO
  const [giroscopioAtivo, setGiroscopioAtivo] = useState(true);
  const [somAmbienteAtivo, setSomAmbienteAtivo] = useState(false);

  const navegarFoto = (direcao) => {
    if (direcao === 'proxima' && fotoAtual < totalFotos) {
      setFotoAtual(fotoAtual + 1);
    } else if (direcao === 'anterior' && fotoAtual > 1) {
      setFotoAtual(fotoAtual - 1);
    }
  };

  const irParaFotoDoMapa = (numeroFoto) => {
    setFotoAtual(numeroFoto);
    setTelaAtual('tour');
  };

  const iniciarTourDoZero = () => {
    setFotoAtual(1);
    setTelaAtual('tour');
  };

  return (
    <div className={styles.appContainer}>
      {telaAtual === 'menu' && (
        <MenuPrincipal 
          onMudarTela={setTelaAtual} 
          onIniciarTour={iniciarTourDoZero} 
          giroscopioAtivo={giroscopioAtivo}
          setGiroscopioAtivo={setGiroscopioAtivo}
          somAmbienteAtivo={somAmbienteAtivo}
          setSomAmbienteAtivo={setSomAmbienteAtivo}
        />
      )}

      {telaAtual === 'mapa' && (
        <Mapa totalFotos={totalFotos} onSelecionarPonto={irParaFotoDoMapa} onVoltar={() => setTelaAtual('menu')} />
      )}

      {telaAtual === 'sobre' && (
        <Sobre onVoltar={() => setTelaAtual('menu')} />
      )}

      {telaAtual === 'tour' && (
        <Tour360 
          fotoAtual={fotoAtual} 
          totalFotos={totalFotos} 
          onNavegar={navegarFoto} 
          onVoltarMenu={() => setTelaAtual('menu')} 
          giroscopioAtivo={giroscopioAtivo}
          setGiroscopioAtivo={setGiroscopioAtivo}
          somAmbienteAtivo={somAmbienteAtivo}        
          setSomAmbienteAtivo={setSomAmbienteAtivo}   
          onMudarTela={setTelaAtual}                 
        />
      )}
    </div>
  );
}