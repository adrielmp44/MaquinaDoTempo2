// Máquina do Tempo — componentes React (ESM). Importe também ./tokens.css e ./mt.css.
import * as React from 'react';
// Máquina do Tempo — componentes (núcleo comum ao bundle e à versão ESM)
// Usa só React.createElement: sem JSX, sem dependências além do React.

var h = React.createElement;
var useState = React.useState;

function cx() {
  return Array.prototype.slice.call(arguments).filter(Boolean).join(' ');
}

// Ícones de linha da Lucide (ISC), só os que os componentes usam por dentro.
var ICONS = {
  chuva: [['path', { d: 'M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242' }], ['path', { d: 'M16 14v6' }], ['path', { d: 'M8 14v6' }], ['path', { d: 'M12 16v6' }]],
  seca: [['circle', { cx: 12, cy: 12, r: 4 }], ['path', { d: 'M12 2v2' }], ['path', { d: 'M12 20v2' }], ['path', { d: 'm4.93 4.93 1.41 1.41' }], ['path', { d: 'm17.66 17.66 1.41 1.41' }], ['path', { d: 'M2 12h2' }], ['path', { d: 'M20 12h2' }], ['path', { d: 'm6.34 17.66-1.41 1.41' }], ['path', { d: 'm19.07 4.93-1.41 1.41' }]]
};

function Icon(props) {
  var parts = ICONS[props.name] || [];
  var size = props.size || 20;
  return h('svg', {
    width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
    strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': 'true', focusable: 'false'
  }, parts.map(function (p, i) { return h(p[0], Object.assign({ key: i }, p[1])); }));
}

// ---------------------------------------------------------------- Button
function Button(props) {
  var variant = props.variant || 'primary';
  var size = props.size || 'md';
  var rest = Object.assign({}, props);
  ['variant', 'size', 'icon', 'iconEnd', 'block', 'className', 'children'].forEach(function (k) { delete rest[k]; });
  return h('button', Object.assign({ type: 'button' }, rest, {
    className: cx('mt-btn', 'mt-btn--' + variant, 'mt-btn--' + size, props.block && 'mt-btn--block', props.className)
  }), props.icon || null, props.children != null ? h('span', null, props.children) : null, props.iconEnd || null);
}

// ---------------------------------------------------------------- IconButton
function IconButton(props) {
  var variant = props.variant || 'glass';
  var rest = Object.assign({}, props);
  ['variant', 'label', 'className', 'children'].forEach(function (k) { delete rest[k]; });
  return h('button', Object.assign({ type: 'button' }, rest, {
    'aria-label': props.label,
    title: props.label,
    className: cx('mt-icon-btn', 'mt-icon-btn--' + variant, props.className)
  }), props.children);
}

// ---------------------------------------------------------------- SeasonToggle
function SeasonToggle(props) {
  var state = useState(props.defaultValue || 'chuva');
  var value = props.value != null ? props.value : state[0];
  var labels = Object.assign({ chuva: 'Chuva', seca: 'Seca' }, props.labels || {});
  function pick(v) {
    if (props.value == null) state[1](v);
    if (props.onChange) props.onChange(v);
  }
  return h('div', { role: 'group', 'aria-label': props.ariaLabel || 'Período', className: cx('mt-season', props.className) },
    ['chuva', 'seca'].map(function (v) {
      return h('button', {
        key: v, type: 'button', 'aria-pressed': value === v,
        className: cx('mt-season__opt', 'mt-season__opt--' + v),
        onClick: function () { pick(v); }
      }, h(Icon, { name: v, size: 20 }), h('span', null, labels[v]));
    }));
}

// ---------------------------------------------------------------- OpacitySlider
var sliderCount = 0;
function OpacitySlider(props) {
  var idState = useState(function () { sliderCount += 1; return 'mt-slider-' + sliderCount; });
  var id = props.id || idState[0];
  var state = useState(props.defaultValue != null ? props.defaultValue : 70);
  var value = props.value != null ? props.value : state[0];
  function change(e) {
    var v = Number(e.target.value);
    if (props.value == null) state[1](v);
    if (props.onChange) props.onChange(v);
  }
  return h('div', { className: cx('mt-slider', props.className) },
    h('div', { className: 'mt-slider__head' },
      h('label', { htmlFor: id }, props.label || 'Transparência'),
      h('output', { htmlFor: id, className: 'mt-slider__value' }, value + '%')),
    h('input', {
      id: id, type: 'range', min: 0, max: 100, step: 1, value: value, onChange: change,
      className: 'mt-slider__input', style: { '--mt-p': value + '%' }
    }));
}

// ---------------------------------------------------------------- Switch
var switchCount = 0;
function Switch(props) {
  var idState = useState(function () { switchCount += 1; return 'mt-switch-' + switchCount; });
  var id = props.id || idState[0];
  var state = useState(!!props.defaultChecked);
  var checked = props.checked != null ? props.checked : state[0];
  function toggle() {
    if (props.checked == null) state[1](!checked);
    if (props.onChange) props.onChange(!checked);
  }
  return h('div', { className: cx('mt-switch', props.className) },
    h('span', { className: 'mt-switch__label', id: id + '-label' }, props.icon || null, h('span', null, props.label)),
    h('button', {
      type: 'button', role: 'switch', 'aria-checked': checked, 'aria-labelledby': id + '-label',
      className: 'mt-switch__track', onClick: toggle
    }, h('span', { className: 'mt-switch__thumb' })));
}

// ---------------------------------------------------------------- Tag
function Tag(props) {
  var tone = props.tone || 'outline';
  return h('span', { className: cx('mt-tag', 'mt-tag--' + tone, props.className) }, props.icon || null, props.children);
}

// ---------------------------------------------------------------- HudFrame
function HudFrame(props) {
  var tone = props.tone || 'glass';
  return h('section', { className: cx('mt-hud', 'mt-hud--' + tone, props.className), 'aria-label': props.title || undefined },
    h('span', { className: 'mt-hud__c mt-hud__c--tl', 'aria-hidden': 'true' }),
    h('span', { className: 'mt-hud__c mt-hud__c--tr', 'aria-hidden': 'true' }),
    h('span', { className: 'mt-hud__c mt-hud__c--bl', 'aria-hidden': 'true' }),
    h('span', { className: 'mt-hud__c mt-hud__c--br', 'aria-hidden': 'true' }),
    props.label ? h('div', { className: 'mt-hud__label' }, props.icon || null, h('span', null, props.label)) : null,
    props.title ? h('h3', { className: 'mt-hud__title' }, props.title) : null,
    props.children ? h('div', { className: 'mt-hud__body' }, props.children) : null);
}

// ---------------------------------------------------------------- GlassPanel
function GlassPanel(props) {
  var rest = Object.assign({}, props);
  ['as', 'className', 'children'].forEach(function (k) { delete rest[k]; });
  return h(props.as || 'div', Object.assign({}, rest, { className: cx('mt-glass', props.className) }), props.children);
}

// ---------------------------------------------------------------- PointMarker
function PointMarker(props) {
  var n = props.number;
  var label = props.label || ('Ponto ' + n);
  var rest = Object.assign({}, props);
  ['number', 'label', 'active', 'className'].forEach(function (k) { delete rest[k]; });
  return h('button', Object.assign({ type: 'button' }, rest, {
    'aria-label': label, 'aria-current': props.active ? 'location' : undefined,
    className: cx('mt-marker', props.active && 'mt-marker--active', props.className)
  }), String(n));
}

// ---------------------------------------------------------------- Logo
function Mark(props) {
  var s = props.size || 40;
  var id = 'mtc' + (props.idSuffix || 'm');
  return h('svg', { width: s, height: s, viewBox: '0 0 100 100', role: props.decorative ? undefined : 'img', 'aria-label': props.decorative ? undefined : 'Máquina do Tempo', 'aria-hidden': props.decorative ? 'true' : undefined, className: 'mt-logo__mark' },
    h('defs', null, h('clipPath', { id: id }, h('circle', { cx: 50, cy: 50, r: 46 }))),
    h('g', { clipPath: 'url(#' + id + ')' },
      h('rect', { width: 50, height: 100, fill: props.mono ? 'currentColor' : 'var(--agua-700, #0e6a6a)' }),
      h('rect', { x: 50, width: 50, height: 100, fill: props.mono ? 'currentColor' : 'var(--sol-500, #ff6a13)' }),
      h('path', { d: 'M0 60 C 18 52, 34 68, 50 60 S 82 52, 100 60', fill: 'none', stroke: '#fff', strokeWidth: 5, strokeLinecap: 'round' }),
      h('line', { x1: 50, y1: 0, x2: 50, y2: 100, stroke: '#fff', strokeWidth: 3 })),
    h('circle', { cx: 50, cy: 60, r: 8, fill: '#fff' }));
}

var logoCount = 0;
function Logo(props) {
  var variant = props.variant || 'horizontal';
  var size = props.size || 40;
  var idState = useState(function () { logoCount += 1; return String(logoCount); });
  if (variant === 'mark') return h(Mark, { size: size, mono: props.mono, idSuffix: idState[0] });
  return h('span', { className: cx('mt-logo', 'mt-logo--' + variant, props.className), style: { fontSize: size * 0.5 + 'px' } },
    h(Mark, { size: size, mono: props.mono, decorative: true, idSuffix: idState[0] }),
    h('span', { className: 'mt-logo__text' },
      h('span', { className: 'mt-logo__name' }, 'Máquina do Tempo'),
      props.tagline === false ? null : h('span', { className: 'mt-logo__sub' }, props.tagline || 'Açude Cedro · chuva e seca')));
}

var MT_EXPORTS = {
  Button: Button, IconButton: IconButton, SeasonToggle: SeasonToggle, OpacitySlider: OpacitySlider,
  Switch: Switch, Tag: Tag, HudFrame: HudFrame, GlassPanel: GlassPanel, PointMarker: PointMarker, Logo: Logo
};

export { Button, IconButton, SeasonToggle, OpacitySlider, Switch, Tag, HudFrame, GlassPanel, PointMarker, Logo };
