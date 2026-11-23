const timeline = document.querySelector('.race-timeline');
const label = timeline.querySelector('.race-timeline-label');
const hint = label.textContent;
const map = document.querySelector('.states-map object');
let hoveredMarker = null;
let focusedMarker = null;
let highlightedState = null;

function updateRaceHighlight() {
  const marker = hoveredMarker || focusedMarker;
  label.textContent = marker ? marker.querySelector('span').textContent : hint;
  highlightedState?.classList.remove('timeline-highlight');
  highlightedState = marker
    ? map?.contentDocument?.getElementById(marker.dataset.state)
    : null;
  highlightedState?.classList.add('timeline-highlight');
}

map?.addEventListener('load', updateRaceHighlight);
for (const marker of timeline.querySelectorAll('.race-marker')) {
  marker.addEventListener('pointerenter', () => {
    hoveredMarker = marker;
    updateRaceHighlight();
  });
  marker.addEventListener('pointerleave', () => {
    hoveredMarker = null;
    updateRaceHighlight();
  });
  marker.addEventListener('focus', () => {
    focusedMarker = marker;
    updateRaceHighlight();
  });
  marker.addEventListener('blur', () => {
    focusedMarker = null;
    updateRaceHighlight();
  });
}
