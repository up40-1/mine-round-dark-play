
// Sound utility for game feedback
const soundMap: Record<string, HTMLAudioElement> = {};

export const playSound = (soundName: 'click' | 'win' | 'lose' | 'cashout') => {
  const soundSrc = `/sounds/${soundName}.mp3`;

  if (!soundMap[soundName]) {
    const audio = new Audio(soundSrc);
    soundMap[soundName] = audio;
  }
  
  // Reset to beginning if already playing
  soundMap[soundName].currentTime = 0;
  soundMap[soundName].play().catch(err => {
    console.log('Audio play error:', err);
    // Most likely user hasn't interacted with the page yet
  });
};
