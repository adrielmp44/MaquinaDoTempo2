// CenaPanorama: renderiza as fotografias com A-Frame, aplica a rotação de
// alinhamento e a transparência (RF03, RF04). As duas fotos do ponto ficam
// carregadas ao mesmo tempo, então trocar o período é instantâneo (RF05).
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';
import 'aframe';
import HotspotsNavegacao from './HotspotsNavegacao';

// O centro da foto equirretangular fica à frente do usuário com -90°.
const ROTACAO_BASE = -90;
// Sentido em que ajusteSeca gira a foto da seca (conferido na calibração).
export const SINAL_AJUSTE = 1;

const CenaPanorama = forwardRef(function CenaPanorama(
  {
    urlChuva, urlSeca, periodo, opacidade = 1, transparente = false,
    rotacao = 0, ajusteSeca = 0, alinhamento = 0,
    giroscopio = true, vizinhos = [], onVizinho, escurecer = false,
    sobrepor = false, onToqueCalibracao, giroIndicadores = 0,
  },
  ref,
) {
  const cameraRef = useRef(null);
  const grupoRef = useRef(null);
  const indicadoresRef = useRef(null);
  const ceuChuvaRef = useRef(null);

  // A tela de ponto lê a direção da câmera para alinhar com a bússola.
  useImperativeHandle(ref, () => ({
    yawCameraGraus() {
      const obj = cameraRef.current?.object3D;
      return obj ? (obj.rotation.y * 180) / Math.PI : 0;
    },
  }));

  // Calibração: toque na foto -> posição no chão para um indicador de vizinho.
  useEffect(() => {
    const ceu = ceuChuvaRef.current;
    if (!ceu || !onToqueCalibracao) return undefined;
    const aoTocar = (e) => {
      const ponto = e.detail?.intersection?.point;
      // posição no sistema dos indicadores (já com o giro geral)
      const grupo = (indicadoresRef.current || grupoRef.current)?.object3D;
      if (!ponto || !grupo) return;
      const local = grupo.worldToLocal(ponto.clone()).normalize();
      if (local.y > -0.05) { onToqueCalibracao(null); return; }
      let t = -2 / local.y;
      const horizontal = Math.hypot(local.x * t, local.z * t);
      if (horizontal > 9) t *= 9 / horizontal;
      const f = (n) => (Math.round(n * 10) / 10 || 0).toString();
      onToqueCalibracao(`${f(local.x * t)} -2 ${f(local.z * t)}`);
    };
    ceu.addEventListener('click', aoTocar);
    return () => ceu.removeEventListener('click', aoTocar);
  }, [onToqueCalibracao, urlChuva]);

  const opChuva = periodo === 'chuva' || sobrepor ? (sobrepor ? 1 : opacidade) : 0;
  const opSeca = periodo === 'seca' ? opacidade : sobrepor ? 0.5 : 0;
  const material = (op) => `shader: flat; side: back; npot: true; transparent: true; depthWrite: false; opacity: ${op}`;

  return (
    <a-scene
      embedded
      renderer="alpha: true; antialias: true; colorManagement: true"
      vr-mode-ui="enabled: false"
      loading-screen="enabled: false"
      device-orientation-permission-ui="enabled: false"
      background={transparente ? undefined : 'color: #141210'}
      cursor="rayOrigin: mouse; fuse: false"
      raycaster="objects: .clicavel; far: 1000"
    >
      <a-entity ref={grupoRef} rotation={`0 ${alinhamento} 0`}>
        {urlChuva && (
          <a-sky
            ref={ceuChuvaRef}
            class={onToqueCalibracao ? 'clicavel' : undefined}
            src={urlChuva}
            radius="500"
            rotation={`0 ${ROTACAO_BASE + rotacao} 0`}
            material={material(opChuva)}
            visible={opChuva > 0 ? 'true' : 'false'}
          />
        )}
        {urlSeca && (
          <a-sky
            src={urlSeca}
            radius="490"
            rotation={`0 ${ROTACAO_BASE + rotacao + SINAL_AJUSTE * ajusteSeca} 0`}
            material={material(opSeca)}
            visible={opSeca > 0 ? 'true' : 'false'}
          />
        )}
        <a-entity ref={indicadoresRef} rotation={`0 ${giroIndicadores} 0`}>
          {vizinhos.length > 0 && <HotspotsNavegacao vizinhos={vizinhos} onClicarPonto={onVizinho} />}
        </a-entity>
      </a-entity>

      <a-entity
        ref={cameraRef}
        camera="fov: 75"
        look-controls={`enabled: true; touchEnabled: true; magicWindowTrackingEnabled: ${giroscopio}; reverseTouchDrag: false`}
        wasd-controls="enabled: false"
      >
        {/* Esfera escura usada na transição entre pontos */}
        <a-sphere
          radius="0.5"
          material={`shader: flat; color: #141210; side: back; transparent: true; opacity: ${escurecer ? 1 : 0}`}
          animation={`property: material.opacity; to: ${escurecer ? 1 : 0}; dur: 300; easing: easeInOutQuad`}
        />
      </a-entity>
    </a-scene>
  );
});

export default CenaPanorama;
